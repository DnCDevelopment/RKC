import React, { useCallback, useContext, useState } from 'react';
import { createPortal } from 'react-dom';

import Button from '../Button/Button';
import HeaderLogo from './HeaderLogo';
import Form from '../Form/Form';
import Languages from './Languages';
import Offices from './Offices';

import { TRANSLATE } from '../../constants/languages';

import context from '../../context/context';

import Phone from '../../assets/icons/phone.svg';

import './FirstHeader.scss';
import Modal from '../Modal/Modal';
import Searcher from './Searcher';

const FirstHeader: React.FC = (): JSX.Element => {
  const {
    language,
    office: {
      phone: { value: phoneValue },
    },
  } = useContext(context);

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = useCallback(() => {
    setShowModal(!showModal);
    document.body.classList.toggle('fixed');
  }, [showModal]);

  return (
    <div className="first-header">
      <div className="first-header-container">
        <HeaderLogo />
        <div className="first-header-menu">
          <div className="first-header-controls">
            <Languages />
          </div>
          <Offices />
          <Searcher />
        </div>
        <a href={`tel: ${phoneValue}`} className="contacts-item">
          <Phone />
          {phoneValue}
        </a>
        <Button
          click={handleShowModal}
          height={45}
          htmlType="button"
          text={TRANSLATE[language as 'ru' | 'ua'].callback}
          type="primary"
          width={205}
        />
      </div>
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

export default FirstHeader;
