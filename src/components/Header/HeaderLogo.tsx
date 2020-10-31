import React, { useContext } from 'react';
import { Link } from 'gatsby';

import Logo from '../../assets/icons/header-logo.svg';

import { LANGUAGES } from '../../constants/languages';

import context from '../../context/context';

const HeaderLogo: React.FC = (): JSX.Element => {
  const { language } = useContext(context);
  return (
    <Link className="logo-link" to={LANGUAGES[language as 'ru' | 'ua']}>
      <Logo />
    </Link>
  );
};

export default HeaderLogo;
