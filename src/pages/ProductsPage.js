// src/pages/ProductsPage.js
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductList from '../components/ProductList';
import FilterBar from '../components/FilterBar';
import { products } from '../data/products';

function ProductsPage() {
  // useSearchParams to read and write URL query params
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';

  // Local state for loading indication
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Simulate network delay
    setIsLoading(true);
    const timer = setTimeout(() => {
      let result = products;

      if (search) {
        result = result.filter(p => 
          p.name.toLowerCase().includes(search.toLowerCase()) || 
          p.description.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (category) {
        result = result.filter(p => p.category === category);
      }

      setFilteredProducts(result);
      setIsLoading(false);
    }, 500); // 500ms fake loading

    return () => clearTimeout(timer);
  }, [search, category]);

  const handleFilterChange = (newSearch, newCategory) => {
    // Sync filters to URL query params
    const params = {};
    if (newSearch) params.search = newSearch;
    if (newCategory) params.category = newCategory;
    setSearchParams(params);
  };

  return (
    <div className="page products-page">
      <h1>Our Products</h1>
      
      <FilterBar 
        initialSearch={search} 
        initialCategory={category} 
        onFilterChange={handleFilterChange} 
      />

      {/* Conditional rendering based on state */}
      {isLoading ? (
        <p className="loading-message">Loading products...</p>
      ) : (
        <ProductList products={filteredProducts} />
      )}
    </div>
  );
}

export default ProductsPage;
