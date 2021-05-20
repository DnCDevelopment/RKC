import React from 'react';
import { graphql } from 'gatsby';

import CategoryBanner from '../components/CategoryBanner/CategoryBanner';
import Goods from '../components/Goods/Goods';
import Seo from '../components/SEO/SEO';
import Subheader from '../components/Subheader/Subheader';

import { ISubCategoriesProps } from './Types';

import { TRANSLATE, LANGUAGES } from '../constants/languages';

const SubCategory: React.FC<ISubCategoriesProps> = ({ data }): JSX.Element => {
  const {
    allCockpitProduct: { nodes },
    cockpitSubCategories: {
      category: {
        value: {
          link: { value: categoryLink },
          title: { value: categoryTitle },
        },
      },
      description: { value: descriptionValue },
      image: {
        value: {
          childImageSharp: { fluid },
        },
      },
      lang,
      link: { value: linkValue },
      title: { value: titleValue },
    },
  } = data;

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
      title: categoryTitle,
      link: categoryLink,
    },
    {
      title: titleValue,
      link: linkValue,
    },
  ];

  return (
    <div className="big-container catalog-page">
      <Seo breadcrumbs={crumbs} description={descriptionValue} lang={lang as 'ru' | 'ua'} path={linkValue} title={titleValue} />
      <Subheader crumbs={crumbs} />
      <CategoryBanner description={descriptionValue} fluid={fluid} title={titleValue} />
      <Goods goods={nodes} />
    </div>
  );
};

export const query = graphql`
  query($path: String!) {
    cockpitSubCategories(link: { value: { eq: $path } }, lang: { ne: "any" }) {
      category {
        value {
          link {
            value
          }
          title {
            value
          }
        }
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
      lang
      link {
        value
      }
      title {
        value
      }
    }
    allCockpitProduct(filter: { subcategory: { value: { link: { value: { eq: $path } } } }, lang: { ne: "any" } }) {
      nodes {
        image {
          value {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        link {
          value
        }
        price {
          value
        }
        name {
          value
        }
      }
    }
  }
`;

export default SubCategory;
