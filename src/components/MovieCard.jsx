import React, { useState } from 'react';
import { Star, Heart, Film } from './Icons';

export default function MovieCard({
  movie,
  isFavorite,
  onToggleFavorite,
  onSelectMovie,
}) {
  const [imgError, setImgError] = useState(false);

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevent opening card details
    onToggleFavorite(movie);
  };

  return (
    <article
      id={`movie-card-${movie.id}`}
      onClick={() => onSelectMovie(movie)}
      className="movie-card"
    >
      {/* Poster Image Container */}
      <div className="card-poster-wrapper">
        {movie.posterUrl && !imgError ? (
          <img
            src={movie.posterUrl}
            alt={movie.title}
            onError={() => setImgError(true)}
            loading="lazy"
            className="card-poster-img"
          />
        ) : (
          <div className="poster-fallback">
            <Film size={40} />
            <span>No Poster Available</span>
          </div>
        )}

        {/* Top Badges */}
        <div className="card-overlay-top">
          {/* Rating */}
          <div className="card-rating-badge">
            <Star size={13} fill="currentColor" />
            <span>{movie.rating}</span>
          </div>

          {/* Favorite Heart Button */}
          <button
            id={`fav-btn-${movie.id}`}
            type="button"
            onClick={handleFavoriteClick}
            className={`card-fav-btn ${isFavorite ? 'is-fav' : ''}`}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Release Year Pill */}
        {movie.releaseYear && movie.releaseYear !== 'N/A' && (
          <span className="card-year-pill">{movie.releaseYear}</span>
        )}
      </div>

      {/* Card Body */}
      <div className="card-body">
        <div>
          <h3
            id={`movie-title-${movie.id}`}
            className="card-title"
            title={movie.title}
          >
            {movie.title}
          </h3>

          <p className="card-overview">
            {movie.overview}
          </p>
        </div>

        {/* Card Footer Action */}
        <div className="card-footer">
          <span>Click for details →</span>

          <button
            type="button"
            onClick={handleFavoriteClick}
            className={`card-footer-fav ${isFavorite ? 'is-fav' : ''}`}
          >
            <Heart size={14} fill={isFavorite ? 'currentColor' : 'none'} />
            <span>{isFavorite ? 'Favorited' : 'Favorite'}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
