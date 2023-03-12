import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL_JSON_SERVER = "http://localhost:5000/classments";

export const getClassments = createAsyncThunk("classments/getClassments", async () => {
  try {
    const response = await axios.get(URL_JSON_SERVER);
    return response.data;
  } catch (err) {
    console.error(err.message);
  }
  const response = await axios.get(URL_JSON_SERVER);
  return response.data;
});

export const saveClassment = createAsyncThunk("classments/saveClassment", async ({ name, city }) => {
  const response = await axios.post(URL_JSON_SERVER, {
    name,
    city,
    ma: 0,
    me: 0,
    s: 0,
    k: 0,
    gm: 0,
    gk: 0,
    point: 0,
  });
  return response.data;
});

// Belum selesai
export const updateClassment = createAsyncThunk("classments/updateClassment", async ({ id, name, city, ma, me, s, k, gm, gk, point }) => {
  const response = await axios.patch(`${URL_JSON_SERVER}/${id}`, {
    id,
    name,
    city,
    ma: 0,
    me: 0,
    s: 0,
    k: 0,
    gm: 0,
    gk: 0,
    point: 0,
  });
  return response.data;
});

const classmentEntity = createEntityAdapter({
  classmentId: (classment) => classment.id,
});

const classmentSlice = createSlice({
  name: "classment",
  initialState: classmentEntity.getInitialState(),
  extraReducers: {
    [getClassments.fulfilled]: (state, action) => {
      classmentEntity.setAll(state, action.payload);
    },
    [saveClassment.fulfilled]: (state, action) => {
      classmentEntity.addOne(state, action.payload);
    },
    [updateClassment.fulfilled]: (state, action) => {
      classmentEntity.updateOne(state, { id: action.payload.id, updates: action.payload });
    },
  },
});

export const classmentSelectors = classmentEntity.getSelectors((state) => state.classment);
export default classmentSlice.reducer;
