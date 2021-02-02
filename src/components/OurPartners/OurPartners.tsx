import React, { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

import { IOurPartnersQuery } from './Types';

import context from '../../context/context';

import './OutPartners.scss';

const OUR_PARTNERS_QUERY = graphql`
  {
    allCockpitPartners(filter: { lang: { ne: "any" } }) {
      nodes {
        lang
        link {
          value
        }
        logo {
          value {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        title {
          value
        }
      }
    }
  }
`;

const OurPartners: React.FC = (): JSX.Element => {
  const { language } = useContext(context);

  const {
    allCockpitPartners: { nodes },
  } = useStaticQuery<IOurPartnersQuery>(OUR_PARTNERS_QUERY);

  const partners = nodes.filter(({ lang }) => lang === language);

  return (
    <div className="partners-container">
      {partners.map(({ link: { value: link }, logo: { value: logo }, title: { value: title } }) => (
        <a className="partner" href={link} key={link} rel="noreferrer" target="_blank">
          <div className="partner-image">
            <Img fluid={logo.childImageSharp.fluid} alt={title} />
          </div>
          <p className="partner-title">{title}</p>
          <p className="partner-link">{link}</p>
        </a>
      ))}
    </div>
  );
};

export default OurPartners;
