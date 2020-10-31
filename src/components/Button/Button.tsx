/* eslint-disable react/button-has-type */
import React from 'react';

import { IButtonProps } from './Types';

import './Button.scss';

const Button: React.FC<IButtonProps> = ({ click, height, htmlType, text, type, width }): JSX.Element => (
  <button className={`button button-${type}`} onClick={click} type={htmlType} style={{ width, height }}>
    {text}
  </button>
);

export default Button;
