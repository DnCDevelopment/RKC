import React, { useContext } from 'react';
import context from '../../context/context';
import { TRANSLATE } from '../../constants/languages';
import './ProductBar.scss';

const ProductBar: React.FC = (): JSX.Element => {
  const { language } = useContext(context);
  return (
    <div className="product-bar-wrapper">
      <div className="product-bar">
        <a className="product-bar-link" href="#product-info">
          {TRANSLATE[language as 'ru' | 'ua'].productAbout}
        </a>
        <a className="product-bar-link" href="#gallery">
          Фото
        </a>
        <a className="product-bar-link" href="#scopes">
          {TRANSLATE[language as 'ru' | 'ua'].productScopes}
        </a>
        <a className="product-bar-link" href="#pairs">
          {TRANSLATE[language as 'ru' | 'ua'].productPairs}
        </a>
      </div>
    </div>
  );
};

export default ProductBar;
