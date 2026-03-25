// src/pages/AboutPage.js
import React from 'react';

function AboutPage() {
  return (
    <div className="page about-page">
      <h1>About ReactMart</h1>
      <div className="about-content">
        <p>
          Welcome to ReactMart! This is a complete E-commerce Product Catalog web application 
          built using React to demonstrate core concepts like:
        </p>
        <ul>
          <li>Functional Components and Hooks (useState, useEffect)</li>
          <li>Component Composition and Props</li>
          <li>Global State Management with Redux and React-Redux</li>
          <li>Client-side Routing with React Router (react-router-dom)</li>
          <li>Path parameters and Query parameters</li>
        </ul>
        <p>
          This project runs entirely in the browser using mock data and Redux for state memory. 
          It allows you to browse products, search, filter, view details, and manage a shopping cart.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
