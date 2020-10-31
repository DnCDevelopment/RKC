import React from 'react';
import { Link } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import ArrowSVG from '../../assets/icons/long-arrow.svg';
import { ICatalogItemProps } from './Types';
import './CatalogItem.scss';

const CatalogItem: React.FC<ICatalogItemProps> = ({
  name,
  link,
  image: {
    childImageSharp: { fluid },
  },
}) => {
  return (
    <BackgroundImage fluid={fluid} className="catalog-item-wrapper">
      <Link to={link} className="catalog-item">
        <h4 className="catalog-item-title">{name}</h4>
        <ArrowSVG />
      </Link>
    </BackgroundImage>
  );
};

export default CatalogItem;
