import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
  cartModalVisible: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        if (existingItem.quantity >= 5)
          throw new Error("Maximum quantity allowed per item is 5");
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeItem: (state, action) => {
      const idToRemove = action.payload;
      state.items = state.items.filter((item) => item.id !== idToRemove);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    updateItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.id === id);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems");
    },
    showCartModal: (state) => {
      state.cartModalVisible = true;
    },
    hideCartModal: (state) => {
      state.cartModalVisible = false;
    },
  },
});

export const selectCart = (state) => state.cart.items;
export const selectCartModalVisibility = (state) => state.cart.cartModalVisible;
export const selectTotalPrice = (state) => {
  return state.cart.items.reduce((total, item) => {
    return total + item.priceInINR * item.quantity;
  }, 0);
};

export const selectTotalProducts = (state) => {
  return state.cart.items.length;
};

export const {
  addItem,
  removeItem,
  updateItemQuantity,
  clearCart,
  showCartModal,
  hideCartModal,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
