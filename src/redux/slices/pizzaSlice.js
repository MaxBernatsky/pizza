import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

export const fetchPizza = createAsyncThunk(
  'pizza/fetchPizzaStatus',
  async (params) => {
    const { category, search, order, sortBy, currentPage } = params;
    const response = await axios.get(
      `https://647e7c3ac246f166da8f1d7f.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    return response.data;
  },
);

const initialState = {
  items: [],
  status: '',
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPizza.pending, (state) => {
        state.items = [];
        state.status = 'loading';
      })
      .addCase(fetchPizza.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'success';
      })
      .addCase(fetchPizza.rejected, (state) => {
        state.items = [];
        state.status = 'error';
      });
  },
});

export const selectPizzaData = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
