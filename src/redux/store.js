import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth-slice";
import { cartReducer } from "./slices/cart-slice";
import { modalReducer } from "./slices/modal-slice";
import { ordersReducer } from "./slices/orders-slice";
import { productsReducer } from "./slices/product-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    orders: ordersReducer,
    products: productsReducer,
    orders: ordersReducer,
    modal: modalReducer,
  },
});

export default store;
