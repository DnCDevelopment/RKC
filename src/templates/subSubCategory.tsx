import React, { useContext } from 'react';
import { graphql } from 'gatsby';

import CategoryBanner from '../components/CategoryBanner/CategoryBanner';
import Goods from '../components/Goods/Goods';
import Subheader from '../components/Subheader/Subheader';

import { ISubSubCategoriesProps } from './Types';

import { TRANSLATE, LANGUAGES } from '../constants/languages';

import context from '../context/context';

const SubSubCategory: React.FC<ISubSubCategoriesProps> = ({ data }): JSX.Element => {
  const {
    allCockpitProduct: { nodes },
    cockpitSubSubCategories: {
      subCategory: {
        value: {
          link: { value: subCategoryLink },
          title: { value: subCategoryTitle },
          category: {
            value: {
              link: { value: categoryLink },
              title: { value: categoryTitle },
            },
          },
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
      title: subCategoryTitle,
      link: subCategoryLink,
    },
    {
      title: titleValue,
      link: linkValue,
    },
  ];

  return (
    <div className="big-container">
      <Subheader crumbs={crumbs} />
      <CategoryBanner description={descriptionValue} fluid={fluid} title={titleValue} />
      <Goods goods={nodes} />
    </div>
  );
};

export const query = graphql`
  query($path: String!) {
    cockpitSubSubCategories(link: { value: { eq: $path } }) {
      subCategory {
        value {
          link {
            value
          }
          title {
            value
          }
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

export default SubSubCategory;
