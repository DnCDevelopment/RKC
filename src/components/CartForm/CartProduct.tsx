import React, { useMemo, useState } from 'react';
import './CartProduct.scss';
import Image from 'gatsby-image';
import { Link } from 'gatsby';
import ArrowSVG from '../../assets/icons/arrow.svg';
import PlusSVG from '../../assets/icons/plus.svg';
import { IProductProps } from './Types';

const CartProduct: React.FC<IProductProps> = ({ product, onAmountChange, onCurrentMeasureChange, handleRemoveProduct }) => {
  const [activeMeasure, setActiveMeasure] = useState<string>(product.currentMeasure);
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

  const { stock = 1 } = product;

  const calcTotalPrice = () => {
    const measurePrice = new Map();
    measurePrice.set(product.measurment, +product.price.replace(',', '.') * stock);
    measurePrice.set(product.measurment2, +product.price2.replace(',', '.') * stock);
    measurePrice.set(product.measurment3, +product.price3.replace(',', '.') * stock);
    measurePrice.set(product.measurment4, +product.price4.replace(',', '.') * stock);
    return product.amount * (+measurePrice.get(activeMeasure) || +product.price * stock);
  };

  return (
    <div className="cart-product">
      <Image fluid={product.images[0].childImageSharp.fluid} imgStyle={{ objectFit: 'contain' }} />
      <h4 className="cart-product-title">
        <Link to={product.link}>{product.name}</Link>
        <span className="cart-product-remove" onClick={() => handleRemoveProduct(product.id)}>
          x
        </span>
      </h4>
      <p className="cart-product-code">код {product.code}</p>
      <p className="cart-product-price">{calcTotalPrice().toFixed(2)} грн</p>
      <div className="cart-product-action">
        <button
          type="button"
          className="cart-product-dec"
          disabled={product.amount === 1}
          onClick={() => onAmountChange(product.id, 'dec')}
        />
        <p className="cart-product-amount">{product.amount}</p>
        <button type="button" className="cart-product-inc" onClick={() => onAmountChange(product.id, 'inc')}>
          <PlusSVG />
        </button>
        {measureOptions.length > 1 && (
          <div className={`cart-product-select ${isOptionsOpen ? 'cart-product-select--open' : ''}`} onClick={handleOptionsOpen}>
            <span className="cart-product-select-measure">{activeMeasure}</span>
            <>
              <ArrowSVG />
              <div className={`cart-product-select-dropdown ${isOptionsOpen ? 'cart-product-select-dropdown--open' : ''}`}>
                {measureOptions.map((_, idx) => (
                  <span
                    key={idx}
                    onClick={() => {
                      onCurrentMeasureChange(product.id, (idx === 0 ? product.measurment : product[`measurment${idx + 1}`]) as string);
                      setActiveMeasure((idx === 0 ? product.measurment : product[`measurment${idx + 1}`]) as string);
                    }}
                    className="cart-product-select-dropdown-item"
                  >
                    {product[measureOptions[idx]]}
                  </span>
                ))}
              </div>
            </>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartProduct;
