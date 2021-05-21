import React, { useState, useContext } from 'react';
import Img from 'gatsby-background-image';
import ArrowSVG from '../../assets/icons/arrow.svg';

import { ICategoryBannerProps } from './Types';

import './CategoryBanner.scss';
import { TRANSLATE } from '../../constants/languages';
import context from '../../context/context';

const CategoryBanner: React.FC<ICategoryBannerProps> = ({ description, fluid, title, priceList }) => {
  const [isOpen, open] = useState<boolean>(false);
  const { language } = useContext(context);

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
        {priceList && (
          <a className="category-banner-price-list" href={priceList} download>
            {TRANSLATE[language as 'ru' | 'ua'].downloadPriceList}
          </a>
        )}
      </Img>
    </div>
  );
};

export default CategoryBanner;
