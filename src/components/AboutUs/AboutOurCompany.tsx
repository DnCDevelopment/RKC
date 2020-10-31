import React, { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-background-image';

import Subheader from '../Subheader/Subheader';

import { IBreadcrumbsProps } from '../Breadcrumbs/Types';

import { ABOUT_OUR_COMPANY } from '../../constants/languages';
import { ABOUTUSDATA } from '../../constants/aboutUsData';

import context from '../../context/context';

import './AboutOurCompany.scss';

const ABOUTUSIMAGE_QUERY = graphql`
  {
    file(relativePath: { eq: "assets/images/aboutus.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

const AboutOurCompany: React.FC<IBreadcrumbsProps> = ({ crumbs }): JSX.Element => {
  const { language } = useContext(context);

  const {
    file: {
      childImageSharp: { fluid: imgSrc },
    },
  } = useStaticQuery(ABOUTUSIMAGE_QUERY);

  return (
    <Img fluid={imgSrc} className="about-our-company">
      <div className="about-our-company-wrapper">
        <Subheader crumbs={crumbs} />
        <div className="about-our-company-info">
          <h3 className="about-our-company-info-title">{ABOUT_OUR_COMPANY[language as 'ru' | 'ua'].title}</h3>
          <p className="about-our-company-info-about">{ABOUT_OUR_COMPANY[language as 'ru' | 'ua'].about}</p>
          <div className="about-our-company-info-stats">
            {ABOUTUSDATA[language as 'ru' | 'ua'].map(({ number, text }) => (
              <div key={number + text} className="about-our-company-info-stats-cell">
                <h4>{number}</h4>
                <h6>{text}</h6>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Img>
  );
};

export default AboutOurCompany;
