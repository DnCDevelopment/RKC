import React, { useContext } from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import Button from '../Button/Button';

import { IStockCardProps } from './Types';

import { TRANSLATE } from '../../constants/languages';

import context from '../../context/context';

import './StockCard.scss';

const StockCard: React.FC<IStockCardProps> = ({ dl, title, desc, pic, link }): JSX.Element => {
  const { language } = useContext(context);

  return (
    <div className="stock-card">
      <div className="image-container-wrapper">
        <div className="image-container">
          <Link to={link}>
            <Img fluid={pic} alt={title} />
            <div className="image-container-dark" />
            <div className="info-over-image">
              <div className="card-info-dl">
                <p>{TRANSLATE[language as 'ru' | 'ua'].stockDeadline}</p>
                <p>{dl}</p>
              </div>
              <Button
                click={undefined}
                height={50}
                htmlType="button"
                text={TRANSLATE[language as 'ru' | 'ua'].buttonDetails}
                type="stock"
                width="fit-content"
              />
            </div>
          </Link>
        </div>
      </div>
      <h3 className="card-info-title">{title}</h3>
      <p className="card-info-desc" dangerouslySetInnerHTML={{ __html: desc }} />
    </div>
  );
};

export default StockCard;
