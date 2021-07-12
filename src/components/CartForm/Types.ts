export interface ProductProps {
  product: ProductTypes;
  onAmountChange: (arg0: number, type: 'dec' | 'inc') => void;
}

export interface ProductTypes {
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
