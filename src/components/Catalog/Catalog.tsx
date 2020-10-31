import React, { useContext } from 'react';

import CatalogItem from './CatalogItem';

import { ICatalogProps } from './Types';

import context from '../../context/context';

import './Catalog.scss';

const Catalog: React.FC<ICatalogProps> = ({ nodes, title }): JSX.Element => {
  const { language } = useContext(context);
  return (
    <div className="catalog-wrapper">
      <h1 className="catalog-title">{title}</h1>
      <div className="catalog">
        {nodes
          .filter(({ lang }) => lang === language)
          .map(({ id, title: { value: titleValue }, image: { value: image }, link: { value: link } }) => (
            <CatalogItem key={id} name={titleValue} image={image} link={link} />
          ))}
      </div>
    </div>
  );
};

export default Catalog;
