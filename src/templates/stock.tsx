import React from 'react';
import { graphql } from 'gatsby';

import Seo from '../components/SEO/SEO';
import Stock from '../components/Stock/Stock';

import { ISingleStockQuery } from './Types';

import { LANGUAGES, TRANSLATE } from '../constants/languages';

const SingleStock: React.FC<ISingleStockQuery> = ({ data }): JSX.Element => {
  const {
    cockpitStocks: {
      title: { value: title },
      description: { value: description },
      link: { value: link },
      picture: {
        value: {
          childImageSharp: { fluid },
        },
      },
      deadline: { value: deadline },
      lang,
    },
  } = data;

  const crumbs = [
    {
      title: TRANSLATE[lang as 'ru' | 'ua'].primaryPage,
      link: LANGUAGES[lang as 'ru' | 'ua'],
    },
    {
      title: TRANSLATE[lang as 'ru' | 'ua'].stockPage,
      link: `${LANGUAGES[lang as 'ru' | 'ua']}stocks`,
    },
    {
      title,
      link,
    },
  ];

  return (
    <>
      <Seo breadcrumbs={crumbs} description={description} lang={lang as 'ru' | 'ua'} path={link} title={title} />
      <Stock crumbs={crumbs} imgSrc={fluid} deadline={deadline} title={title} description={description} lang={lang} />
    </>
  );
};

export const STOCK_DATA_QUERY = graphql`
  query($path: String!) {
    cockpitStocks(link: { value: { eq: $path } }, lang: { ne: "any" }) {
      link {
        value
      }
      deadline {
        value(formatString: "DD.MM.YYYY")
      }
      description {
        value
      }
      title {
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
      lang
    }
  }
`;

export default SingleStock;
