import React, { useContext } from 'react';
import ProductPhotos from './ProductPhotos';
import ProductForm from './ProductForm';
import context from '../../context/context';

import { IProductInfoProps } from './Types';
import { TRANSLATE } from '../../constants/languages';
import './ProductInfo.scss';

const ProductInfo: React.FC<IProductInfoProps> = ({ name, description, price, images }): JSX.Element => {
  const { language } = useContext(context);
  return (
    <div className="product-info" id="product-info">
      <ProductPhotos images={images} />
      <div className="product-info-rb">
        <h1 className="product-info-title">{name}</h1>
        <div className="product-info-text" dangerouslySetInnerHTML={{ __html: description }} />
        <div className="product-info-price-wrapper">
          <span className="product-info-price-title">{TRANSLATE[language as 'ru' | 'ua'].productPrice}</span>
          <span className="product-info-price">{price} грн</span>
        </div>
        <span className="product-info-warning">{TRANSLATE[language as 'ru' | 'ua'].productBigPrice}</span>
        <ProductForm />
      </div>
    </div>
  );
};

export default ProductInfo;
