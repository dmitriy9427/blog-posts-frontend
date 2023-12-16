import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk("posts/fetchPost", async () => {
  const res = await axios.get("/posts");
  return res.data;
});

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

export const fetchDeletePost = createAsyncThunk(
  "posts/fetchDeletePost",
  async (id) => await axios.delete(`/posts/${id}`)
);

export const fetchGetTag = createAsyncThunk("posts/fetchGetTag", async (t) => {
  const tag = await axios.get(`/tags/${t}`);
  return tag;
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
    // получение статей
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
    // получение тэгов
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
    // удаление статьи
    builder.addCase(fetchDeletePost.pending, (state, action) => {
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
    });
    //полуение статей по тэгу
    builder.addCase(fetchGetTag.pending, (state) => {
      state.posts.items = [];
      state.posts.status = "Загрузка ...";
    });
    builder.addCase(fetchGetTag.fulfilled, (state, action) => {
      state.posts.items.map((obj) => {
        for (let i in obj.tags) {
          if (obj.tags[i] === action.payload) {
            state.posts.items = obj;
          }
        }
      });
      state.posts.status = "Загружено!";
    });
    builder.addCase(fetchGetTag.rejected, (state) => {
      state.tags.items = [];
      state.posts.status = "Ошибка получения статей.";
    });
  },
});

const postSliceReducer = postSlice.reducer;

export default postSliceReducer;
