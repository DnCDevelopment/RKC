import React, { useContext } from 'react';

import HeaderLogo from '../Header/HeaderLogo';
import AddPages from './AddPages';
import ConnectWithUs from './ConnectWithUs';
import Contacts from '../Contacts/Contacts';
import Subscribe from './Subscribe';

import { TRANSLATE } from '../../constants/languages';

import context from '../../context/context';
import DnCLogo from '../../assets/illustrations/dnc.svg';

import './Footer.scss';

const Footer: React.FC = (): JSX.Element => {
  const { language } = useContext(context);

  return (
    <footer>
      <div className="footer-container">
        <div className="footer-info">
          <div className="footer-logo-and-text">
            <HeaderLogo />
            <p className="footer-text-under-logo">{TRANSLATE[language as 'ru' | 'ua'].footerUnderLogo}</p>
          </div>
          <div className="divider" />
          <div className="footer-grid">
            <Contacts>
              <h2>{TRANSLATE[language as 'ru' | 'ua'].contacts}</h2>
            </Contacts>
            <AddPages />
            <Subscribe />
            <ConnectWithUs />
          </div>
        </div>
        <div className="copyright-wrapper">
          <p className="copyright">{TRANSLATE[language as 'ru' | 'ua'].copyrightTitle}</p>
          <a href="https://dnc.net.ua/">
            made by D&C Development
            <DnCLogo />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
