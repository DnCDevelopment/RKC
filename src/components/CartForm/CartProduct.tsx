import React, { useMemo, useState } from 'react';
import './CartProduct.scss';
import ArrowSVG from '../../assets/icons/arrow.svg';
import PlusSVG from '../../assets/icons/plus.svg';
import { ProductProps } from './Types';

const CartProduct: React.FC<ProductProps> = ({ product, onAmountChange }) => {
  const [activeMeasure, setActiveMeasure] = useState<number>(0);
  const [isOptionsOpen, setOptionsOpen] = useState<boolean>(false);

  const measureOptions = useMemo(() => Object.keys(product).filter(el => el.startsWith('measurment') && product[el]), []);

  const handleOptionsOpen = (): void => {
    setOptionsOpen(prev => !prev);
  };

  const calcTotalPrice = (): number => {
    if (activeMeasure === 0 && product.price) return product.amount * +product.price.value;
    if (activeMeasure === 1 && product.price1) return product.amount * +product.price1.value;
    if (activeMeasure === 2 && product.price2) return product.amount * +product.price2.value;
    if (activeMeasure === 3 && product.price3) return product.amount * +product.price3.value;

    return product.amount * +product.price.value;
  };

  return (
    <div className="cart__product">
      <img src={product.img} alt="img" />
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
          <span className="cart__product-select-measure">{product[measureOptions[activeMeasure]]}</span>
          <ArrowSVG />
          {measureOptions.length > 1 && (
            <div className={`cart__product-select-dropdown ${isOptionsOpen ? 'cart__product-select-dropdown--open' : ''}`}>
              {measureOptions.map((_, idx) => (
                <span onClick={() => setActiveMeasure(idx)} className="cart__product-select-dropdown-item">
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
