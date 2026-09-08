import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';
import MovieDetails from './components/MovieDetails';
import Favorites from './components/Favorites';
import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';
import { searchMovies, getPopularMovies } from './services/movieApi';
import { Code2, Layers } from './components/Icons';

const POPULAR_SUGGESTIONS = ['Inception', 'Avatar', 'Interstellar', 'Batman', 'Dune'];

export default function App() {
  // Navigation & View state
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'favorites' | 'details'
  const [previousView, setPreviousView] = useState('home');

  // Search & Movies state
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearchQuery, setActiveSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('cinefind_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cinefind_favorites', JSON.stringify(favorites));
    } catch (err) {
      console.error('Error saving favorites to localStorage:', err);
    }
  }, [favorites]);

  // Load popular movies on initial mount
  const loadPopularMovies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const results = await getPopularMovies();
      setMovies(results);
      setActiveSearchQuery('');
    } catch (err) {
      setError(err.message || 'Failed to fetch popular movies from the API.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPopularMovies();
  }, [loadPopularMovies]);

  // Handle movie search using Fetch API
  const handleSearch = async (queryToSearch) => {
    const query = (queryToSearch || searchQuery).trim();
    if (!query) return;

    setIsLoading(true);
    setError(null);
    setActiveSearchQuery(query);
    setCurrentView('home');

    try {
      const results = await searchMovies(query);
      setMovies(results);
    } catch (err) {
      setError(err.message || 'Error executing search query via Fetch API.');
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear search and reset to popular movies
  const handleClearSearch = () => {
    setSearchQuery('');
    setActiveSearchQuery('');
    loadPopularMovies();
  };

  // Toggle favorite status for a movie
  const handleToggleFavorite = (movie) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === movie.id);
      if (exists) {
        return prev.filter((item) => item.id !== movie.id);
      } else {
        return [...prev, movie];
      }
    });
  };

  // Clear all favorites
  const handleClearAllFavorites = () => {
    if (window.confirm('Are you sure you want to remove all favorite movies?')) {
      setFavorites([]);
    }
  };

  // Open movie details
  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    setPreviousView(currentView === 'details' ? 'home' : currentView);
    setCurrentView('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Return back from movie details
  const handleBackFromDetails = () => {
    setCurrentView(previousView);
    setSelectedMovie(null);
  };

  // Quick return to home
  const handleHomeClick = () => {
    setCurrentView('home');
    setSelectedMovie(null);
  };

  const isMovieFavorite = (id) => favorites.some((m) => m.id === id);

  return (
    <div className="app-container">
      {/* Header / Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={(view) => {
          setCurrentView(view);
          if (view !== 'details') setSelectedMovie(null);
        }}
        favoritesCount={favorites.length}
        onHomeClick={handleHomeClick}
      />

      {/* Main App Canvas */}
      <main className="main-canvas">
        {/* VIEW: Movie Details */}
        {currentView === 'details' && selectedMovie && (
          <MovieDetails
            movie={selectedMovie}
            onBack={handleBackFromDetails}
            isFavorite={isMovieFavorite(selectedMovie.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {/* VIEW: Favorites */}
        {currentView === 'favorites' && (
          <Favorites
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onClearAllFavorites={handleClearAllFavorites}
            onSelectMovie={handleSelectMovie}
            onExploreMovies={handleHomeClick}
          />
        )}

        {/* VIEW: Home Explorer */}
        {currentView === 'home' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            {/* Hero Section */}
            <div className="hero-section">
              <h1 className="hero-title">
                Find Your Next Movie
              </h1>

              <p className="hero-desc">
                Discover movies from around the world using the TMDB public REST API and native JavaScript Fetch.
              </p>

              {/* Search Bar Component */}
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSearch={handleSearch}
                onClear={handleClearSearch}
                isLoading={isLoading}
              />

              {/* Quick Suggestion Pills */}
              <div className="suggestion-bar">
                <span className="suggestion-label">Popular Searches:</span>
                {POPULAR_SUGGESTIONS.map((title) => (
                  <button
                    key={title}
                    type="button"
                    onClick={() => {
                      setSearchQuery(title);
                      handleSearch(title);
                    }}
                    className="suggestion-pill"
                  >
                    {title}
                  </button>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div style={{ width: '100%', margin: '1rem 0' }}>
                <ErrorMessage
                  message={error}
                  onRetry={() => (activeSearchQuery ? handleSearch(activeSearchQuery) : loadPopularMovies())}
                />
              </div>
            )}

            {/* Loading Indicator */}
            {isLoading && (
              <div style={{ width: '100%', margin: '2rem 0' }}>
                <Loading
                  message={
                    activeSearchQuery
                      ? `Searching for "${activeSearchQuery}" via Fetch API...`
                      : 'Fetching popular movies from TMDB REST API...'
                  }
                />
              </div>
            )}

            {/* Movie Grid */}
            {!isLoading && !error && (
              <div style={{ width: '100%', marginTop: '1rem' }}>
                <MovieGrid
                  movies={movies}
                  title={activeSearchQuery ? `Search Results for "${activeSearchQuery}"` : 'Popular Movies'}
                  isSearchActive={Boolean(activeSearchQuery)}
                  searchQuery={activeSearchQuery}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                  onSelectMovie={handleSelectMovie}
                  onClearSearch={handleClearSearch}
                />
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>CineFind</span>
          </div>

          <div className="footer-tags">
            <span className="footer-tag">
              <Code2 size={14} style={{ color: 'var(--accent-gold)' }} />
              <span>Native Fetch API</span>
            </span>
            <span>•</span>
            <span className="footer-tag">
              <Layers size={14} style={{ color: 'var(--accent-gold)' }} />
              <span>REST API Consumer</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
