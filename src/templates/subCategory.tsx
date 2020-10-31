import React, { useContext } from 'react';
import { graphql } from 'gatsby';

import CategoryBanner from '../components/CategoryBanner/CategoryBanner';
import Subheader from '../components/Subheader/Subheader';

import { ISubCategoriesProps } from './Types';

import { TRANSLATE, LANGUAGES } from '../constants/languages';

import context from '../context/context';
import Catalog from '../components/Catalog/Catalog';

const SubCategory: React.FC<ISubCategoriesProps> = ({ data }): JSX.Element => {
  const {
    allCockpitSubSubCategories: { nodes },
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
      link: { value: linkValue },
      title: { value: titleValue },
    },
  } = data;

  const { language } = useContext(context);

  const crumbs = [
    {
      title: TRANSLATE[language as 'ru' | 'ua'].primaryPage,
      link: LANGUAGES[language as 'ru' | 'ua'],
    },
    {
      title: 'Каталог',
      link: `${LANGUAGES[language as 'ru' | 'ua']}catalog`,
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
      <Subheader crumbs={crumbs} />
      <CategoryBanner description={descriptionValue} fluid={fluid} title={titleValue} />
      <Catalog nodes={nodes} title={TRANSLATE[language as 'ua' | 'ru'].subCategory} />
    </div>
  );
};

export const query = graphql`
  query($path: String!) {
    cockpitSubCategories(link: { value: { eq: $path } }) {
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
      link {
        value
      }
      title {
        value
      }
    }
    allCockpitSubSubCategories(filter: { subCategory: { value: { link: { value: { eq: $path } } } }, lang: { ne: "any" } }) {
      nodes {
        id
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
    }
  }
`;

export default SubCategory;
