import React, { useMemo, useState } from 'react';
import './CartProduct.scss';
import Image from 'gatsby-image';
import ArrowSVG from '../../assets/icons/arrow.svg';
import PlusSVG from '../../assets/icons/plus.svg';
import { IProductProps } from './Types';

const CartProduct: React.FC<IProductProps> = ({ product, onAmountChange, onCurrentMeasureChange }) => {
  const [activeMeasure, setActiveMeasure] = useState<number>(0);
  const [isOptionsOpen, setOptionsOpen] = useState<boolean>(false);

  const measureOptions = useMemo(
    () =>
      Object.keys(product)
        .filter(el => el.startsWith('measurment') && product[el])
        .sort(),
    []
  );

  const handleOptionsOpen = (): void => {
    if (measureOptions.length > 1) setOptionsOpen(prev => !prev);
  };

  const measurePrice: { [key: number]: string } = {
    0: product.price.replace(',', '.'),
    2: product.price2.replace(',', '.'),
    3: product.price3.replace(',', '.'),
    4: product.price4.replace(',', '.'),
  };

  const calcTotalPrice = (): number => {
    return measurePrice[activeMeasure] ? product.amount * +measurePrice[activeMeasure] : product.amount;
  };

  return (
    <div className="cart__product">
      <Image fluid={product.images[0].childImageSharp.fluid} />
      <h4 className="cart__product-title">{product.name}</h4>
      <p className="cart__product-code">код {product.code}</p>
      <p className="cart__product-price">{calcTotalPrice().toFixed(2)} грн</p>
      <div className="cart__product-action">
        <button
          type="button"
          className="cart__product-dec"
          disabled={product.amount === 1}
          onClick={() => onAmountChange(product.id, 'dec')}
        />
        <p className="cart__product-amount">{product.amount}</p>
        <button type="button" className="cart__product-inc" onClick={() => onAmountChange(product.id, 'inc')}>
          <PlusSVG />
        </button>
        <div className={`cart__product-select ${isOptionsOpen ? 'cart__product-select--open' : ''}`} onClick={handleOptionsOpen}>
          <span className="cart__product-select-measure">
            {activeMeasure === 0 ? product[measureOptions[activeMeasure]] : product[measureOptions[activeMeasure - 1]]}
          </span>
          <ArrowSVG />
          {measureOptions.length > 1 && (
            <div className={`cart__product-select-dropdown ${isOptionsOpen ? 'cart__product-select-dropdown--open' : ''}`}>
              {measureOptions.map((_, idx) => (
                <span
                  key={idx}
                  onClick={() => {
                    onCurrentMeasureChange(product.id, idx === 0 ? idx : idx + 1);
                    setActiveMeasure(idx === 0 ? idx : idx + 1);
                  }}
                  className="cart__product-select-dropdown-item"
                >
                  {product[measureOptions[idx]]}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
