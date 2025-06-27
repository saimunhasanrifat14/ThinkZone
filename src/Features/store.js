import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "../Features/Slices/blogSlice";

export const store = configureStore({
  reducer: {
    blog: blogReducer,
  },
});