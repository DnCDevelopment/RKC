import React from 'react';
import CartForm from '../components/CartForm/CartForm';
import CartProducts from '../components/CartForm/CartProductsList';

const CartPage: React.FC = () => {
  return (
    <div className="cart-page page">
      <CartForm />
      <CartProducts />
    </div>
  );
};

export default CartPage;
