import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { ICategoriesProps } from './Types';
import { ICategoryQuery } from '../Types';

import context from '../../context/context';

import './Categories.scss';

const MENU_QUERY = graphql`
  {
    allCockpitCategories(filter: { lang: { ne: "any" } }) {
      nodes {
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

const Categories: React.FC<ICategoriesProps> = ({ isActive, link, setActive, setCategory, setSubCategory }): JSX.Element => {
  const {
    allCockpitCategories: { nodes },
  }: ICategoryQuery = useStaticQuery(MENU_QUERY);

  const { language } = useContext(context);

  const categoriesRef = useRef<HTMLDivElement>();

  const handleClickOutside = useCallback(e => {
    if (
      categoriesRef &&
      !categoriesRef.current.contains(e.target) &&
      !e.target.classList.contains('catalog-title-wrapper') &&
      !e.target.classList.contains('sub-category')
    ) {
      setActive(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const categories = nodes.filter(({ lang }) => lang === language);

  return (
    <div className={`categories ${!isActive ? 'not-visible' : ''} ${link ? 'categories-close' : ''}`} ref={categoriesRef}>
      {categories.map(({ link: { value: linkValue }, title: { value } }, index) => (
        <div
          key={linkValue}
          className="category"
          onClick={() => {
            setCategory({ subCategory: linkValue, index });
            setSubCategory(undefined);
          }}
        >
          {value}
        </div>
      ))}
    </div>
  );
};

export default Categories;
