import React from 'react';
import Img from 'gatsby-background-image';

import { ICategoryBannerProps } from './Types';

import './CategoryBanner.scss';

const CategoryBanner: React.FC<ICategoryBannerProps> = ({ description, fluid, title }) => (
  <Img fluid={fluid} className="category-banner">
    <h1>{title}</h1>
    <p>{description}</p>
    <div className="category-banner-dark" />
  </Img>
);

export default CategoryBanner;
