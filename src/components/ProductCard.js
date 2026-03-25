// src/components/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

// Product object is passed via props
function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-content">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-price">${product.price}</p>
        
        <div className="product-actions">
          <Link to={`/products/${product.id}`} className="btn-details">
            View Details
          </Link>
          <button onClick={handleAddToCart} className="btn-add">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
