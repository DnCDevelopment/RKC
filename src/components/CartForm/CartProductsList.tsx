import React, { useContext } from 'react';

import './CartProductsList.scss';

import context from '../../context/context';
import { CART } from '../../constants/languages';
import CartProduct from './CartProduct';

const exampleProduct = [
  {
    img: '/static/ccf6f40587a000cc6f87ba018c9a6e64/ee604/5fddf621ca2e6-.png',
    measurment: 'кв.м',
    measurment1: 'кв.см',
    price: {
      value: '167.82',
    },
    price1: {
      value: '16.8',
    },
  },
];

const CartProducts: React.FC = () => {
  const { language } = useContext(context);

  return (
    <div className="cart__products">
      <h2 className="cart__products-title">{CART[language as 'ru' | 'ua'].inOrder}</h2>
      <div className="cart__products-wrapper">
        {exampleProduct.map(() => (
          <CartProduct />
        ))}
      </div>
    </div>
  );
};

export default CartProducts;
