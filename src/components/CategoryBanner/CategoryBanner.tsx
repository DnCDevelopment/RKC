import React, { useState } from 'react';
import Img from 'gatsby-background-image';
import ArrowSVG from '../../assets/icons/arrow.svg';

import { ICategoryBannerProps } from './Types';

import './CategoryBanner.scss';

const CategoryBanner: React.FC<ICategoryBannerProps> = ({ description, fluid, title }) => {
  const [isOpen, open] = useState<boolean>(false);

  return (
    <div className={`category-banner ${isOpen ? 'category-banner-open' : ''}`}>
      <Img fluid={fluid} className="category-banner-image">
        <h1>{title}</h1>
        <p dangerouslySetInnerHTML={{ __html: description }} />
        {!isOpen && (
          <button
            className="category-banner-btn"
            type="button"
            onClick={() => {
              open(true);
            }}
          >
            <ArrowSVG />
          </button>
        )}
        <div className="category-banner-dark" />
      </Img>
    </div>
  );
};

export default CategoryBanner;
