import React from 'react';
import { Film } from './Icons';

export default function Loading({ message = 'Fetching movies from TMDB REST API...' }) {
  return (
    <div id="loading-container" className="loading-box">
      <div className="spinner-wrap">
        <div className="spinner-ring" />
        <Film size={24} className="spinner-icon" />
      </div>
      <p id="loading-text" className="loading-msg">
        {message}
      </p>
      <span className="loading-sub">Executing HTTP GET via native Fetch API...</span>
    </div>
  );
}
