import { graphql, useStaticQuery } from 'gatsby';
import React, { useContext } from 'react';
import Img from 'gatsby-image';

import { TRANSLATE } from '../../constants/languages';
import { ADDVANTAGESDATA } from '../../constants/addvantagesData';

import context from '../../context/context';

import './Advantages.scss';

const ADDVIMAGE_QUERY = graphql`
  {
    file(relativePath: { eq: "assets/images/stock.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

const Advantages: React.FC = (): JSX.Element => {
  const {
    file: {
      childImageSharp: { fluid: imgSrc },
    },
  } = useStaticQuery(ADDVIMAGE_QUERY);

  const { language } = useContext(context);

  return (
    <div className="advantages">
      <div className="advantages-content">
        <h2>{TRANSLATE[language as 'ru' | 'ua'].advantagesTitle}</h2>
        <p>{TRANSLATE[language as 'ru' | 'ua'].advantagesText}</p>
        <div className="data-container">
          {ADDVANTAGESDATA[language as 'ru' | 'ua'].map(({ number, text }) => (
            <div key={number + text} className="data-cell">
              <h3>{number}</h3>
              <h6>{text}</h6>
            </div>
          ))}
        </div>
      </div>
      <div className="img-container">
        <Img fluid={imgSrc} style={{ height: '100%', width: '100%' }} />
      </div>
    </div>
  );
};

export default Advantages;
