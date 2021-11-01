/* eslint-disable no-nested-ternary */
import React, { useContext, useState } from 'react';
import ProductPhotos from './ProductPhotos';
import ProductForm from './ProductForm';
import context from '../../context/context';

import Modal from '../Modal/Modal';

import { IProductInfoProps } from './Types';
import { IProductTypes } from '../CartForm/Types';

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
  price4,
  id,
  stock,
  measurment2,
  measurment3,
  measurment4,
  images,
  measurment,
  productAvailable,
  code,
}): JSX.Element => {
  const measureOptions = [measurment, measurment2, measurment3, measurment4].filter(e => e);
  const measurePrice = new Map();
  const finalStock = !Number.isNaN(+stock?.replace(',', '.')) ? 1 - +stock.replace(',', '.') / 100 : 1;

  measurePrice.set(measurment, +price.replace(',', '.'));
  if (!measurePrice.has(measurment2)) measurePrice.set(measurment2, +price2.replace(',', '.'));
  if (!measurePrice.has(measurment3)) measurePrice.set(measurment3, +price3.replace(',', '.'));
  if (!measurePrice.has(measurment4)) measurePrice.set(measurment4, +price4.replace(',', '.'));

  const { language, setProducts } = useContext(context);
  const [isOptionsOpen, setOptionsOpen] = useState<boolean>(false);
  const [oneClickBuy, setOneClickBuy] = useState<boolean>(false);
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(1);
  const [currentMeasure, setCurrentMeasure] = useState<string>((measureOptions.length && measureOptions[0]) || '');

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
      setProducts(prev => [
        ...prev,
        {
          link: window.location.pathname,
          name,
          description,
          price,
          price2,
          price3,
          price4,
          measurment2,
          measurment3,
          measurment4,
          stock: finalStock,
          images,
          measurment,
          amount,
          currentMeasure,
          code,
          id,
        },
      ]);
      setModalStatus(true);
      return localStorage.setItem(
        'products',
        JSON.stringify([
          {
            link: window.location.pathname,
            name,
            description,
            price,
            price2,
            price3,
            price4,
            stock: finalStock,
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

    const productsCart: IProductTypes[] = JSON.parse(localStorage.getItem('products'));
    if (productsCart.findIndex(el => el.code === code) === -1) {
      productsCart.push({
        link: window.location.pathname,
        name,
        description,
        price,
        price2,
        price3,
        price4,
        stock: finalStock,
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
      setProducts(productsCart);
      setModalStatus(true);
      return localStorage.setItem('products', JSON.stringify(productsCart));
    }
    setModalStatus(true);

    setProducts(productsCart.map(item => (item.code === code ? { ...item, amount: item.amount + 1 } : item)));
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
        {(productAvailable === 'IN_STOCK' || productAvailable === null) && (
          <div className="product-info-is-available">
            {productAvailable === 'UNAVAILABLE'
              ? TRANSLATE[language as 'ru' | 'ua'].unavailable
              : productAvailable === 'UNDER_THE_ORDER'
              ? TRANSLATE[language as 'ru' | 'ua'].underOrder
              : productAvailable === 'EXPECTING'
              ? TRANSLATE[language as 'ru' | 'ua'].expecting
              : TRANSLATE[language as 'ru' | 'ua'].available}
          </div>
        )}
        <div className="product-info-price-wrapper">
          <span className="product-info-price-title">{TRANSLATE[language as 'ru' | 'ua'].productPrice}</span>
          <span className="product-info-price">
            {Array.from(measurePrice)
              .filter(([_, value]) => +value)
              .map(([key, value]) => (
                <span>
                  {!Number.isNaN(+value) ? (
                    <>
                      {finalStock !== 1 ? (
                        <span className="product-info-price-stock">
                          <span className="product-info-price-stock-old">{priceFormat.format(value)}</span>
                          {priceFormat.format(value * finalStock)} грн
                        </span>
                      ) : (
                        <>{priceFormat.format(value)} грн</>
                      )}
                    </>
                  ) : (
                    <span className="product-info-price-not-a-number">{value}</span>
                  )}
                  {key && <span className="product-info-measurment"> / за {key}</span>}
                </span>
              ))}
          </span>
        </div>
        <div className="product-info-add">
          {productAvailable && (
            <>
              <button disabled={amount === 1} type="button" className="product-info-add-dec" onClick={() => handleProductAmount('dec')} />
              <input
                className="product-info-add-amount"
                onChange={e => !Number.isNaN(+e.target.value) && setAmount(+e.target.value)}
                value={amount}
              />
              <button type="button" className="product-info-add-inc" onClick={() => handleProductAmount('inc')}>
                <PlusSVG />
              </button>
            </>
          )}
          {productAvailable && !!measureOptions.length && (
            <div className={`product-info-select ${isOptionsOpen ? 'product-info-select--open' : ''}`} onClick={handleOptionsOpen}>
              <span className="product-info-select-measure">{currentMeasure}</span>
              {measureOptions.length > 1 && (
                <>
                  <ArrowSVG />
                  <div className={`product-info-select-dropdown ${isOptionsOpen ? 'product-info-select-dropdown--open' : ''}`}>
                    {measureOptions.map((el, idx) => (
                      <span key={idx} className="product-info-select-dropdown-item" onClick={() => handleActiveMeasure(el)}>
                        {el}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {productAvailable === 'IN_STOCK' || productAvailable === null ? (
          <div className="product-info-buttons">
            <button className="product-info-btn-add" type="button" onClick={() => setOneClickBuy(true)}>
              {TRANSLATE[language as 'ru' | 'ua'].oneClickBuy}
            </button>
            <button className="product-info-btn-add" type="button" onClick={handleAddProduct}>
              {TRANSLATE[language as 'ru' | 'ua'].addToCart}
            </button>
          </div>
        ) : (
          <h2>
            {productAvailable === 'UNAVAILABLE'
              ? TRANSLATE[language as 'ru' | 'ua'].unavailable
              : productAvailable === 'UNDER_THE_ORDER'
              ? TRANSLATE[language as 'ru' | 'ua'].underOrder
              : productAvailable === 'EXPECTING'
              ? TRANSLATE[language as 'ru' | 'ua'].expecting
              : ''}
          </h2>
        )}
        <br />
        {oneClickBuy && (
          <ProductForm
            title={name}
            measurment={currentMeasure}
            price={(measurePrice.get(currentMeasure) || +price.replace(',', '.')) * finalStock}
            amount={amount}
          />
        )}
      </div>
      {modalStatus && (
        <Modal close={() => setModalStatus(false)}>
          <h2>{TRANSLATE[language as 'ru' | 'ua'].productAdded}</h2>
        </Modal>
      )}
    </div>
  );
};

export default ProductInfo;
