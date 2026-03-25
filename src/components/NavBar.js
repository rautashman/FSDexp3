// src/components/NavBar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function NavBar() {
  const cart = useSelector((state) => state.cart);
  const location = useLocation(); // Used to visually indicate current route matching

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const getLinkClass = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        {/* Navigation without reload using Link */}
        <Link to="/">ReactMart</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className={getLinkClass('/')}>Home</Link>
        <Link to="/products" className={getLinkClass('/products')}>Products</Link>
        <Link to="/search" className={getLinkClass('/search')}>Search</Link>
        <Link to="/about" className={getLinkClass('/about')}>About</Link>
        <Link to="/cart" className={getLinkClass('/cart')}>
          Cart ({totalCartItems})
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
