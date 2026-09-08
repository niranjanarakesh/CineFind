import React from 'react';
import { Search, X } from './Icons';

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  onSearch,
  onClear,
  isLoading,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="search-wrapper">
      <form onSubmit={handleSubmit} className="search-form">
        {/* Search Icon */}
        <div className="search-icon-pos">
          <Search size={18} />
        </div>

        {/* Input */}
        <input
          id="movie-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for a movie (e.g., Inception, Avatar, Interstellar)..."
          className="search-input"
        />

        {/* Clear Button */}
        {searchQuery && (
          <button
            id="search-clear-btn"
            type="button"
            onClick={onClear}
            className="search-clear-btn"
            title="Clear search"
          >
            <X size={16} />
          </button>
        )}

        {/* Search Button */}
        <button
          id="search-submit-btn"
          type="submit"
          disabled={isLoading || !searchQuery.trim()}
          className="search-submit-btn"
        >
          <span>Search</span>
        </button>
      </form>
    </div>
  );
}
