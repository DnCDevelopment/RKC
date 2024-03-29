import React, { useContext } from 'react';
import { Link } from 'gatsby';

import context from '../../context/context';

import CartIcon from '../../assets/icons/cart.svg';

import './HeaderCart.scss';

const HeaderCart = () => {
  const { language, products } = useContext(context);

  const link = language === 'ua' ? '/ua/cart' : '/cart';
  return (
    <Link className="header-cart" to={link}>
      <CartIcon />
      {products?.length > 0 && <span className="header-cart-count">{products.length}</span>}
    </Link>
  );
};

export default HeaderCart;
