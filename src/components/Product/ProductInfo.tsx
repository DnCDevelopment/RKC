import React, { useContext, useState, useMemo } from 'react';
import ProductPhotos from './ProductPhotos';
import ProductForm from './ProductForm';
import context from '../../context/context';

import { IProductInfoProps, IProductInStorageProps } from './Types';
import { TRANSLATE } from '../../constants/languages';

import PlusSVG from '../../assets/icons/plus.svg';
import ArrowSVG from '../../assets/icons/arrow.svg';

import './ProductInfo.scss';

const priceFormat = Intl.NumberFormat('ru', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const ProductInfo: React.FC<IProductInfoProps> = ({
  name,
  description,
  price,
  price2,
  price3,
  id,
  price4,
  measurment2,
  measurment3,
  measurment4,
  images,
  measurment,
  isAvailable,
  code,
}): JSX.Element => {
  const { language } = useContext(context);
  const [isOptionsOpen, setOptionsOpen] = useState<boolean>(false);
  const [currentMeasure, setCurrentMeasure] = useState<string>(measurment);
  const [amount, setAmount] = useState<number>(1);
  const measureOptions = [measurment, measurment2, measurment3, measurment4];

  const handleProductAmount = (type: 'dec' | 'inc') => {
    if (type === 'inc') return setAmount(prev => prev + 1);
    return setAmount(prev => prev - 1);
  };

  const handleActiveMeasure = (el: string) => {
    setCurrentMeasure(el);
  };

  const handleOptionsOpen = (): void => {
    if (measurment2) {
      setOptionsOpen(prev => !prev);
    }
  };

  const handleAddProduct = () => {
    if (localStorage.getItem('products') === null) {
      return localStorage.setItem(
        'products',
        JSON.stringify([
          {
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
            amount,
            currentMeasure,
            code,
            id,
          },
        ])
      );
    }
    const productsCart: IProductInStorageProps[] = JSON.parse(localStorage.getItem('products'));
    if (productsCart.findIndex(el => el.code === code) === -1) {
      productsCart.push({
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
        amount,
        currentMeasure,
        code,
        id,
      });

      return localStorage.setItem('products', JSON.stringify(productsCart));
    }
    return localStorage.setItem(
      'products',
      JSON.stringify(productsCart.map(item => (item.code === code ? { ...item, amount: item.amount + 1 } : item)))
    );
  };

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
        <div className="product-info-add">
          <button disabled={amount === 1} type="button" className="product-info-add-dec" onClick={() => handleProductAmount('dec')} />
          <input
            className="product-info-add-amount"
            onChange={e => !Number.isNaN(+e.target.value) && setAmount(+e.target.value)}
            value={amount}
          />
          <button type="button" className="product-info-add-inc" onClick={() => handleProductAmount('inc')}>
            <PlusSVG />
          </button>
          {measurment && (
            <div className={`product-info-select ${isOptionsOpen ? 'product-info-select--open' : ''}`} onClick={handleOptionsOpen}>
              <span className="product-info-select-measure">{currentMeasure}</span>
              <ArrowSVG />
              {measurment2 && (
                <div className={`product-info-select-dropdown ${isOptionsOpen ? 'product-info-select-dropdown--open' : ''}`}>
                  {measureOptions.map((el, idx) => (
                    <span key={idx} className="product-info-select-dropdown-item" onClick={() => handleActiveMeasure(el)}>
                      {el}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        {isAvailable && (
          <button className="product-info-btn-add" type="button" onClick={handleAddProduct}>
            добавить в корзину
          </button>
        )}
        <span className="product-info-warning">{TRANSLATE[language as 'ru' | 'ua'].productBigPrice}</span>
        <ProductForm title={name} />
      </div>
    </div>
  );
};

export default ProductInfo;
