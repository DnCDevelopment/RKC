import React from 'react';

import FirstHeader from './FirstHeader';
import Navigation from './Navigation';

import { IMenuProps } from './Types';

import './Menu.scss';

const Menu: React.FC<IMenuProps> = ({ isMenuOpen }): JSX.Element => {
  return (
    <div className={`header-menu ${isMenuOpen ? 'header-menu-open' : ''}`}>
      <FirstHeader />
      <Navigation />
    </div>
  );
};

export default Menu;
