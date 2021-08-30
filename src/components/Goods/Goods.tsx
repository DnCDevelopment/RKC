import React from 'react';

import Good from '../Good/Good';

import { IGoodsProps } from './Types';

import './Goods.scss';

const Goods: React.FC<IGoodsProps> = ({ goods }): JSX.Element => (
  <div className="goods-container">
    {goods.map(
      ({
        image: {
          value: {
            childImageSharp: { fluid },
          },
        },
        link: { value: linkValue },
        price: { value: priceValue },
        name: { value: titleValue },
        stock,
      }) => (
        <Good fluid={fluid} key={linkValue} link={linkValue} price={priceValue} title={titleValue} stock={stock?.value || ''} />
      )
    )}
  </div>
);

export default Goods;
