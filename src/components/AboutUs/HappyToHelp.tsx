import { graphql, useStaticQuery } from 'gatsby';
import React, { useContext } from 'react';
import Img from 'gatsby-image';

import { TRANSLATE, HAPPY_TO_HELP } from '../../constants/languages';

import context from '../../context/context';

import './HappyToHelp.scss';

const HAPPY_TO_HELP_IMG_QUERY = graphql`
  {
    file(relativePath: { eq: "assets/images/help.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

const HappyToHelp: React.FC = (): JSX.Element => {
  const {
    file: {
      childImageSharp: { fluid: imgSrc },
    },
  } = useStaticQuery(HAPPY_TO_HELP_IMG_QUERY);

  const { language } = useContext(context);

  return (
    <div className="happy-to-help-wrapper">
      <div className="happy-to-help-info">
        <h2>{TRANSLATE[language as 'ru' | 'ua'].happyToHelpTitle}</h2>
        {HAPPY_TO_HELP[language as 'ru' | 'ua'].map(text => (
          <p key={text}>{text}</p>
        ))}
      </div>
      <div className="img-container">
        <Img fluid={imgSrc} style={{ height: '100%', width: '100%' }} />
      </div>
    </div>
  );
};

export default HappyToHelp;
