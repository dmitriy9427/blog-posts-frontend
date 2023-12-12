import { configureStore } from "@reduxjs/toolkit";
import postSliceReducer from "./slices/posts";
import { autchReducer } from "./slices/autch";

export const store = configureStore({
  reducer: {
    posts: postSliceReducer,
    autch: autchReducer,
  },
});
