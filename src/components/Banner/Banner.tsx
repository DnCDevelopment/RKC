import React, { useCallback, useContext, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-background-image';
import { createPortal } from 'react-dom';

import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import Form from '../Form/Form';

import { TRANSLATE } from '../../constants/languages';

import context from '../../context/context';

import './Banner.scss';

const BANNERIMAGE_QUERY = graphql`
  {
    file(relativePath: { eq: "assets/images/banner.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

const Banner: React.FC = (): JSX.Element => {
  const { language } = useContext(context);

  const {
    file: {
      childImageSharp: { fluid: imgSrc },
    },
  } = useStaticQuery(BANNERIMAGE_QUERY);

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = useCallback(() => {
    setShowModal(!showModal);
    document.body.classList.toggle('fixed');
  }, [showModal]);

  return (
    <div className="banner-container">
      <Img className="banner-img" fluid={imgSrc}>
        <div className="banner-content-container">
          <div className="banner-content">
            <h2 dangerouslySetInnerHTML={{ __html: TRANSLATE[language as 'ru' | 'ua'].bannerTitle }} />
            <p dangerouslySetInnerHTML={{ __html: TRANSLATE[language as 'ru' | 'ua'].bannerText }} />
            <Button
              click={handleShowModal}
              height={45}
              htmlType="button"
              text={TRANSLATE[language as 'ru' | 'ua'].orderNow}
              type="primary"
              width={205}
            />
          </div>
        </div>
      </Img>
      {showModal &&
        createPortal(
          <Modal close={handleShowModal}>
            <Form modal type="modal-window" />
          </Modal>,
          document.body
        )}
    </div>
  );
};

export default Banner;
