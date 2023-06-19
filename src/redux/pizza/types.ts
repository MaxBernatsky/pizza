export type PizzaItem = {
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

export interface IPizzaSliceState {
  items: PizzaItem[];
  status: Status;
}
