// src/pages/ProductDetailsPage.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { products } from '../data/products';

function ProductDetailsPage() {
  // useParams reads the path parameters (e.g., /products/:id)
  const { id } = useParams();
  const dispatch = useDispatch();

  // Find product from shared data source
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="page not-found">
        <h2>Product not found</h2>
        <Link to="/products" className="back-link">← Back to Products</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="page product-details-page">
      <Link to="/products" className="back-link">← Back to Products</Link>
      
      <div className="product-details-container">
        <div className="details-image-box">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="details-info-box">
          <h1>{product.name}</h1>
          <p className="details-category">Category: {product.category}</p>
          <p className="details-rating">Rating: {product.rating} / 5</p>
          <h2 className="details-price">${product.price}</h2>
          <p className="details-desc">{product.description}</p>
          
          <button onClick={handleAddToCart} className="btn-add-large">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
