import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Heart, Calendar, Clock, Film, AlertCircle } from 'lucide-react';
import { fetchMovieDetails, getPosterUrl } from '../services/movieApi.js';

/**
 * MovieDetails Component (Pure CSS - No Tailwind)
 * 
 * Shows full movie information:
 * - High resolution poster
 * - Title and tagline
 * - Release date
 * - Rating and vote count
 * - Runtime
 * - Genres
 * - Full overview
 * - "Back" button
 * - Favorite button toggle
 */
export default function MovieDetails({ movie, onBack, isFavorite, onToggleFavorite }) {
  const [details, setDetails] = useState(movie);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadFullDetails() {
      if (!movie || !movie.id) return;
      setFetchError(null);

      try {
        const fullData = await fetchMovieDetails(movie.id);
        if (isMounted && fullData) {
          setDetails((prev) => ({ ...prev, ...fullData }));
        }
      } catch (err) {
        console.warn("Could not fetch extended movie details:", err);
        if (isMounted) {
          setFetchError("Extended details could not be loaded. Displaying basic info.");
        }
      }
    }

    loadFullDetails();

    return () => {
      isMounted = false;
    };
  }, [movie.id]);

  const posterSrc = getPosterUrl(details.poster_path, 'w780');

  const rating = typeof details.vote_average === 'number'
    ? details.vote_average.toFixed(1)
    : 'N/A';

  const formatRuntime = (minutes) => {
    if (!minutes) return null;
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs}h ${mins}m`;
  };

  return (
    <div className="details-container">
      {/* Top Bar with Back and Favorite Buttons */}
      <div className="details-top-bar">
        <button
          onClick={onBack}
          className="back-btn"
        >
          <ArrowLeft size={16} />
          <span>Back to Movies</span>
        </button>

        <button
          onClick={() => onToggleFavorite(details)}
          className={`action-btn ${isFavorite ? '' : 'btn-secondary'}`}
          style={{
            backgroundColor: isFavorite ? 'var(--primary)' : 'var(--bg-card)',
            color: isFavorite ? '#fff' : 'var(--text-main)',
            border: isFavorite ? 'none' : '1px solid var(--border-color)'
          }}
        >
          <Heart size={16} fill={isFavorite ? '#fff' : 'none'} />
          <span>{isFavorite ? 'Saved to Favorites' : 'Add to Favorites'}</span>
        </button>
      </div>

      {fetchError && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', backgroundColor: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.3)', borderRadius: 'var(--radius-sm)', color: 'var(--accent-gold)', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
          <AlertCircle size={16} />
          <span>{fetchError}</span>
        </div>
      )}

      {/* Main Details Card */}
      <div className="details-card">
        <div className="details-layout">
          {/* Large Poster */}
          <div className="details-poster-box">
            <img
              src={posterSrc}
              alt={details.title}
              className="details-poster-img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/600x900/151d30/94a3b8?text=No+Poster';
              }}
            />
          </div>

          {/* Metadata & Synopsis */}
          <div className="details-info">
            <div>
              <h1 className="details-title">{details.title}</h1>
              {details.tagline && (
                <p className="details-tagline">"{details.tagline}"</p>
              )}
            </div>

            {/* Badges */}
            <div className="meta-badges-row">
              <div className="meta-badge gold">
                <Star size={15} fill="currentColor" />
                <span>{rating} / 10</span>
                {details.vote_count && (
                  <span style={{ opacity: 0.7, fontWeight: 400, fontSize: '0.75rem' }}>
                    ({details.vote_count.toLocaleString()} votes)
                  </span>
                )}
              </div>

              {details.release_date && (
                <div className="meta-badge">
                  <Calendar size={15} color="var(--text-muted)" />
                  <span>{details.release_date}</span>
                </div>
              )}

              {details.runtime ? (
                <div className="meta-badge">
                  <Clock size={15} color="var(--text-muted)" />
                  <span>{formatRuntime(details.runtime)}</span>
                </div>
              ) : null}
            </div>

            {/* Genres */}
            {details.genres && details.genres.length > 0 && (
              <div className="genres-section">
                <span className="section-label">Genres</span>
                <div className="genres-pills">
                  {details.genres.map((g) => (
                    <span key={g.id || g.name} className="genre-pill">
                      {g.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Overview */}
            <div>
              <span className="section-label">Overview</span>
              <p className="overview-text" style={{ marginTop: '0.4rem' }}>
                {details.overview || 'No synopsis is available for this title.'}
              </p>
            </div>

            {/* REST API Viva Reference */}
            <div className="details-api-note">
              <Film size={15} />
              <span>
                Data from TMDB endpoint: <code>/movie/{details.id}</code>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
