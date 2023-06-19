import { CartItem } from '../redux/cart/types';
import { calcTotalPrice } from './calcTotalPrice';

export const getCartFromLocalStorage = () => {
  const localStorageData = localStorage.getItem('cart');

  const items = localStorageData ? JSON.parse(localStorageData) : [];

  const totalPrice = calcTotalPrice(items);

  return {
    items: items as CartItem[],
    totalPrice,
  };
};
