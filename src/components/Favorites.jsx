import React from 'react';
import MovieCard from './MovieCard';
import { Heart, Trash2, ArrowLeft, Film } from './Icons';

export default function Favorites({
  favorites,
  onToggleFavorite,
  onClearAllFavorites,
  onSelectMovie,
  onExploreMovies,
}) {
  // Empty State matching requested design
  if (!favorites || favorites.length === 0) {
    return (
      <div id="favorites-empty-state" className="empty-box">
        <div className="empty-icon-circle heart">
          <Heart size={32} />
        </div>

        <h2 id="favorites-empty-title" className="empty-title">
          No favorite movies yet.
        </h2>

        <p className="empty-desc">
          Search for a movie and add it to your favorites. They will be stored safely in your browser.
        </p>

        <button
          id="favorites-explore-btn"
          type="button"
          onClick={onExploreMovies}
          className="empty-btn"
        >
          <Film size={16} />
          <span>Find Movies</span>
        </button>
      </div>
    );
  }

  return (
    <section id="favorites-section" className="favorites-container">
      {/* Top Header */}
      <div className="favorites-header">
        <div className="favorites-title-box">
          <h1 id="favorites-title" className="favorites-title">
            <Heart size={26} fill="var(--accent-red)" style={{ color: 'var(--accent-red)' }} />
            <span>My Favorite Movies</span>
            <span className="fav-badge-num">
              {favorites.length}
            </span>
          </h1>
        </div>

        <div className="favorites-actions">
          <button
            id="favorites-back-to-home-btn"
            type="button"
            onClick={onExploreMovies}
            className="fav-action-btn"
          >
            <ArrowLeft size={14} />
            <span>Back to Explorer</span>
          </button>

          {favorites.length > 1 && (
            <button
              id="clear-all-favorites-btn"
              type="button"
              onClick={onClearAllFavorites}
              className="fav-action-btn fav-clear-btn"
              title="Remove all favorite movies"
            >
              <Trash2 size={14} />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid of Saved Movies */}
      <div id="favorites-movie-grid" className="movies-grid">
        {favorites.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={true}
            onToggleFavorite={onToggleFavorite}
            onSelectMovie={onSelectMovie}
          />
        ))}
      </div>
    </section>
  );
}
