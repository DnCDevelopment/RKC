import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import Delivery from '../../assets/icons/delivery.svg';

import { IGoodProps } from './Types';

import './Good.scss';

const Good: React.FC<IGoodProps> = ({ fluid, link, price, title }) => (
  <Link key={link} to={link} className="good">
    <div className="good-image-container">
      <Img fluid={fluid} alt={title} imgStyle={{ objectFit: 'contain' }} />
      <p className="good-title">{title}</p>
      <div className="good-price-container">
        <span className="good-price">{price} грн</span>
        <Delivery />
      </div>
    </div>
  </Link>
);

export default Good;
