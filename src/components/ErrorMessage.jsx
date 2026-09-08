import React from 'react';
import { AlertCircle, RefreshCw, Key } from './Icons';

export default function ErrorMessage({ message, onRetry }) {
  const isKeyIssue =
    message &&
    (message.toLowerCase().includes('api key') ||
      message.toLowerCase().includes('401') ||
      message.toLowerCase().includes('unauthorized'));

  return (
    <div id="error-message-container" className="error-card">
      <div className="error-icon-box">
        {isKeyIssue ? <Key size={24} /> : <AlertCircle size={24} />}
      </div>

      <h3 id="error-title" className="error-title">
        API Request Failed
      </h3>

      <p id="error-description" className="error-text">
        {message || 'An unexpected error occurred while communicating with the TMDB REST API.'}
      </p>

      {isKeyIssue && (
        <div className="error-tip-box">
          <p className="error-tip-title">Configuration Guide:</p>
          <p>1. Copy <strong>.env.example</strong> to <strong>.env</strong></p>
          <p>2. Set <strong>VITE_TMDB_API_KEY=your_actual_key</strong></p>
          <p>3. Restart development server with <strong>npm run dev</strong></p>
        </div>
      )}

      {onRetry && (
        <button id="error-retry-btn" onClick={onRetry} className="error-retry-btn">
          <RefreshCw size={16} />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
}
