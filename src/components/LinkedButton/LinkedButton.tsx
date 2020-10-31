/* eslint-disable react/button-has-type */
import React from 'react';
import { Link } from 'gatsby';

import { ILinkedButtonProps } from './Types';

import './LinkedButton.scss';

const Button: React.FC<ILinkedButtonProps> = ({ to, height, htmlType, text, type, width }): JSX.Element => (
  <Link to={to}>
    <button className={`button button-${type} linked-button`} type={htmlType} style={{ width, height }}>
      {text}
    </button>
  </Link>
);

export default Button;
