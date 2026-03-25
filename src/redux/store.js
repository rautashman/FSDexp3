// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

// Why Redux Toolkit? It simplifies setting up the Redux store and reducers.
const store = configureStore({
  reducer: {
    cart: cartReducer
  }
});

export default store;
