import { FluidObject } from 'gatsby-image';
import { ITextField, ICockpitImage } from '../Types';

export interface IInitialProductFormState {
  [key: string]: ITextField | { value: boolean; regexp?: RegExp; isTouched?: boolean; valid?: boolean };
  name: ITextField;
  phone: ITextField;
  agree: {
    value: boolean;
  };
}

export interface IProductInfoProps {
  name: string;
  description: string;
  price: string;
  price2: string;
  price3: string;
  price4: string;
  measurment: string;
  measurment2: string;
  measurment3: string;
  measurment4: string;
  isAvailable: boolean | null;
  images: IProductPhoto[];
}

export interface IProductSpecificationsProps {
  data: {
    [key: string]: string;
  };
  title: string;
}

export interface IProductPhotosProps {
  images: IProductPhoto[];
}

export interface IProductPhoto {
  id: string;
  childImageSharp: {
    fluid: FluidObject;
  };
}

export interface IProductGalleryProps {
  title: string;
  description: string;
  images: IProductPhoto[];
  background: ICockpitImage;
}

export interface IProductGalleryCarouselProps {
  images: IProductPhoto[];
}

export interface IProductScopeProps {
  desciption: string;
  scopes: IProductScope[];
}

export interface IProductScope {
  id: string;
  title: {
    value: string;
  };
  svg: { value: string };
}

export interface IProductCommonsProps {
  products: ICommonProduct[];
}

export interface IProductCommonsCarousel {
  chunkedProducts: ICommonProduct[][];
}

export interface IProductCommonItemProps {
  name: string;
  link: string;
  image: IProductPhoto;
}

export interface ICommonProduct {
  id: string;
  name: {
    value: string;
  };
  link: {
    value: string;
  };
  images: {
    value: IProductPhoto[];
  };
}

export interface IProductFormProps {
  title: string;
}

export interface IProductPairsProps {
  currentProductName: string;
  currentProductDesciption: string;
  currentProductCode: string;
  currentProductPhoto: FluidObject;
  productPairs: IProductPair[];
}

export interface IProductPair {
  id: string;
  name: {
    value: string;
  };
  description: {
    value: string;
  };
  link: {
    value: string;
  };
  code: {
    value: string;
  };
  images: {
    value: IProductPhoto[];
  };
}
