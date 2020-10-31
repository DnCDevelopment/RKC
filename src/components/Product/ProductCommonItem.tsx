import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import './ProductCommonItem.scss';
import { IProductCommonItemProps } from './Types';

const ProductCommonItem: React.FC<IProductCommonItemProps> = ({
  name,
  link,
  image: {
    childImageSharp: { fluid },
  },
}) => {
  return (
    <div className="product-common-item">
      <Img className="product-common-item-img" fluid={fluid} />
      <h4 className="product-common-item-title">{name}</h4>
      <Link className="product-common-item-link" to={link}>
        Подробнее
      </Link>
    </div>
  );
};

export default ProductCommonItem;
