import React, { useContext } from 'react';
import ProductPhotos from './ProductPhotos';
import ProductForm from './ProductForm';
import context from '../../context/context';

import { IProductInfoProps } from './Types';
import { TRANSLATE } from '../../constants/languages';

import './ProductInfo.scss';

const priceFormat = Intl.NumberFormat('ru', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const ProductInfo: React.FC<IProductInfoProps> = ({
  name,
  description,
  price,
  price2,
  price3,
  price4,
  measurment2,
  measurment3,
  measurment4,
  images,
  measurment,
  isAvailable,
}): JSX.Element => {
  const { language } = useContext(context);

  return (
    <div className="product-info" id="product-info">
      <ProductPhotos images={images} />
      <div className="product-info-rb">
        <h1 className="product-info-title">{name}</h1>
        <div className="product-info-text" dangerouslySetInnerHTML={{ __html: description }} />
        {isAvailable !== null && (
          <div className="product-info-is-available">
            {isAvailable ? TRANSLATE[language as 'ru' | 'ua'].available : TRANSLATE[language as 'ru' | 'ua'].unavailable}
          </div>
        )}
        <div className="product-info-price-wrapper">
          <span className="product-info-price-title">{TRANSLATE[language as 'ru' | 'ua'].productPrice}</span>
          <span className="product-info-price">
            <span>
              {!Number.isNaN(+price.replace(',', '.')) ? (
                `${priceFormat.format(+price.replace(',', '.'))} грн`
              ) : (
                <span className="product-info-price-not-a-number">{price}</span>
              )}
              {measurment && <span className="product-info-measurment"> / за {measurment}</span>}
            </span>
            {!Number.isNaN(+price2.replace(',', '.')) && measurment2 && (
              <span>
                {`${priceFormat.format(+price2.replace(',', '.'))} грн`}{' '}
                <span className="product-info-measurment"> / за {measurment2}</span>
              </span>
            )}
            {!Number.isNaN(+price3.replace(',', '.')) && measurment3 && (
              <span>
                {`${priceFormat.format(+price3.replace(',', '.'))} грн`}{' '}
                <span className="product-info-measurment"> / за {measurment3}</span>
              </span>
            )}
            {!Number.isNaN(+price4.replace(',', '.')) && measurment4 && (
              <span>
                {`${priceFormat.format(+price4.replace(',', '.'))} грн`}{' '}
                <span className="product-info-measurment"> / за {measurment4}</span>
              </span>
            )}
          </span>
        </div>
        <span className="product-info-warning">{TRANSLATE[language as 'ru' | 'ua'].productBigPrice}</span>
        <ProductForm title={name} />
      </div>
    </div>
  );
};

export default ProductInfo;
