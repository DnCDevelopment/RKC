import React, { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import Catalog from '../components/Catalog/Catalog';
import CatalogCarousel from '../components/Catalog/CatalogCarousel';
import Seo from '../components/SEO/SEO';
import Subheader from '../components/Subheader/Subheader';

import { ICockpitCategoriesQuery } from '../components/Catalog/Types';

import { SEO_ITEMS } from '../constants/SEOItems';
import { TRANSLATE } from '../constants/languages';

import context from '../context/context';
import CategoryBanner from '../components/CategoryBanner/CategoryBanner';
import CatalogBanner from '../components/Catalog/CatalogBanner';

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
    cockpitCatalogCarousel {
      id
      lang
      title {
        value
      }
      description {
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
    cockpitCatalogCarousel: {
      title: { value: title },
      description: { value: description },
      image: {
        value: {
          childImageSharp: { fluid },
        },
      },
    },
  } = useStaticQuery<ICockpitCategoriesQuery>(CATALOG_QUERY);

  const { language } = useContext(context);

  return (
    <div className="catalog-page page">
      <Seo
        breadcrumbs={crumbs}
        description={SEO_ITEMS.ru.catalogPage.description}
        lang="ru"
        path="/catalog"
        title={SEO_ITEMS.ru.catalogPage.title}
      />
      <Subheader crumbs={crumbs} />
      <CatalogBanner title={title} description={description} fluid={fluid} />
      <Catalog nodes={nodes} title={TRANSLATE[language as 'ua' | 'ru'].catalog} />
    </div>
  );
};

export default CatalogPage;
