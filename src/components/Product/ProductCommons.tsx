import React, { useContext } from 'react';

import ProductCommonsCarousel from './ProductCommonsCarousel';

import { ICommonProduct, IProductCommonsProps } from './Types';

import { TRANSLATE } from '../../constants/languages';

import context from '../../context/context';

import './ProductCommons.scss';

const chunk = (arr: ICommonProduct[], size: number): ICommonProduct[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size));

const ProductCommons: React.FC<IProductCommonsProps> = ({ products }): JSX.Element => {
  const { language } = useContext(context);
  const chunkedProducts = chunk(products, 4);
  return (
    <div className="product-common">
      <h2 className="product-common-header">{TRANSLATE[language as 'ru' | 'ua'].productRecommended}</h2>
      <ProductCommonsCarousel chunkedProducts={chunkedProducts} />
    </div>
  );
};

export default ProductCommons;
