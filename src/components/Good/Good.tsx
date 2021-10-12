import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import Delivery from '../../assets/icons/delivery.svg';

import { IGoodProps } from './Types';

import './Good.scss';

const priceFormat = Intl.NumberFormat('ru', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const Good: React.FC<IGoodProps> = ({ fluid, link, price, title, stock }) => {
  const finalStock = !Number.isNaN(+stock?.replace(',', '.')) ? 1 - +stock.replace(',', '.') / 100 : 1;
  return (
    <Link key={link} to={link} className="good">
      <div className="good-image-container">
        <Img fluid={fluid} alt={title} imgStyle={{ objectFit: 'contain' }} />
        <p className="good-title">{title}</p>
        <div className="good-price-container">
          <span className="good-price">
            {finalStock !== 1 ? (
              <>
                <span className="good-price-old">{priceFormat.format(+price.replace(',', '.'))}</span>
                {priceFormat.format(+price.replace(',', '.') * finalStock)} грн
              </>
            ) : (
              <>{priceFormat.format(+price.replace(',', '.'))} грн</>
            )}
          </span>
          <Delivery />
        </div>
      </div>
    </Link>
  );
};

export default Good;
