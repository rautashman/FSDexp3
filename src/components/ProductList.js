// src/components/ProductList.js
import React from 'react';
import ProductCard from './ProductCard';

// Receives an array of products as a prop
function ProductList({ products }) { /*products is the prop*/
  if (products.length === 0) {
    return <p className="empty-message">No products found matching your criteria.</p>;
  }

  return (
    <div className="product-list">
      {/* Rendering a list of products with .map() */}
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
