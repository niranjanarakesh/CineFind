import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

/**
 * SearchBar Component (Pure CSS - No Tailwind)
 * 
 * Demonstrates:
 * - Controlled input with useState()
 * - Form submission handling with e.preventDefault()
 * - Callback prop to trigger search in parent component
 */
export default function SearchBar({ onSearch, currentQuery, onClearSearch }) {
  // Local state for the text typed into the search box
  const [searchTerm, setSearchTerm] = useState(currentQuery || '');

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      onSearch(searchTerm.trim());
    }
  };

  // Clear search field handler
  const handleClear = () => {
    setSearchTerm('');
    if (onClearSearch) {
      onClearSearch();
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-wrapper">
          <Search className="search-icon" size={20} />
          
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search movies (e.g. Inception, Avatar, Batman)..."
            className="search-input"
          />

          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="clear-search-btn"
              title="Clear search"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <button
          type="submit"
          className="search-submit-btn"
        >
          <Search size={18} />
          <span>Search</span>
        </button>
      </form>
    </div>
  );
}
