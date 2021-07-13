import React, { useContext } from 'react';

import './CartProductsList.scss';

import context from '../../context/context';
import { CART } from '../../constants/languages';
import CartProduct from './CartProduct';
import { ICardProductListProps } from './Types';

const CartProductsList: React.FC<ICardProductListProps> = ({ products, setProducts }) => {
  const { language } = useContext(context);

  const handleChangeAmount = (id: number, type: 'dec' | 'inc') => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id
          ? {
              ...product,
              amount: type === 'inc' ? product.amount + 1 : product.amount - 1,
            }
          : product
      )
    );
  };

  const handleCurrentMeasure = (id: number, measure: number) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id
          ? {
              ...product,
              currentMeasure: measure,
            }
          : product
      )
    );
  };

  const totalSum = products.reduce((acc, current) => {
    switch (current.currentMeasure) {
      case 0:
        return acc + +current.price.value * +current.amount;
      case 1:
        return acc + +current.price1.value * +current.amount;
      case 2:
        return acc + +current.price2.value * +current.amount;
      case 3:
        return acc + +current.price3.value * +current.amount;
      default:
        return acc + +current.price.value * +current.amount;
    }
  }, 0);

  return (
    <div className="cart__products">
      <h2 className="cart__products-title">{CART[language as 'ru' | 'ua'].inOrder}</h2>
      <div className="cart__products-wrapper">
        {products.map(product => (
          <CartProduct
            key={product.id}
            product={product}
            onAmountChange={(id: number, type: 'dec' | 'inc') => handleChangeAmount(id, type)}
            onCurrentMeasureChange={(id: number, measure: number) => handleCurrentMeasure(id, measure)}
          />
        ))}
        <div className="cart__products-total">
          <p className="cart__products-total-text">
            {CART[language as 'ru' | 'ua'].totalPay}
            <span className="cart__products-total-amount">{totalSum.toFixed(2)} грн</span>
          </p>
          <button type="button" className="cart__products-order-btn">
            {CART[language as 'ru' | 'ua'].orderBtn}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProductsList;
