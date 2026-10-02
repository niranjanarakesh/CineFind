import React from 'react';
import MovieCard from './MovieCard.jsx';
import { Film } from 'lucide-react';

/**
 * MovieGrid Component (Pure CSS - No Tailwind)
 * 
 * Renders a responsive CSS grid of MovieCard components,
 * header titles, and empty states.
 */
export default function MovieGrid({
  movies,
  title,
  subtitle,
  favorites = [],
  onToggleFavorite,
  onSelectMovie
}) {
  const isMovieFavorite = (movieId) => {
    return favorites.some((fav) => fav.id === movieId);
  };

  return (
    <section className="movie-section">
      {/* Header */}
      {title && (
        <div className="section-header">
          <div>
            <h2 className="section-title">{title}</h2>
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>
          <span className="movie-count-tag">
            {movies.length} {movies.length === 1 ? 'movie' : 'movies'}
          </span>
        </div>
      )}

      {/* Empty State */}
      {movies.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <Film size={28} />
          </div>
          <h3 className="empty-title">No movies found</h3>
          <p className="empty-text">
            We couldn't find any movies matching your query. Try checking your spelling or search for popular titles like Inception, Avatar, or Batman.
          </p>
        </div>
      ) : (
        /* Responsive Grid */
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={isMovieFavorite(movie.id)}
              onToggleFavorite={onToggleFavorite}
              onSelectMovie={onSelectMovie}
            />
          ))}
        </div>
      )}
    </section>
  );
}
