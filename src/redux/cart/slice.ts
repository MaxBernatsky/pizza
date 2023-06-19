import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { getCartFromLocalStorage } from '../../utils/getCartFromLocalStorage';

import { calcTotalPrice } from '../../utils/calcTotalPrice';

import { CartItem, ICartSliceState } from './types';

const { items, totalPrice } = getCartFromLocalStorage();

const initialState: ICartSliceState = {
  totalPrice: totalPrice,
  items: items,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = calcTotalPrice(state.items);
    },

    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
        state.totalPrice = state.totalPrice - findItem.price;
      }
    },

    removeItem(state, action: PayloadAction<string>) {
      const filterItem = state.items.filter((obj) => obj.id !== action.payload);
      if (filterItem) {
        state.items = filterItem;
        state.totalPrice = calcTotalPrice(state.items);
      }
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
