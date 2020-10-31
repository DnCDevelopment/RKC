import React, { useState, useMemo, useContext, Fragment } from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import Img from 'gatsby-image';
import Carousel from '../Carousel/Carousel';
import context from '../../context/context';
import { IProductsWithStocksQuery } from './Types';
import ArrowSVG from '../../assets/icons/arrow.svg';
import './MainStocks.scss';
import { TRANSLATE } from '../../constants/languages';

const PRODUCT_WITH_STOCKS_QUERTY = graphql`
  {
    allCockpitProduct(filter: { stock: { value: { ne: null } } }) {
      nodes {
        lang
        id
        name {
          value
        }
        stock {
          value
        }
        description {
          value
        }
        price {
          value
        }
        link {
          value
        }
        images {
          value {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;

const MainStocks = () => {
  const {
    allCockpitProduct: { nodes },
  } = useStaticQuery<IProductsWithStocksQuery>(PRODUCT_WITH_STOCKS_QUERTY);
  const { language } = useContext(context);
  const [currentProduct, setProduct] = useState(0);
  const products = useMemo(() => nodes.filter(({ lang }) => lang === language), [language]);

  return (
    <div className="main-stocks">
      <div className="main-stocks-info">
        <h2 className="main-stocks-info-header"> {TRANSLATE[language as 'ru' | 'ua'].stockProducts}</h2>
        <h3 className="main-stocks-info-name">{products[currentProduct].name.value}</h3>
        <div className="main-stocks-info-text" dangerouslySetInnerHTML={{ __html: products[currentProduct].description.value }} />
        <h3 className="main-stocks-info-price">{products[currentProduct].price.value} грн</h3>
        <Link className="main-stocks-info-link" to={products[currentProduct].link.value}>
          {TRANSLATE[language as 'ru' | 'ua'].buttonDetails}
        </Link>
      </div>
      <Carousel infinity={false} withRange callback={val => setProduct(val)} buttonNext={<ArrowSVG />} buttonPrev={<ArrowSVG />}>
        {products.map(({ id, images: { value: images }, stock: { value: stock } }) => (
          <Fragment key={id}>
            <Img className="main-stocks-image" fluid={images[0].childImageSharp.fluid} />
            <div className="main-stocks-stock">-{stock}%</div>
          </Fragment>
        ))}
      </Carousel>
    </div>
  );
};

export default MainStocks;
