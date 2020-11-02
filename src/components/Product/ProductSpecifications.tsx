import React from 'react';

import { IProductSpecificationsProps } from './Types';

import './ProductSpecifications.scss';

const ProductSpecifications: React.FC<IProductSpecificationsProps> = ({ data, title }): JSX.Element => (
  <div className="product-specifications-wrapper">
    <h2>
      Характеристики <span>{title}</span>
    </h2>
    <div className="product-specifications">
      {Object.keys(data).map(key => (
        <div key={key} className="specification">
          <div className="specification-characteristic">{key}</div>
          <div className="specification-underline" />
          <div className="specification-value">{data[key]}</div>
        </div>
      ))}
    </div>
  </div>
);

export default ProductSpecifications;
