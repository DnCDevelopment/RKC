import React, { useContext } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';

import Catalog from './Catalog';
import Contacts from '../Contacts/Contacts';

import { IMenuQuery } from './Types';

import { LANGUAGES } from '../../constants/languages';

import context from '../../context/context';

import './Navigation.scss';

const MENU_QUERY = graphql`
  {
    allCockpitMenu(filter: { lang: { ne: "any" } }) {
      nodes {
        lang
        link {
          value
        }
        title {
          value
        }
      }
    }
  }
`;

const Navigation: React.FC = (): JSX.Element => {
  const { language, pathname } = useContext(context);

  const {
    allCockpitMenu: { nodes },
  }: IMenuQuery = useStaticQuery(MENU_QUERY);

  const links = nodes.filter(({ lang }) => lang === language);

  return (
    <div className={`navigation ${!Object.values(LANGUAGES).includes(pathname) ? 'navigation-static' : ''}`}>
      <div className="navigation-container">
        <Catalog />
        <nav className="menu">
          {links.map(({ link: { value: linkValue }, title: { value: titleValue } }) => (
            <Link className="menu-link" key={linkValue} to={linkValue}>
              {titleValue}
            </Link>
          ))}
        </nav>
        <Contacts />
      </div>
    </div>
  );
};

export default Navigation;
