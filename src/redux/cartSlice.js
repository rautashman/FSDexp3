// src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Redux is used here because the cart state needs to be accessed and modified
// from many different components (NavBar, ProductCard, CartPage).
// Redux allows any component to access or update this global data.
const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      // action.payload is the product
      const existingProduct = state.find(item => item.id === action.payload.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      // action.payload is product id
      return state.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      return [];
    },
    incrementQuantity: (state, action) => {
      const existingProduct = state.find(item => item.id === action.payload);
      if (existingProduct) {
        existingProduct.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const existingProduct = state.find(item => item.id === action.payload);
      if (existingProduct && existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
      } else if (existingProduct && existingProduct.quantity === 1) {
        return state.filter(item => item.id !== action.payload);
      }
    }
  }
});

export const { addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
