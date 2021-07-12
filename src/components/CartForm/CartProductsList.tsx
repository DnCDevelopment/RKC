import React, { useContext, useState } from 'react';

import './CartProductsList.scss';

import context from '../../context/context';
import { CART } from '../../constants/languages';
import CartProduct from './CartProduct';
import { ProductTypes } from './Types';

const exampleProduct: ProductTypes[] = [
  {
    id: 1,
    amount: 1,
    name: 'Техноеласт ЕКП сланец серый',
    code: '131232',
    img: '/static/ccf6f40587a000cc6f87ba018c9a6e64/ee604/5fddf621ca2e6-.png',
    measurment: 'кв.м',
    measurment1: 'кв.см',
    measurment2: null,
    measurment3: null,
    price: {
      value: '167.82',
    },
    price1: {
      value: '16.8',
    },
    price2: {
      value: '16.8',
    },
    price3: {
      value: '16.8',
    },
  },
  {
    id: 2,
    amount: 1,
    name: 'Техноеласт ЕКП сланец серый',
    code: '131232',
    img: '/static/ccf6f40587a000cc6f87ba018c9a6e64/ee604/5fddf621ca2e6-.png',
    measurment: 'кв.м3',
    measurment1: 'кв.см3',
    measurment2: null,
    measurment3: null,
    price: {
      value: '137.82',
    },
    price1: {
      value: '12.8',
    },
    price2: {
      value: '16.8',
    },
    price3: {
      value: '16.8',
    },
  },
];

const CartProducts: React.FC = () => {
  const [products, setProducts] = useState<ProductTypes[]>(exampleProduct);
  const { language } = useContext(context);

  const handleChangeAmount = (id: number, type: 'dec' | 'inc') => {
    setProducts(
      products.map(product =>
        product.id === id
          ? {
              ...product,
              amount: type === 'inc' ? product.amount + 1 : product.amount - 1,
            }
          : product
      )
    );
  };

  return (
    <div className="cart__products">
      <h2 className="cart__products-title">{CART[language as 'ru' | 'ua'].inOrder}</h2>
      <div className="cart__products-wrapper">
        {products.map(product => (
          <CartProduct key={product.id} product={product} onAmountChange={(id, type) => handleChangeAmount(id, type)} />
        ))}
      </div>
    </div>
  );
};

export default CartProducts;
