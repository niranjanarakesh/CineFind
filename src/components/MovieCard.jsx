import React from 'react';
import { Star, Heart } from 'lucide-react';
import { getPosterUrl } from '../services/movieApi.js';

/**
 * MovieCard Component (Pure CSS - No Tailwind)
 * 
 * Displays movie poster, title, release year, TMDB rating, short synopsis,
 * favorite heart button, and click-to-view details.
 */
export default function MovieCard({ movie, isFavorite, onToggleFavorite, onSelectMovie }) {
  // Extract 4-digit release year
  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';

  // Format rating score (e.g. 8.4)
  const rating = typeof movie.vote_average === 'number'
    ? movie.vote_average.toFixed(1)
    : 'N/A';

  const posterSrc = getPosterUrl(movie.poster_path);

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // Prevents opening movie details
    onToggleFavorite(movie);
  };

  return (
    <div
      onClick={() => onSelectMovie(movie)}
      className="movie-card"
    >
      {/* Poster Image Container */}
      <div className="card-poster-wrapper">
        <img
          src={posterSrc}
          alt={movie.title || 'Movie Poster'}
          loading="lazy"
          className="card-poster"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://placehold.co/500x750/151d30/94a3b8?text=No+Poster';
          }}
        />

        {/* Favorite Heart Button */}
        <button
          type="button"
          onClick={handleFavoriteClick}
          className={`card-favorite-btn ${isFavorite ? 'active' : ''}`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            size={18}
            fill={isFavorite ? 'currentColor' : 'none'}
          />
        </button>

        {/* Rating Badge */}
        <div className="card-rating-badge">
          <Star size={13} fill="currentColor" />
          <span>{rating}</span>
        </div>

        {/* Year Badge */}
        <div className="card-year-badge">
          {releaseYear}
        </div>
      </div>

      {/* Card Content */}
      <div className="card-body">
        <div>
          <h3 className="card-title" title={movie.title}>
            {movie.title}
          </h3>
          <p className="card-overview">
            {movie.overview || 'No synopsis provided for this title.'}
          </p>
        </div>

        <div className="card-footer">
          <span>View Details &rarr;</span>
        </div>
      </div>
    </div>
  );
}
