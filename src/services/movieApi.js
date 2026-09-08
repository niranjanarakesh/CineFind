/**
 * movieApi.js
 * Service module responsible for fetching movie data from the TMDB REST API
 * using the standard browser Fetch API.
 *
 * Demonstrates Module 6 Web Programming Concepts:
 * 1. HTTP GET requests via native fetch()
 * 2. Asynchronous JavaScript (async/await)
 * 3. Handling JSON responses (response.json())
 * 4. Error handling (HTTP errors, network errors, empty results)
 * 5. Environment variables (import.meta.env.VITE_TMDB_API_KEY)
 */

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const TMDB_BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w1280';

// TMDB Genre ID to Name Mapping
const TMDB_GENRES = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Sci-Fi',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

/**
 * Retrieve the configured TMDB API key from Vite environment variables.
 * @returns {string}
 */
function getApiKey() {
  const key = import.meta.env.VITE_TMDB_API_KEY;
  if (!key || key === 'your_api_key_here' || key.trim() === '') {
    throw new Error(
      'TMDB API key not found. Please add VITE_TMDB_API_KEY to your .env file.'
    );
  }
  return key.trim();
}

/**
 * Normalizes TMDB movie objects to our unified movie structure.
 */
function normalizeMovie(movie) {
  const genresList = movie.genres
    ? movie.genres.map((g) => g.name)
    : movie.genre_ids
    ? movie.genre_ids.map((id) => TMDB_GENRES[id] || 'General').filter(Boolean)
    : [];

  const releaseDate = movie.release_date || '';
  const releaseYear = releaseDate ? releaseDate.split('-')[0] : 'N/A';

  return {
    id: movie.id,
    title: movie.title || 'Untitled Movie',
    releaseYear,
    releaseDate: releaseDate || 'Unknown',
    rating:
      typeof movie.vote_average === 'number'
        ? movie.vote_average.toFixed(1)
        : 'N/A',
    posterUrl: movie.poster_path
      ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
      : null,
    backdropUrl: movie.backdrop_path
      ? `${TMDB_BACKDROP_BASE_URL}${movie.backdrop_path}`
      : null,
    overview: movie.overview ? movie.overview.trim() : 'No overview available.',
    genres: genresList.length > 0 ? genresList : ['General'],
    runtime: movie.runtime ? `${movie.runtime} min` : null,
  };
}

/**
 * Search movies by title using the TMDB REST API and native Fetch API.
 * @param {string} query - Movie title to search for
 * @returns {Promise<Array>} List of movies
 */
export async function searchMovies(query) {
  if (!query || !query.trim()) {
    return [];
  }

  const apiKey = getApiKey();
  const url = `${TMDB_BASE_URL}/search/movie?api_key=${encodeURIComponent(
    apiKey
  )}&query=${encodeURIComponent(query.trim())}&include_adult=false&page=1`;

  try {
    const response = await fetch(url);

    // Handle HTTP status errors
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          'Invalid TMDB API key (401 Unauthorized). Please check your VITE_TMDB_API_KEY in .env.'
        );
      }
      if (response.status === 404) {
        throw new Error('TMDB service endpoint not found (404).');
      }
      throw new Error(`TMDB API returned HTTP error: ${response.status}`);
    }

    // Parse JSON stream
    const data = await response.json();

    // Handle empty results
    if (!data.results || data.results.length === 0) {
      return [];
    }

    return data.results.map(normalizeMovie);
  } catch (error) {
    // Handle network connection drops
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error(
        'Network error: Unable to reach TMDB API. Please check your internet connection.'
      );
    }
    throw error;
  }
}

/**
 * Fetch popular movies for initial display using the TMDB REST API.
 * @returns {Promise<Array>} List of popular movies
 */
export async function getPopularMovies() {
  const apiKey = getApiKey();
  const url = `${TMDB_BASE_URL}/movie/popular?api_key=${encodeURIComponent(
    apiKey
  )}&page=1`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          'Invalid TMDB API key (401 Unauthorized). Please check your VITE_TMDB_API_KEY in .env.'
        );
      }
      throw new Error(`Failed to fetch popular movies: HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      return [];
    }

    return data.results.map(normalizeMovie);
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error(
        'Network error: Unable to connect to TMDB API. Please check your network.'
      );
    }
    throw error;
  }
}

/**
 * Fetch full movie details for a specific movie ID using the TMDB REST API.
 * @param {number|string} movieId - TMDB movie ID
 * @param {Object} fallbackMovie - Summary object to fallback on if details fail
 * @returns {Promise<Object>} Detailed movie object
 */
export async function getMovieDetails(movieId, fallbackMovie = null) {
  try {
    const apiKey = getApiKey();
    const url = `${TMDB_BASE_URL}/movie/${movieId}?api_key=${encodeURIComponent(
      apiKey
    )}`;

    const response = await fetch(url);

    if (!response.ok) {
      return fallbackMovie;
    }

    const data = await response.json();
    return normalizeMovie(data);
  } catch {
    return fallbackMovie;
  }
}
