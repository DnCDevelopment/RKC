import React from 'react';
import Img from 'gatsby-background-image';

import Subheader from '../Subheader/Subheader';
import LinkedButton from '../LinkedButton/LinkedButton';

import { TRANSLATE } from '../../constants/languages';

import { IStockProps } from './Types';

import './Stock.scss';

const Stock: React.FC<IStockProps> = ({ crumbs, imgSrc, deadline, title, description, lang }) => {
  return (
    <Img fluid={imgSrc} className="single-stock">
      <div className="single-stock-wrapper">
        <Subheader crumbs={crumbs} />
        <div className="single-stock-info">
          <p className="single-stock-info-deadline">
            {TRANSLATE[lang as 'ru' | 'ua'].stockWork}
            {deadline}
          </p>
          <h3 className="single-stock-info-title">{title}</h3>
          <p className="single-stock-info-description" dangerouslySetInnerHTML={{ __html: description }} />
        </div>
        <LinkedButton
          to={lang === 'ru' ? '/stocks' : '/ua/stocks'}
          height={45}
          htmlType="button"
          text={TRANSLATE[lang as 'ru' | 'ua'].backToStocks}
          type="primary"
          width={205}
        />
      </div>
    </Img>
  );
};

export default Stock;
