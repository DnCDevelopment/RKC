import React, { useContext } from 'react';

import HeaderLogo from './HeaderLogo';
import NavBtn from './NavBtn';
import HeaderCart from './HeaderCart';

import { IMobileHeaderProps } from './Types';

import PhoneIcon from '../../assets/icons/phone.svg';

import './MobileHeader.scss';
import context from '../../context/context';

const MobileHeader: React.FC<IMobileHeaderProps> = ({ isMenuOpen, setMenuOpen }): JSX.Element => {
  const {
    office: {
      phone: { value: phoneValue },
    },
  } = useContext(context);

  return (
    <div className="mobile-header">
      <a href={`tel: ${phoneValue}`} className="contacts-item">
        <PhoneIcon />
      </a>
      <HeaderLogo />
      <HeaderCart />
      <NavBtn isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
    </div>
  );
};
export default MobileHeader;
