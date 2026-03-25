// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList';
import { products } from '../data/products';

function HomePage() {
  // Highlight a few products for the home page
  const highlightedProducts = products.slice(0, 4);

  return (
    <div className="page home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to ReactMart!</h1>
          <p>Your one-stop shop for everything React and more.</p>
          <Link to="/products" className="btn-primary hero-btn">Shop Now</Link>
        </div>
      </section>
      
      <section className="highlights-section">
        <h2>Featured Products</h2>
        {/* Pass array via props */}
        <ProductList products={highlightedProducts} />
        <div className="center-link">
          <Link to="/products" className="view-all-link">View All Products →</Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
