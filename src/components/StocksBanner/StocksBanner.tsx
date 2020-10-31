import React, { useContext, useMemo } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import Background from 'gatsby-background-image';
import Carousel from '../Carousel/Carousel';
import context from '../../context/context';
import { TRANSLATE } from '../../constants/languages';
import { IStocksQuery } from '../Stocks/Types';
import ArrowSVG from '../../assets/icons/arrow.svg';
import './StocksBanner.scss';

const STOCK_BANNERS_QUERY = graphql`
  {
    allCockpitStocks {
      nodes {
        id
        lang
        link {
          value
        }
        description {
          value
        }
        picture {
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

const StocksBanner: React.FC = (): JSX.Element => {
  const { language } = useContext(context);
  const {
    allCockpitStocks: { nodes },
  } = useStaticQuery<IStocksQuery>(STOCK_BANNERS_QUERY);
  const stocks = useMemo(() => nodes.filter(({ lang }) => language === lang).slice(0, 3), [language]);
  return (
    <div className="stocks-banner">
      <Carousel infinity={false} withDots withRange buttonNext={<ArrowSVG />} buttonPrev={<ArrowSVG />}>
        {stocks.map(
          ({
            id,
            picture: {
              value: {
                childImageSharp: { fluid },
              },
            },
            description: { value: description },
            link: { value: link },
          }) => (
            <Background Tag="div" className="stocks-banner-image" key={id} fluid={fluid}>
              <div className="stocks-banner-info">
                <h1 className="stocks-banner-header">{TRANSLATE[language as 'ru' | 'ua'].stocksTitle}</h1>
                <div className="stocks-banner-text" dangerouslySetInnerHTML={{ __html: description }} />
                <Link className="stocks-banner-link" to={link}>
                  {TRANSLATE[language as 'ru' | 'ua'].buttonDetails}
                </Link>
              </div>
            </Background>
          )
        )}
      </Carousel>
    </div>
  );
};

export default StocksBanner;
