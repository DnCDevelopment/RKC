import React, { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import Catalog from '../components/Catalog/Catalog';
import CatalogCarousel from '../components/Catalog/CatalogCarousel';
import Subheader from '../components/Subheader/Subheader';

import { ICockpitCategoriesQuery } from '../components/Catalog/Types';

import { TRANSLATE } from '../constants/languages';

import context from '../context/context';

const CATALOG_QUERY = graphql`
  {
    allCockpitCategories(filter: { lang: { ne: "any" } }) {
      nodes {
        id
        lang
        title {
          value
        }
        link {
          value
        }
        image {
          value {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;

const crumbs = [
  {
    title: 'Главная',
    link: '/',
  },
  {
    title: 'Каталог',
    link: '/catalog',
  },
];

const CatalogPage: React.FC = (): JSX.Element => {
  const {
    allCockpitCategories: { nodes },
  } = useStaticQuery<ICockpitCategoriesQuery>(CATALOG_QUERY);

  const { language } = useContext(context);

  return (
    <div className="catalog-page page">
      <Subheader crumbs={crumbs} />
      <CatalogCarousel />
      <Catalog nodes={nodes} title={TRANSLATE[language as 'ua' | 'ru'].catalog} />
    </div>
  );
};

export default CatalogPage;
