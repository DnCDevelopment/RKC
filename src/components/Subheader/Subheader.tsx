/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import React from 'react';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { IBreadcrumbsProps } from '../Breadcrumbs/Types';
import Arrow from '../../assets/icons/arrow.svg';
import './Subheader.scss';

const Subheader: React.FC<IBreadcrumbsProps> = ({ crumbs }): JSX.Element => {
  return (
    <div className="subheader">
      <Breadcrumbs crumbs={crumbs} />
      <button
        className="subheader-button"
        type="button"
        onClick={() => {
          typeof history !== 'undefined' && history.go(-1);
        }}
      >
        <Arrow />
        Назад
      </button>
    </div>
  );
};

export default Subheader;
