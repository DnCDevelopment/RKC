import React, { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';

import PhoneSVG from '../../assets/icons/phone.svg';
import MailSVG from '../../assets/icons/mail.svg';
import MarkerSVG from '../../assets/icons/marker.svg';

import { TRANSLATE } from '../../constants/languages';

import context from '../../context/context';

import './MainOffice.scss';

const MAIN_OFFICE_BG_QUERY = graphql`
  query mainOfficeFileQuery {
    file(relativePath: { eq: "assets/images/office.jpeg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

const MainOffice: React.FC = (): JSX.Element => {
  const { language, offices } = useContext(context);
  const odessaOffice = offices.find(({ id }) => id === `Cockpit__Offices__5f554bf58b03fa1fb446a651_${language}`);
  const {
    file: {
      childImageSharp: { fluid },
    },
  } = useStaticQuery(MAIN_OFFICE_BG_QUERY);

  return (
    <BackgroundImage Tag="div" fluid={fluid} className="main-office">
      <div className="main-office-wrapper">
        <h3 className="main-office-title">{TRANSLATE[language as 'ru' | 'ua'].mainOffice}</h3>
        <ul className="main-office-list">
          <li className="main-office-list-item">
            <a href={`tel:${odessaOffice.phone.value}`} className="main-office-list-item-link">
              <PhoneSVG />
              {odessaOffice.phone.value}
            </a>
          </li>
          <li className="main-office-list-item">
            <a href={`mailto:${odessaOffice.email.value}`} className="main-office-list-item-link">
              <MailSVG />
              {odessaOffice.email.value}
            </a>
          </li>
          <li className="main-office-list-item">
            <MarkerSVG />
            {odessaOffice.address.value}
          </li>
        </ul>
      </div>
    </BackgroundImage>
  );
};

export default MainOffice;
