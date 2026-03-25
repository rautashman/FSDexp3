// src/pages/CartPage.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, clearCart, incrementQuantity, decrementQuantity } from '../redux/cartSlice';

function CartPage() {
  // useSelector reads from Redux global state
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="page cart-empty">
        <h2>Your Cart is Empty</h2>
        <Link to="/products" className="btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="page cart-page">
      <h1>Shopping Cart</h1>
      <div className="cart-container">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>${item.price}</p>
              </div>
              <div className="cart-item-actions">
                <button onClick={() => dispatch(decrementQuantity(item.id))} className="btn-qty">-</button>
                <span className="qty-display">{item.quantity}</span>
                <button onClick={() => dispatch(incrementQuantity(item.id))} className="btn-qty">+</button>
                <button onClick={() => dispatch(removeFromCart(item.id))} className="btn-remove">Remove</button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="cart-summary">
          <h2>Cart Summary</h2>
          <p>Total Items: {totalItems}</p>
          <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
          <button className="btn-checkout" onClick={() => alert('Checkout logic not implemented.')}>
            Proceed to Checkout
          </button>
          <button className="btn-clear" onClick={() => dispatch(clearCart())}>
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
