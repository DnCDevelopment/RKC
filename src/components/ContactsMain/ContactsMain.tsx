import React, { useCallback, useContext, useState } from 'react';
import { createPortal } from 'react-dom';

import Offices from '../Header/Offices';
import MapPicker from './MapPicker';
import Fillial from './Fillial';
import Modal from '../Modal/Modal';
import Form from '../Form/Form';

import context from '../../context/context';

import { TRANSLATE } from '../../constants/languages';

import './ContactsMain.scss';

const ContactsMain: React.FC = (): JSX.Element => {
  const { language } = useContext(context);

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = useCallback(() => {
    setShowModal(!showModal);
    document.body.classList.toggle('fixed');
  }, [showModal]);

  return (
    <div className="contacts-map-wrapper">
      <div className="contacts-map-wrapper-info">
        <h1 className="contacts-map-wrapper-info-title">{TRANSLATE[language as 'ru' | 'ua'].contactsHereToHelp}</h1>
        <p className="contacts-map-wrapper-info-text">{TRANSLATE[language as 'ru' | 'ua'].contactsHereToHelpText}</p>
        <button type="button" className="contacts-map-wrapper-info-button" onClick={handleShowModal}>
          {TRANSLATE[language as 'ru' | 'ua'].leaveRequest}
        </button>
        <div className="city-select-wrapper">
          <h3 className="city-select-title"> {TRANSLATE[language as 'ru' | 'ua'].selectYourCity}</h3>
          <div className="city-select">
            <Offices />
          </div>
        </div>
        <Fillial />
      </div>
      <MapPicker />
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

export default ContactsMain;
