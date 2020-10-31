import React, { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import StockCard from './StockCard';

import { IStocksQuery } from './Types';

import { TRANSLATE } from '../../constants/languages';

import context from '../../context/context';

import './Stocks.scss';

const STOCKS_QUERY = graphql`
  {
    allCockpitStocks(filter: { lang: { ne: "any" } }) {
      nodes {
        deadline {
          value(formatString: "DD.MM.YYYY")
        }
        title {
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
        link {
          value
        }
        lang
        cockpitId
      }
    }
  }
`;

const Stocks: React.FC = (): JSX.Element => {
  const { language } = useContext(context);

  const {
    allCockpitStocks: { nodes },
  }: IStocksQuery = useStaticQuery(STOCKS_QUERY);

  const stocksCards = nodes.filter(({ lang }) => lang === language);

  return (
    <div className="stocks-container">
      <h2 className="stocks-header">{TRANSLATE[language as 'ru' | 'ua'].stocksHeader}</h2>
      <div className="stocks-cards-container">
        {stocksCards.map(
          ({
            deadline: { value: dl },
            title: { value: title },
            description: { value: desc },
            picture: {
              value: {
                childImageSharp: { fluid: pic },
              },
            },
            link: { value: link },
            cockpitId,
          }) => (
            <StockCard key={cockpitId} dl={dl} title={title} desc={desc} pic={pic} link={link} id={cockpitId} />
          )
        )}
      </div>
    </div>
  );
};

export default Stocks;
