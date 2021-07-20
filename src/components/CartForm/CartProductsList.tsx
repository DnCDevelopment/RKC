import React, { useCallback, useContext } from 'react';

import './CartProductsList.scss';

import context from '../../context/context';
import { CART } from '../../constants/languages';
import CartProduct from './CartProduct';

interface CardProductsInteface {
  callback?: () => void;
}

const CartProductsList: React.FC<CardProductsInteface> = ({ callback }) => {
  const { language, setProducts, products } = useContext(context);

  const handleRemoveProduct = useCallback(
    (id: string) => {
      const updatedProducts = products.filter(product => product.id !== id);
      setProducts(() => updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
    },
    [products]
  );

  const handleChangeAmount = useCallback((id: string, type: 'dec' | 'inc') => {
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
  }, []);

  const handleCurrentMeasure = useCallback((id: string, measure: string) => {
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
  }, []);

  const totalSum = products.reduce((acc, current) => {
    const measurePrice = new Map();
    measurePrice.set(current.measurment, current.price.replace(',', '.'));
    measurePrice.set(current.measurment2, current.price2.replace(',', '.'));
    measurePrice.set(current.measurment3, current.price3.replace(',', '.'));
    measurePrice.set(current.measurment4, current.price4.replace(',', '.'));

    return acc + +measurePrice.get(current.currentMeasure) * +current.amount;
  }, 0);

  return (
    <div className="cart-products">
      <h2 className="cart-products-title">{CART[language as 'ru' | 'ua'].inOrder}</h2>
      <div className="cart-products-wrapper">
        {products.map(product => (
          <CartProduct
            key={product.id}
            product={product}
            onAmountChange={handleChangeAmount}
            onCurrentMeasureChange={handleCurrentMeasure}
            handleRemoveProduct={handleRemoveProduct}
          />
        ))}
        <div className="cart-products-total">
          <p className="cart-products-total-text">
            {CART[language as 'ru' | 'ua'].totalPay}
            <span className="cart-products-total-amount">{totalSum.toFixed(2)} грн</span>
          </p>
          <button type="button" className="cart-products-order-btn" onClick={callback}>
            {CART[language as 'ru' | 'ua'].orderBtn}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartProductsList;
