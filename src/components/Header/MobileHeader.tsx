import React from 'react';

import HeaderLogo from './HeaderLogo';
import NavBtn from './NavBtn';

import { IMobileHeaderProps } from './Types';

import PhoneIcon from '../../assets/icons/phone.svg';

import './MobileHeader.scss';
import HeaderCart from './HeaderCart';

const MobileHeader: React.FC<IMobileHeaderProps> = ({ isMenuOpen, setMenuOpen }): JSX.Element => (
  <div className="mobile-header">
    <PhoneIcon />
    <HeaderLogo />
    <HeaderCart />
    <NavBtn isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
  </div>
);
export default MobileHeader;
