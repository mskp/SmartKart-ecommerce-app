import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { usdToInr } from "../../utils";

export const fetchProducts = createAsyncThunk(
  "products/fetchBySearchTerm",
  async (_, { rejectWithValue }) => {
    try {
      const storedProducts = sessionStorage.getItem("products");
      if (storedProducts) {
        return JSON.parse(storedProducts);
      }
      const response = await fetch(`https://fakestoreapi.com/products`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();

      const updatedProducts = [];
      for (const product of data) {
        const priceInINR = await usdToInr(product.price);
        updatedProducts.push({ ...product, priceInINR });
      }
      sessionStorage.setItem("products", JSON.stringify(updatedProducts));
      return updatedProducts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      const product = await response.json();
      const priceInINR = await usdToInr(product.price);
      return { ...product, priceInINR };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  products: [],
  isLoading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = [action.payload]; // Single product
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const selectProducts = (state) => state.products;

export const productsReducer = productsSlice.reducer;
