import React from 'react';
import MovieCard from './MovieCard';
import { Film, SearchX } from './Icons';

export default function MovieGrid({
  movies,
  title = 'Search Results',
  isSearchActive,
  searchQuery,
  favorites,
  onToggleFavorite,
  onSelectMovie,
  onClearSearch,
}) {
  const favoriteIds = new Set(favorites.map((m) => m.id));

  // "No movies found" state
  if (isSearchActive && (!movies || movies.length === 0)) {
    return (
      <div id="no-movies-found" className="empty-box">
        <div className="empty-icon-circle search">
          <SearchX size={32} />
        </div>
        <h3 className="empty-title">No movies found</h3>
        <p className="empty-desc">
          We couldn't find any results matching{' '}
          <span style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>
            "{searchQuery}"
          </span>
          . Please try checking your spelling or searching for another title.
        </p>
        {onClearSearch && (
          <button
            id="clear-search-fallback-btn"
            onClick={onClearSearch}
            className="empty-btn"
          >
            Clear Search & Show Popular
          </button>
        )}
      </div>
    );
  }

  // Regular grid
  return (
    <section id="movie-grid-section" className="grid-section">
      <div className="grid-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h2 id="grid-title" className="grid-title">
              <Film size={22} style={{ color: 'var(--accent-gold)' }} />
              {title}
            </h2>
            {isSearchActive && searchQuery && (
              <p className="grid-subtitle">
                Found {movies.length} {movies.length === 1 ? 'title' : 'titles'} for{' '}
                <span style={{ color: 'var(--accent-gold)', fontWeight: 500 }}>
                  "{searchQuery}"
                </span>
              </p>
            )}
          </div>

          {isSearchActive && onClearSearch && (
            <button
              onClick={onClearSearch}
              style={{
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
                cursor: 'pointer'
              }}
            >
              View Popular Movies
            </button>
          )}
        </div>
      </div>

      <div id="movies-grid" className="movies-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={favoriteIds.has(movie.id)}
            onToggleFavorite={onToggleFavorite}
            onSelectMovie={onSelectMovie}
          />
        ))}
      </div>
    </section>
  );
}
