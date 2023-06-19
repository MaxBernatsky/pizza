import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { PizzaItem } from './types';

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
