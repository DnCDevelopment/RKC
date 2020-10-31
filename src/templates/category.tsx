import React, { useContext } from 'react';
import { graphql } from 'gatsby';

import Catalog from '../components/Catalog/Catalog';
import CategoryBanner from '../components/CategoryBanner/CategoryBanner';
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
      title: titleValue,
      link: linkValue,
    },
  ];

  return (
    <div className="catalog-page page">
      <Subheader crumbs={crumbs} />
      <CategoryBanner description={descriptionValue} fluid={fluid} title={titleValue} />
      <Catalog nodes={nodes} title={TRANSLATE[language as 'ua' | 'ru'].subCategory} />
    </div>
  );
};

export const query = graphql`
  query($path: String!) {
    cockpitCategories(link: { value: { eq: $path } }) {
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

export default Category;
