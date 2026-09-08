import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Heart, Calendar, Clock, Tag, Film, Sparkles } from './Icons';
import { getMovieDetails } from '../services/movieApi';

export default function MovieDetails({
  movie,
  onBack,
  isFavorite,
  onToggleFavorite,
}) {
  const [detailedMovie, setDetailedMovie] = useState(movie);
  const [imgError, setImgError] = useState(false);

  // Fetch full details if needed
  useEffect(() => {
    let isMounted = true;
    if (movie && movie.id) {
      getMovieDetails(movie.id, movie)
        .then((fullData) => {
          if (isMounted && fullData) {
            setDetailedMovie(fullData);
          }
        })
        .catch(() => {
          // Keep current movie data on error
        });
    }
    return () => {
      isMounted = false;
    };
  }, [movie]);

  if (!movie) return null;

  return (
    <section id="movie-details-view" className="details-container">
      {/* Back Button */}
      <button
        id="details-back-btn"
        type="button"
        onClick={onBack}
        className="back-btn"
      >
        <ArrowLeft size={16} />
        <span>Back to Movies</span>
      </button>

      {/* Main Details Card */}
      <div className="details-card">
        {/* Ambient Backdrop */}
        {detailedMovie.backdropUrl && (
          <div className="details-backdrop-ambient">
            <img
              src={detailedMovie.backdropUrl}
              alt=""
              className="details-backdrop-img"
            />
            <div className="details-backdrop-gradient" />
          </div>
        )}

        <div className="details-body">
          {/* Large Movie Poster */}
          <div className="details-poster-box">
            {detailedMovie.posterUrl && !imgError ? (
              <img
                id="details-large-poster"
                src={detailedMovie.posterUrl}
                alt={detailedMovie.title}
                onError={() => setImgError(true)}
                className="details-poster-img"
              />
            ) : (
              <div className="poster-fallback">
                <Film size={48} />
                <span>No Poster Available</span>
              </div>
            )}
          </div>

          {/* Details Content */}
          <div className="details-info">
            {/* Title */}
            <h1 id="details-movie-title" className="details-title">
              {detailedMovie.title}
            </h1>

            {/* Release Year, Rating, Runtime Bar */}
            <div className="details-meta-bar">
              {/* Rating */}
              <div id="details-rating-badge" className="meta-chip rating">
                <Star size={15} fill="currentColor" />
                <span>{detailedMovie.rating} / 10</span>
              </div>

              {/* Release Date */}
              <div className="meta-chip">
                <Calendar size={14} />
                <span>
                  Release Date: <strong style={{ color: '#fff' }}>{detailedMovie.releaseDate}</strong>
                </span>
              </div>

              {/* Runtime */}
              {detailedMovie.runtime && (
                <div className="meta-chip">
                  <Clock size={14} />
                  <span>{detailedMovie.runtime}</span>
                </div>
              )}
            </div>

            {/* Genres */}
            {detailedMovie.genres && detailedMovie.genres.length > 0 && (
              <div className="details-genres">
                <div className="details-section-label">
                  <Tag size={14} />
                  <span>Genres</span>
                </div>
                <div className="genres-pill-wrap">
                  {detailedMovie.genres.map((genre, idx) => (
                    <span key={idx} className="genre-tag">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Overview */}
            <div className="details-synopsis">
              <h2 className="details-section-label">
                Overview
              </h2>
              <p id="details-overview" className="details-synopsis-text">
                {detailedMovie.overview}
              </p>
            </div>

            {/* Actions Bar */}
            <div className="details-actions">
              <button
                id="details-favorite-toggle-btn"
                type="button"
                onClick={() => onToggleFavorite(detailedMovie)}
                className={`toggle-fav-main-btn ${isFavorite ? 'is-fav' : ''}`}
              >
                <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
                <span>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</span>
              </button>

              <span className="details-storage-note">
                <Sparkles size={14} style={{ color: 'var(--accent-gold)' }} />
                <span>Saved in browser localStorage</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
