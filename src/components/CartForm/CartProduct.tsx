import React from 'react';
import './CartProduct.scss';

const CartProduct: React.FC = () => {
  return (
    <div className="cart__product">
      <img src="http://localhost:8000//static/ccf6f40587a000cc6f87ba018c9a6e64/ee604/5fddf621ca2e6-.png" alt="img" />
      <h4 className="cart__product-title">Техноеласт ЕКП сланец серый</h4>
      <p className="cart__product-code">32131312</p>
      <p className="cart__product-price">16000 грн</p>
      <div className="cart__product-action">
        <button type="button" className="cart__product-dec" />
        <p className="cart__product-amount">12</p>
        <button type="button" className="cart__product-inc" />
        <div className="cart__product-select">за м2</div>
      </div>
    </div>
  );
};

export default CartProduct;
