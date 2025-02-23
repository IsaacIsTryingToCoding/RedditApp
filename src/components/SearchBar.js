import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      onSearch(query);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search subreddit..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">
          <FaSearch />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
