import React, { useContext } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';

import { ISubCategoriesProps } from './Types';
import { ISubSubCategoriesQuery } from '../Types';

import context from '../../context/context';

import './SubCategories.scss';

const SUBCATEGORIES_QUERY = graphql`
  {
    allCockpitSubSubCategories(filter: { lang: { ne: "any" } }) {
      nodes {
        lang
        link {
          value
        }
        title {
          value
        }
        subCategory {
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

const SubSubCategories: React.FC<ISubCategoriesProps> = ({ isActive, category, index }): JSX.Element => {
  const {
    allCockpitSubSubCategories: { nodes },
  }: ISubSubCategoriesQuery = useStaticQuery(SUBCATEGORIES_QUERY);

  const { language } = useContext(context);

  const subCategories = nodes.filter(
    ({
      lang,
      subCategory: {
        value: {
          link: { value },
        },
      },
    }) => lang === language && value === category
  );

  return (
    <>
      {!!subCategories.length && (
        <div className={`sub-categories sub-sub-categories sub-categories-${index} ${!isActive ? 'not-visible' : ''}`}>
          {subCategories.map(({ link: { value: linkValue }, title: { value } }) => (
            <Link key={linkValue} to={linkValue} className="category ">
              {value}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default SubSubCategories;
