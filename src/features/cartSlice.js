import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",

  initialState:
    JSON.parse(localStorage.getItem("cart")) || [],

  reducers: {

    addToCart: (state, action) => {

      const existing = state.find(
        item => item.id === action.payload.id
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.push({
          ...action.payload,
          quantity: 1
        });
      }

      localStorage.setItem("cart", JSON.stringify(state));
      alert("added to cart");
    },

    removeFromCart: (state, action) => {

      const updated = state.filter(
        item => item.id !== action.payload
      );

      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    },

    increaseQuantity: (state, action) => {

      const item = state.find(
        item => item.id === action.payload
      );

      if (item) {
        item.quantity += 1;
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },

    decreaseQuantity: (state, action) => {

      const item = state.find(
        item => item.id === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },

    clearCart: () => {
      localStorage.removeItem("cart");
      return [];
    }

  }
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;