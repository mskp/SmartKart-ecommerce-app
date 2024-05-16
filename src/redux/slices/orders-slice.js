import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase.config";

const initialState = {
  orders: [],
  addingOrder: false,
  fetchingOrders: false,
  errorAdding: null,
  errorFetching: null,
};

export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (_, { getState }) => {
    const state = getState();
    const userId = state.auth.user.uid;
    const ordersRef = collection(db, "orders");
    const q = query(
      ordersRef,
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    try {
      const querySnapshot = await getDocs(q);
      const userOrders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return userOrders;
    } catch (error) {
      console.log("Error aa gay amaiya", error);
      throw error;
    }
  }
);

export const addOrderToFirestore = createAsyncThunk(
  "orders/addOrder",
  async (orderData, { getState }) => {
    const state = getState();
    const ordersRef = collection(db, "orders");
    const newOrder = {
      ...orderData,
      userId: state.auth.user.uid,
      createdAt: serverTimestamp(), // Add createdAt field with server timestamp
    };

    try {
      await addDoc(ordersRef, newOrder);
      return newOrder;
    } catch (error) {
      throw error;
    }
  }
);

export const addMultipleOrdersToFirestore = createAsyncThunk(
  "orders/addMultipleOrders",
  async (ordersData, { getState }) => {
    const state = getState();
    const ordersRef = collection(db, "orders");
    const userId = state.auth.user.uid;
    const newOrders = ordersData.map((order) => ({
      ...order,
      userId: userId,
      createdAt: serverTimestamp(), // Add createdAt field with server timestamp
    }));

    try {
      await Promise.all(newOrders.map((order) => addDoc(ordersRef, order)));
      return newOrders;
    } catch (error) {
      throw error;
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addOrderToFirestore.pending, (state) => {
        state.addingOrder = true;
        state.errorAdding = null;
      })
      .addCase(addOrderToFirestore.fulfilled, (state, action) => {
        state.addingOrder = false;
        state.orders.push(action.payload); // push the whole order directly
      })
      .addCase(addOrderToFirestore.rejected, (state, action) => {
        state.addingOrder = false;
        state.errorAdding = action.error.message;
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.fetchingOrders = true;
        state.errorFetching = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.fetchingOrders = false;
        state.orders = action.payload; // set orders directly to payload
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.fetchingOrders = false;
        state.errorFetching = action.error.message;
      })
      .addCase(addMultipleOrdersToFirestore.pending, (state) => {
        state.addingOrder = true;
        state.errorAdding = null;
      })
      .addCase(addMultipleOrdersToFirestore.fulfilled, (state, action) => {
        state.addingOrder = false;
        state.orders.push(...action.payload);
      })
      .addCase(addMultipleOrdersToFirestore.rejected, (state, action) => {
        state.addingOrder = false;
        state.errorAdding = action.error.message;
      });
  },
});

export const selectOrders = (state) => state.orders.orders;

export const selectOrderState = (state) => ({
  fetchingOrders: state.orders.fetchingOrders,
  addingOrder: state.orders.addingOrder,
  errorAdding: state.orders.errorAdding,
  errorFetching: state.orders.errorFetching,
});

export const ordersReducer = ordersSlice.reducer;
