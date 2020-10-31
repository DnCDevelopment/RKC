import React, { useCallback } from 'react';

import { INavBtnProps } from './Types';

import './NavBtn.scss';

const NavBtn: React.FC<INavBtnProps> = ({ isMenuOpen, setMenuOpen }): JSX.Element => {
  const handleOpen = useCallback(() => {
    setMenuOpen(!isMenuOpen);
    document.body.classList.toggle('fixed');
  }, [isMenuOpen]);

  return (
    <div className={`nav-btn${isMenuOpen ? '-active' : ''}`} onClick={handleOpen}>
      <span />
    </div>
  );
};
export default NavBtn;
