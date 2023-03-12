import { configureStore } from "@reduxjs/toolkit";
import classmentReducer from "../features/classmentSlice";

export const store = configureStore({
  reducer: {
    classment: classmentReducer,
  },
});
