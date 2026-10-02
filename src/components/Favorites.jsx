import React from 'react';
import { Heart, Trash2, ArrowLeft } from 'lucide-react';
import MovieCard from './MovieCard.jsx';

/**
 * Favorites Component (Pure CSS - No Tailwind)
 * 
 * Displays movies stored in browser localStorage.
 */
export default function Favorites({
  favorites,
  onToggleFavorite,
  onSelectMovie,
  onBackToBrowse,
  onClearAllFavorites
}) {
  return (
    <section className="favorites-container">
      {/* Header */}
      <div className="favorites-header">
        <div className="fav-title-wrap">
          <div className="fav-icon-box">
            <Heart size={24} fill="currentColor" />
          </div>
          <div>
            <h1 className="section-title">Favorite Movies</h1>
            <p className="section-subtitle">
              Stored locally in browser <code>localStorage</code>
            </p>
          </div>
        </div>

        <div className="fav-actions">
          <button
            onClick={onBackToBrowse}
            className="back-btn"
          >
            <ArrowLeft size={16} />
            <span>Back to Browse</span>
          </button>

          {favorites.length > 0 && (
            <button
              onClick={onClearAllFavorites}
              className="clear-favs-btn"
              title="Remove all saved favorites"
            >
              <Trash2 size={16} />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>

      {/* Empty State */}
      {favorites.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon" style={{ color: 'var(--primary)', backgroundColor: 'var(--primary-light)' }}>
            <Heart size={28} />
          </div>
          <h2 className="empty-title">No Favorites Yet</h2>
          <p className="empty-text">
            You haven't saved any movies yet. Click the heart icon on any movie card or details page to add it to your personal favorites list!
          </p>
          <button
            onClick={onBackToBrowse}
            className="action-btn"
          >
            Explore Movies
          </button>
        </div>
      ) : (
        /* Favorites Grid */
        <div className="movie-grid">
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
      )}
    </section>
  );
}
