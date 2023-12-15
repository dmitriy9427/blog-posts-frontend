import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchLogin = createAsyncThunk(
  "autch/fetchLogin",
  async (params) => {
    const { data } = await axios.post("/login", params);
    return data;
  }
);

export const fetchRegister = createAsyncThunk(
  "autch/fetchRegister",
  async (params) => {
    const { data } = await axios.post("/register", params);
    return data;
  }
);

export const fetchLoginMe = createAsyncThunk("autch/fetchLoginMe", async () => {
  const { data } = await axios.get("/me");
  return data;
});

const initialState = {
  data: null,
  status: "Загрузка ...",
};

const autchSlice = createSlice({
  name: "autch",
  initialState,
  reducers: {
    outSession(state) {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state) => {
      state.data = null;
      state.status = "Загрузка ...";
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "Загружено!";
    });
    builder.addCase(fetchLogin.rejected, (state) => {
      state.data = null;
      state.status = "Ошибка.";
    });
    builder.addCase(fetchLoginMe.pending, (state) => {
      state.data = null;
      state.status = "Загрузка ...";
    });
    builder.addCase(fetchLoginMe.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "Авторизован";
    });
    builder.addCase(fetchLoginMe.rejected, (state) => {
      state.data = null;
      state.status = "Ошибка.";
    });
    builder.addCase(fetchRegister.pending, (state) => {
      state.data = null;
      state.status = "Загрузка ...";
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "Авторизован";
    });
    builder.addCase(fetchRegister.rejected, (state) => {
      state.data = null;
      state.status = "Ошибка.";
    });
  },
});

export const autchSelector = (state) => Boolean(state.autch.data);

export const autchReducer = autchSlice.reducer;

export const { outSession } = autchSlice.actions;
