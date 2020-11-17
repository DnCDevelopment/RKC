import React, { useContext } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';

import { ISubCategoriesProps } from './Types';
import { ISubCategoriesQuery } from '../Types';

import context from '../../context/context';

import './SubCategories.scss';

const SUBCATEGORIES_QUERY = graphql`
  {
    allCockpitSubCategories(filter: { lang: { ne: "any" } }) {
      nodes {
        lang
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
          }
        }
      }
    }
  }
`;

const SubCategories: React.FC<ISubCategoriesProps> = ({ isActive, category, index }): JSX.Element => {
  const {
    allCockpitSubCategories: { nodes },
  }: ISubCategoriesQuery = useStaticQuery(SUBCATEGORIES_QUERY);

  const { language } = useContext(context);

  const subCategories = nodes.filter(
    ({
      lang,
      category: {
        value: {
          link: { value },
        },
      },
    }) => lang === language && value === category
  );

  return (
    <>
      {!!subCategories.length && (
        <div className={`sub-categories sub-categories-${index} ${!isActive ? 'not-visible' : ''}`}>
          {subCategories.map(({ link: { value: linkValue }, title: { value } }) => (
            <Link key={linkValue} className="category sub-category" to={linkValue}>
              {value}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default SubCategories;
