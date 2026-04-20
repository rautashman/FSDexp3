// src/pages/CartPage.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, clearCart, incrementQuantity, decrementQuantity } from '../redux/cartSlice';

function CartPage() {
  // useSelector reads from Redux global state
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [checkoutForm, setCheckoutForm] = useState({
    customerName: '',
    email: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCheckoutForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitMessage('');

    if (!checkoutForm.customerName || !checkoutForm.email || !checkoutForm.address) {
      setSubmitError('Please fill all checkout fields.');
      return;
    }

    if (cart.length === 0) {
      setSubmitError('Your cart is empty.');
      return;
    }

    const payload = {
      customerName: checkoutForm.customerName,
      email: checkoutForm.email,
      address: checkoutForm.address,
      items: cart.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      totalItems,
      totalAmount
    };

    try {
      setIsSubmitting(true);

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const rawBody = await response.text();
      let data = {};

      if (rawBody) {
        try {
          data = JSON.parse(rawBody);
        } catch {
          data = { message: rawBody };
        }
      }

      if (!response.ok) {
        throw new Error(data.message || `Failed to place order (HTTP ${response.status})`);
      }

      setSubmitMessage(`Order placed successfully. Order ID: ${data.orderId}`);
      setCheckoutForm({ customerName: '', email: '', address: '' });
      dispatch(clearCart());
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

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

          <form className="checkout-form" onSubmit={handleCheckoutSubmit}>
            <input
              type="text"
              name="customerName"
              value={checkoutForm.customerName}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="checkout-input"
              required
            />
            <input
              type="email"
              name="email"
              value={checkoutForm.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="checkout-input"
              required
            />
            <textarea
              name="address"
              value={checkoutForm.address}
              onChange={handleInputChange}
              placeholder="Delivery Address"
              className="checkout-input checkout-textarea"
              rows="3"
              required
            />

            <button type="submit" className="btn-checkout" disabled={isSubmitting}>
              {isSubmitting ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>

          {submitMessage && <p className="checkout-success">{submitMessage}</p>}
          {submitError && <p className="checkout-error">{submitError}</p>}

          <button className="btn-clear" onClick={() => dispatch(clearCart())}>
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
