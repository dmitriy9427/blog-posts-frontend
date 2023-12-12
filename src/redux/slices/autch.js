import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAutch = createAsyncThunk(
  "autch/fetchAutch",
  async (params) => {
    console.log(params);
    const { data } = axios.post("/login", params);
    return data;
  }
);

const initialState = {
  data: null,
  status: "Загрузка ...",
};

const autchSlice = createSlice({
  name: "autch",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAutch.pending, (state) => {
      state.data = null;
      state.status = "Загрузка ...";
    });
    builder.addCase(fetchAutch.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "Загружено!";
    });
    builder.addCase(fetchAutch.rejected, (state) => {
      state.data = null;
      state.status = "Ошибка.";
    });
  },
});

export const autchReducer = autchSlice.reducer;
