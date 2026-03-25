// src/pages/SearchPage.js
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductList from '../components/ProductList';
import { products } from '../data/products';

function SearchPage() {
  // Dedicated search page, reading a "name" query parameter via useSearchParams
  const [searchParams, setSearchParams] = useSearchParams();
  const rawSearchParam = searchParams.get('name') || '';
  
  const [searchInput, setSearchInput] = useState(rawSearchParam);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ name: searchInput });
  };

  const filtered = rawSearchParam 
    ? products.filter(p => p.name.toLowerCase().includes(rawSearchParam.toLowerCase()))
    : [];

  return (
    <div className="page search-page">
      <h1>Global Search</h1>
      
      <form onSubmit={handleSearchSubmit} className="search-page-form">
        <input 
          type="text" 
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by product name..."
          className="search-page-input"
        />
        <button type="submit" className="btn-primary">Search</button>
      </form>

      {rawSearchParam && (
        <div className="search-results">
          <h2>Results for: "{rawSearchParam}"</h2>
          <ProductList products={filtered} />
        </div>
      )}
    </div>
  );
}

export default SearchPage;
