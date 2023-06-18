import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import axios from 'axios';
import { RootState } from '../store';

export const fetchPizza = createAsyncThunk(
  'pizza/fetchPizzaStatus',
  async (params: Record<string, string>) => {
    const { category, search, order, sortBy, currentPage } = params;
    const response = await axios.get<PizzaItem[]>(
      `https://647e7c3ac246f166da8f1d7f.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    return response.data;
  },
);

type PizzaItem = {
  id: string;
  imageUrl: string;
  price: number;
  sizes: number[];
  title: string;
  types: number[];
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface IPizzaSliceState {
  items: PizzaItem[];
  status: Status;
}

const initialState: IPizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItem[]>) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPizza.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchPizza.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.items = action.payload;
      })
      .addCase(fetchPizza.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
