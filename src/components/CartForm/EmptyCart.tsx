import React, { useContext } from 'react';
import { Link } from 'gatsby';

import context from '../../context/context';

import './EmptyCart.scss';

const EmptyCart: React.FC = () => {
  const { language } = useContext(context);

  const link = language === 'ua' ? '/ua/catalog' : '/catalog';
  return (
    <div className="empty-cart">
      <h2 className="empty-cart-title">Ваша корзина пока что пустая</h2>
      <p className="empty-cart-text">
        Вы можете начать свои покупки
        <Link className="empty-cart-link" to={link}>
          здесь
        </Link>
      </p>
    </div>
  );
};

export default EmptyCart;
