import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import SearchBar from './components/SearchBar.jsx';
import MovieGrid from './components/MovieGrid.jsx';
import MovieDetails from './components/MovieDetails.jsx';
import Favorites from './components/Favorites.jsx';
import { fetchPopularMovies, searchMovies } from './services/movieApi.js';
import { RefreshCw } from 'lucide-react';

const STORAGE_KEY = 'cinemafind_favorites';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Load saved favorites when the app starts.
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Save favorites whenever they change.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  // Load popular movies.
  async function loadPopularMovies() {
    setIsLoading(true);
    setErrorMessage('');
    setSearchQuery('');

    try {
      const results = await fetchPopularMovies();
      setMovies(results);
    } catch (error) {
      setMovies([]);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  // Load popular movies when the app opens.
  useEffect(() => {
    loadPopularMovies();
  }, []);

  // Search TMDB for movies.
  async function handleSearch(query) {
    const cleanQuery = query.trim();

    if (!cleanQuery) {
      loadPopularMovies();
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setSearchQuery(cleanQuery);
    setSelectedMovie(null);
    setActiveTab('home');

    try {
      const results = await searchMovies(cleanQuery);
      setMovies(results);
    } catch (error) {
      setMovies([]);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleClearSearch() {
    loadPopularMovies();
  }

  // Add or remove a movie from favorites.
  function handleToggleFavorite(movie) {
    setFavorites((currentFavorites) => {
      const alreadyFavorite = currentFavorites.some(
        (item) => item.id === movie.id
      );

      if (alreadyFavorite) {
        return currentFavorites.filter((item) => item.id !== movie.id);
      }

      return [...currentFavorites, movie];
    });
  }

  function handleClearFavorites() {
    if (window.confirm('Remove all favorite movies?')) {
      setFavorites([]);
    }
  }

  function handleSelectMovie(movie) {
    setSelectedMovie(movie);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleSelectTab(tab) {
    setActiveTab(tab);
    setSelectedMovie(null);
  }

  const isFavorite = selectedMovie
    ? favorites.some((movie) => movie.id === selectedMovie.id)
    : false;

  return (
    <div className="app-container">
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        favoritesCount={favorites.length}
      />

      <main className="main-content">
        {selectedMovie ? (
          <MovieDetails
            movie={selectedMovie}
            onBack={() => setSelectedMovie(null)}
            isFavorite={isFavorite}
            onToggleFavorite={handleToggleFavorite}
          />
        ) : activeTab === 'favorites' ? (
          <Favorites
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectMovie={handleSelectMovie}
            onBackToBrowse={() => handleSelectTab('home')}
            onClearAllFavorites={handleClearFavorites}
          />
        ) : (
          <div>
            <div className="hero-section">
              <h1 className="hero-title">CinemaFind</h1>
              <p className="hero-subtitle">Find your next movie</p>
            </div>

            <SearchBar
              onSearch={handleSearch}
              currentQuery={searchQuery}
              onClearSearch={handleClearSearch}
            />

            {errorMessage && (
              <div className="error-container">
                <div>
                  <div className="error-title">Something went wrong</div>
                  <div className="error-desc">{errorMessage}</div>

                  <button
                    type="button"
                    onClick={loadPopularMovies}
                    className="retry-btn"
                  >
                    <RefreshCw size={12} />
                    <span>Try Again</span>
                  </button>
                </div>
              </div>
            )}

            {isLoading ? (
              <div className="loading-indicator">
                <div className="spinner" />
                <p>Loading movies from TMDB...</p>
              </div>
            ) : (
              <MovieGrid
                movies={movies}
                title={
                  searchQuery
                    ? `Search Results for "${searchQuery}"`
                    : 'Popular Movies'
                }
                subtitle={
                  searchQuery
                    ? 'Movies matching your search'
                    : 'Popular movies from TMDB'
                }
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onSelectMovie={handleSelectMovie}
              />
            )}
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>CinemaFind • React + Vite + TMDB REST API</p>
        <p>Uses JavaScript fetch() and browser localStorage.</p>
      </footer>
    </div>
  );
}
