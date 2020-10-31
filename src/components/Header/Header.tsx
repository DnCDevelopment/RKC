import React, { useContext, useEffect, useState } from 'react';

import Catalog from './Catalog';
import MobileHeader from './MobileHeader';
import Menu from './Menu';
import Searcher from './Searcher';

import context from '../../context/context';

import './Header.scss';

const Header: React.FC = (): JSX.Element => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  const { pathname } = useContext(context);

  useEffect(() => {
    setMenuOpen(false);
    document.body.classList.remove('fixed');
  }, [pathname]);

  return (
    <header>
      <MobileHeader isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
      <Catalog isMobile />
      <Menu isMenuOpen={isMenuOpen} />
    </header>
  );
};

export default Header;
