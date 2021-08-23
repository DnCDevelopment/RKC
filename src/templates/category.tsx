import React, { useContext } from 'react';
import { graphql } from 'gatsby';

import Catalog from '../components/Catalog/Catalog';
import CategoryBanner from '../components/CategoryBanner/CategoryBanner';
import Seo from '../components/SEO/SEO';
import Subheader from '../components/Subheader/Subheader';

import { ICategoriesProps } from './Types';

import { TRANSLATE, LANGUAGES } from '../constants/languages';

import context from '../context/context';

const Category: React.FC<ICategoriesProps> = ({ data }): JSX.Element => {
  const {
    allCockpitSubCategories: { nodes },
    cockpitCategories: {
      description: { value: descriptionValue },
      image: {
        value: {
          childImageSharp: { fluid },
        },
      },
      link: { value: linkValue },
      title: { value: titleValue },
      lang,
      videoLink,
    },
  } = data;

  const { language } = useContext(context);

  const crumbs = [
    {
      title: TRANSLATE[lang as 'ru' | 'ua'].primaryPage,
      link: LANGUAGES[lang as 'ru' | 'ua'],
    },
    {
      title: 'Каталог',
      link: `${LANGUAGES[lang as 'ru' | 'ua']}catalog`,
    },
    {
      title: titleValue,
      link: linkValue,
    },
  ];

  return (
    <div className="catalog-page page big-container">
      <Seo breadcrumbs={crumbs} description={descriptionValue} lang={lang as 'ru' | 'ua'} path={linkValue} title={titleValue} />
      <Subheader crumbs={crumbs} />
      <CategoryBanner description={descriptionValue} fluid={fluid} title={titleValue} />
      <Catalog nodes={nodes} title={TRANSLATE[language as 'ua' | 'ru'].subCategory} />
      {videoLink && videoLink.value && (
        <div className="catalog-page-video-wrapper">
          <iframe className="catalog-page-video" title="Catalog video" src={videoLink.value} />
        </div>
      )}
    </div>
  );
};

export default Category;

export const query = graphql`
  query($path: String!) {
    cockpitCategories(link: { value: { eq: $path } }, lang: { ne: "any" }) {
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
      lang
      link {
        value
      }
      title {
        value
      }
      videoLink {
        value
      }
    }
    allCockpitSubCategories(filter: { category: { value: { link: { value: { eq: $path } } } }, lang: { ne: "any" } }) {
      nodes {
        id
        lang
        image {
          value {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        title {
          value
        }
        link {
          value
        }
      }
    }
  }
`;
