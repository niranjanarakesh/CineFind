// movieApi.js
// This file contains all requests to the TMDB REST API.

const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Get the API key from the Vite environment variable.
function getApiKey() {
  const key = import.meta.env.VITE_TMDB_API_KEY;

  if (!key || key === 'your_api_key_here') {
    throw new Error('TMDB API key is missing. Add VITE_TMDB_API_KEY to your .env file.');
  }

  return key.trim();
}

// Turn a TMDB poster path into a complete image URL.
export function getPosterUrl(posterPath, size = 'w500') {
  if (!posterPath) {
    return 'https://placehold.co/500x750/1e293b/94a3b8?text=No+Poster';
  }

  return `${IMAGE_BASE_URL}/${size}${posterPath}`;
}

// Get popular movies.
export async function fetchPopularMovies() {
  const apiKey = getApiKey();

  const url = `${BASE_URL}/movie/popular?api_key=${encodeURIComponent(apiKey)}&language=en-US&page=1`;

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Invalid TMDB API key. Check your .env file.');
    }

    throw new Error(`TMDB request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.results || [];
}

// Search movies by title.
export async function searchMovies(query) {
  const apiKey = getApiKey();

  const url =
    `${BASE_URL}/search/movie?api_key=${encodeURIComponent(apiKey)}` +
    `&query=${encodeURIComponent(query)}&language=en-US&page=1`;

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Invalid TMDB API key. Check your .env file.');
    }

    throw new Error(`TMDB search failed: ${response.status}`);
  }

  const data = await response.json();
  return data.results || [];
}

// Get full details for one movie.
export async function fetchMovieDetails(movieId) {
  const apiKey = getApiKey();

  const url =
    `${BASE_URL}/movie/${movieId}?api_key=${encodeURIComponent(apiKey)}` +
    `&language=en-US`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Could not load movie details.');
  }

  return response.json();
}
