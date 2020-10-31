import React from 'react';
import { IInfoItemProps } from './Types';
import './InfoItem.scss';

const InfoItem: React.FC<IInfoItemProps> = ({ name, description, svg }): JSX.Element => {
  return (
    <div className="info-carousel-item">
      <div className="info-carousel-item-svg" dangerouslySetInnerHTML={{ __html: svg }} />
      <h4 className="info-carousel-item-header">{name}</h4>
      <div className="info-carousel-item-description" dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  );
};

export default InfoItem;
