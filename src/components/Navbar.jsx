import React from 'react';
import { Film, Heart, Home, Sparkles } from './Icons';

export default function Navbar({ currentView, setCurrentView, favoritesCount, onHomeClick }) {
  return (
    <header className="navbar">
      <div className="nav-content">
        {/* Brand Logo */}
        <button
          id="nav-brand-btn"
          onClick={onHomeClick}
          className="nav-brand"
        >
          <div className="brand-icon-box">
            <Film size={20} />
          </div>
          <div>
            <span className="brand-title">
              Cine<span>Find</span>
            </span>
            <span className="brand-subtitle">
              TMDB Movie Finder
            </span>
          </div>
        </button>

        {/* Navigation Tabs */}
        <nav className="nav-links">
          <button
            id="nav-home-btn"
            onClick={onHomeClick}
            className={`nav-btn ${currentView === 'home' ? 'active-home' : ''}`}
          >
            <Home size={16} />
            <span>Home</span>
          </button>

          <button
            id="nav-favorites-btn"
            onClick={() => setCurrentView('favorites')}
            className={`nav-btn ${currentView === 'favorites' ? 'active-fav' : ''}`}
          >
            <Heart size={16} fill={favoritesCount > 0 ? '#ef4444' : 'none'} />
            <span>Favorites</span>
            {favoritesCount > 0 && (
              <span id="favorites-counter-badge" className="badge-counter">
                {favoritesCount}
              </span>
            )}
          </button>
        </nav>

        {/* API Indicator */}
        <div className="nav-api-badge" title="Consuming TMDB REST API via native browser Fetch">
          <span className="status-dot" />
          <span>API: <strong>TMDB REST (Fetch)</strong></span>
          <Sparkles size={14} style={{ color: 'var(--accent-gold)' }} />
        </div>
      </div>
    </header>
  );
}
