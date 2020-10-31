import React from 'react';

import { IFigure } from './Types';

import './Figure.scss';

const Figure: React.FC<IFigure> = ({ type, turn }): JSX.Element => (
  <div className="figure">
    <div className="square">
      <div className={`little-square type${type}`} />
    </div>
    <div className={`lines turn${turn}`}>
      <div className="line1" />
      <div className="line2" />
    </div>
  </div>
);

export default Figure;
