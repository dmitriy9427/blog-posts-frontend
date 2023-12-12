import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

// export enum Status {
//   LOADING = "Загрузка",
//   SUCSESS = "Загружено",
//   ERROR = "Ошибка",
// }

export const fetchPosts = createAsyncThunk("posts/fetchPost", async () => {
  const res = await axios.get("/posts");
  return res.data;
});

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

const initialState = {
  posts: {
    items: [],
    status: "Загрузка ...",
  },
  tags: {
    items: [],
    status: "Загрузка ...",
  },
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.posts.items = [];
      state.posts.status = "Загрузка ...";
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "Загружено!";
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.posts.items = [];
      state.posts.status = "Ошибка получения статей.";
    });
    builder.addCase(fetchTags.pending, (state) => {
      state.tags.items = [];
      state.tags.status = "Загрузка ...";
    });
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "Загружено!";
    });
    builder.addCase(fetchTags.rejected, (state) => {
      state.tags.items = [];
      state.tags.status = "Ошибка получения тэгов.";
    });
  },
});

const postSliceReducer = postSlice.reducer;

export default postSliceReducer;
