import React from 'react';
import { Film, Heart, Home } from 'lucide-react';

export default function Navbar({ activeTab, onSelectTab, favoritesCount }) {
  return (
    <header className="navbar">
      <div className="nav-inner">
        <button
          type="button"
          className="brand-section"
          onClick={() => onSelectTab('home')}
        >
          <div className="brand-icon">
            <Film size={22} />
          </div>

          <div className="brand-title-wrap">
            <div className="brand-title-row">
              <span className="brand-name">CinemaFind</span>
              <span className="brand-badge">TMDB</span>
            </div>
            <span className="brand-subtitle">Find your next movie</span>
          </div>
        </button>

        <nav className="nav-actions">
          <button
            type="button"
            onClick={() => onSelectTab('home')}
            className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`}
          >
            <Home size={18} />
            <span>Home</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('favorites')}
            className={`nav-btn ${activeTab === 'favorites' ? 'active' : ''}`}
          >
            <Heart size={18} fill={favoritesCount > 0 ? 'currentColor' : 'none'} />
            <span>Favorites</span>

            {favoritesCount > 0 && (
              <span className="nav-count-badge">{favoritesCount}</span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
