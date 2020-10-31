import React, { useContext } from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';

import { IAddPagesQuery } from './Types';

import { TRANSLATE } from '../../constants/languages';

import context from '../../context/context';

import './AddPages.scss';

const ADDPAGES_QUERY = graphql`
  {
    data: allCockpitAddPages(filter: { lang: { ne: "any" } }) {
      nodes {
        link {
          value
        }
        title {
          value
        }
        lang
      }
    }
  }
`;

const AddPages: React.FC = (): JSX.Element => {
  const {
    data: { nodes },
  }: IAddPagesQuery = useStaticQuery(ADDPAGES_QUERY);

  const { language } = useContext(context);

  const titles = nodes.filter(({ lang }) => lang === language);

  return (
    <div className="add-pages">
      <h2>{TRANSLATE[language as 'ru' | 'ua'].addpages}</h2>
      {titles.map(({ link: { value: linkValue }, title: { value: titleValue } }) => (
        <Link className="add-pages-link" key={linkValue + titleValue} to={linkValue}>
          {titleValue}
        </Link>
      ))}
    </div>
  );
};

export default AddPages;
