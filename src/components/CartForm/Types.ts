import { FluidObject } from 'gatsby-image';
import { Link } from 'gatsby';

export interface IProductProps {
  product: IProductTypes;
  onAmountChange: (id: string, type: 'dec' | 'inc') => void;
  onCurrentMeasureChange: (id: string, measure: string) => void;
  handleRemoveProduct: (id: string) => void;
}

export interface ICartModalProps {
  status: 'success' | 'failure';
}

export interface IProductTypes {
  [key: string]:
    | number
    | string
    | {
        value: string;
      }
    | IProductImagesTypes[];
  id: string;
  amount: number;
  name: string;
  code: string;
  images: IProductImagesTypes[];
  currentMeasure: string;
  measurment: string | null;
  measurment2: string | null;
  measurment3: string | null;
  measurment4: string | null;
  stock: number;
  link: string;
  price: string;
  price2: string;
  price3: string;
  price4: string;
}

export interface IProductImagesTypes {
  id: string;
  childImageSharp: { fluid: FluidObject };
}

export interface ICurrentWarehousesTypes {
  address: string;
  settlement: string;
}
