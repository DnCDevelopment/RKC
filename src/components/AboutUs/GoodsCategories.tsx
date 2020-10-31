import React, { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import GoodsCategoryCard from './GoodsCategoryCard';

import { GOODS_CATEGORIES } from '../../constants/languages';
import { GOODS_CATEGORIES_CARDS_DATA } from '../../constants/goodsCategoriesCardsData';

import context from '../../context/context';

import './GoodsCategories.scss';
import Carousel from '../Carousel/Carousel';

const GOODS_CATEGORIES_IMGS_QUERY = graphql`
  {
    allFile(filter: { relativeDirectory: { eq: "assets/goodsCardsIcons" } }) {
      nodes {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`;

const GoodsCategories: React.FC = (): JSX.Element => {
  const { language } = useContext(context);

  const {
    allFile: { nodes },
  } = useStaticQuery(GOODS_CATEGORIES_IMGS_QUERY);

  return (
    <>
      <div className="goods-categories-wrapper">
        <div className="goods-categories-info">
          <h2 className="goods-categories-info-title">{GOODS_CATEGORIES[language as 'ru' | 'ua'].title}</h2>
          <p className="goods-categories-info-about">{GOODS_CATEGORIES[language as 'ru' | 'ua'].about}</p>
        </div>
      </div>
      <div className="goods-categories-carousel">
        <Carousel withDots infinity={false}>
          {GOODS_CATEGORIES_CARDS_DATA[language as 'ru' | 'ua'].map(({ title, label }, i) => (
            <GoodsCategoryCard key={title} icon={nodes[i].childImageSharp.fluid} title={title} label={label} />
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default GoodsCategories;
