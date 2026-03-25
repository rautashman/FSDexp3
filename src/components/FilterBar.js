// src/components/FilterBar.js
import React, { useState } from 'react';

function FilterBar({ initialSearch, initialCategory, onFilterChange }) {
  // useState for local component state before syncing to props
  const [searchTerm, setSearchTerm] = useState(initialSearch || '');
  const [category, setCategory] = useState(initialCategory || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass event handler via props
    onFilterChange(searchTerm, category); /*useState hook keeps track of these*/
  };

  return (
    <form className="filter-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="filter-input"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="filter-select"
      >
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="fashion">Fashion</option>
        <option value="books">Books</option>
      </select>
      <button type="submit" className="btn-filter">Apply Filters</button>
    </form>
  );
}

export default FilterBar;
