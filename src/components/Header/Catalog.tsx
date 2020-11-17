import React, { useCallback, useContext, useEffect, useState } from 'react';

import CatalogIcon from '../../assets/icons/catalog.svg';
import Categories from './Categories';
import SubCategories from './SubCategories';

import { ICatalogProps, ISubCategory } from './Types';

import { TRANSLATE } from '../../constants/languages';

import context from '../../context/context';

import './Catalog.scss';

const Catalog: React.FC<ICatalogProps> = ({ isMobile }): JSX.Element => {
  const { language } = useContext(context);

  const [category, setCategory] = useState<ISubCategory>();
  const [isActive, setActive] = useState<boolean>(false);

  const handleCatalogOpen = useCallback(() => {
    setActive(!isActive);
    if (isMobile) {
      document.body.classList.toggle('fixed');
    }
  }, [isActive, isMobile]);

  useEffect(() => {
    if (!isActive) {
      setCategory(undefined);
    }
  }, [isActive]);

  return (
    <div className={`catalog-container ${isActive ? 'is-catalog-active' : ''}`}>
      <div className="catalog-title">
        <div className="catalog-title-wrapper" onClick={handleCatalogOpen}>
          <CatalogIcon />
          {TRANSLATE[language as 'ru' | 'ua'].catalog}
        </div>
      </div>
      {!!category && <SubCategories isActive={isActive} category={category?.subCategory || ''} index={category?.index || 0} />}
      <Categories isActive={isActive} link={category?.subCategory || ''} setActive={setActive} setCategory={setCategory} />
    </div>
  );
};

export default Catalog;
