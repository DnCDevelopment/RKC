import React from 'react';
import Img from 'gatsby-background-image';

import { ICategoryBannerProps } from '../CategoryBanner/Types';

import '../CategoryBanner/CategoryBanner.scss';

const CatalogBanner: React.FC<ICategoryBannerProps> = ({ description, fluid, title }) => {
  return (
    <div className="category-banner">
      <Img fluid={fluid} className="category-banner-image">
        <h1>{title}</h1>
        <p className="category-banner-text" dangerouslySetInnerHTML={{ __html: description }} />
        <div className="category-banner-dark" />
      </Img>
    </div>
  );
};

export default CatalogBanner;
