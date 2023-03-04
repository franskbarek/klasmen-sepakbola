import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL_PUBLIC = "https://fakestoreapi.com/products";
const URL_JSON_SERVER = "http://localhost:5000/products";

export const getProducts = createAsyncThunk("products/getProducts", async () => {
  let url = URL_JSON_SERVER;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch data from ${url}. Falling back to public API...`);
    url = URL_PUBLIC;
  }
  const response = await axios.get(url);
  return response.data;
});

export const saveProduct = createAsyncThunk("products/saveProduct", async ({ title, price }) => {
  const response = await axios.post(URL_JSON_SERVER, {
    title,
    price,
  });
  return response.data;
});

export const updateProduct = createAsyncThunk("products/updateProduct", async ({ id, title, price }) => {
  const response = await axios.patch(`${URL_JSON_SERVER}/${id}`, {
    title,
    price,
    id,
  });
  return response.data;
});

export const deleteProduct = createAsyncThunk("products/deleteProduct", async (id) => {
  await axios.delete(`${URL_JSON_SERVER}/${id}`);
  return id;
});

const productEntity = createEntityAdapter({
  productId: (product) => product.id,
});

const productSlice = createSlice({
  name: "product",
  initialState: productEntity.getInitialState(),
  extraReducers: {
    [getProducts.fulfilled]: (state, action) => {
      productEntity.setAll(state, action.payload);
    },
    [saveProduct.fulfilled]: (state, action) => {
      productEntity.addOne(state, action.payload);
    },
    [deleteProduct.fulfilled]: (state, action) => {
      productEntity.removeOne(state, action.payload);
    },
    [updateProduct.fulfilled]: (state, action) => {
      productEntity.updateOne(state, { id: action.payload.id, updates: action.payload });
    },
  },
});

export const productSelectors = productEntity.getSelectors((state) => state.product);
export default productSlice.reducer;
