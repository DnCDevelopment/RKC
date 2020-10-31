import React from 'react';
import Img from 'gatsby-image';

import { IGoodsCategoryCardProps } from './Types';

import './GoodsCategoryCard.scss';

const GoodsCategoryCard: React.FC<IGoodsCategoryCardProps> = ({ icon, title, label }): JSX.Element => {
  return (
    <div className="goods-categories-card">
      <Img fluid={icon} imgStyle={{ objectFit: 'contain' }} className="goods-categories-card-img" />
      <h3>{title}</h3>
      <p>{label}</p>
    </div>
  );
};

export default GoodsCategoryCard;
