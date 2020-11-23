import React from 'react';
import { Link } from 'gatsby';
import { IInfoItemProps } from './Types';
import './InfoItem.scss';

const InfoItem: React.FC<IInfoItemProps> = ({ link, name, description, svg }): JSX.Element => {
  return (
    <Link to={link} className="info-carousel-item">
      <div className="info-carousel-item-svg" dangerouslySetInnerHTML={{ __html: svg }} />
      <h4 className="info-carousel-item-header">{name}</h4>
      <div className="info-carousel-item-description" dangerouslySetInnerHTML={{ __html: description }} />
    </Link>
  );
};

export default InfoItem;
