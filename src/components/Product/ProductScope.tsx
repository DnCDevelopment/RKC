import React, { useContext } from 'react';
import context from '../../context/context';
import { TRANSLATE } from '../../constants/languages';
import { IProductScopeProps } from './Types';
import './ProductScope.scss';

const ProductScope: React.FC<IProductScopeProps> = ({ desciption, scopes }): JSX.Element => {
  const { language } = useContext(context);
  return (
    <div className="product-scope" id="scopes">
      <h2 className="product-scope-header">{TRANSLATE[language as 'ru' | 'ua'].productScopes}</h2>
      <div className="product-scope-text" dangerouslySetInnerHTML={{ __html: desciption }} />
      <div className="product-scope-icon-wrapper">
        {scopes.map(({ id, title: { value: title }, svg: { value: svg } }) => (
          <div key={id} className="product-scope-icon">
            <div className="product-scope-icon-svg" dangerouslySetInnerHTML={{ __html: svg }} />
            <span className="product-scope-icon-title">{title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductScope;
