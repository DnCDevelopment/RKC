import { Dispatch, SetStateAction } from 'react';

export interface IProductProps {
  product: IProductTypes;
  onAmountChange: (id: number, type: 'dec' | 'inc') => void;
  onCurrentMeasureChange: (id: number, measure: number) => void;
}

export interface ICardProductListProps {
  products: IProductTypes[];
  setProducts: Dispatch<SetStateAction<IProductTypes[]>>;
}

export interface IProductTypes {
  [key: string]:
    | number
    | string
    | {
        value: string;
      };
  id: number;
  amount: number;
  name: string;
  code: string;
  img: string;
  currentMeasure: number;
  measurment: string | null;
  measurment1: string | null;
  measurment2: string | null;
  measurment3: string | null;
  price: {
    value: string;
  };
  price1: {
    value: string;
  };
  price2: {
    value: string;
  };
  price3: {
    value: string;
  };
}
