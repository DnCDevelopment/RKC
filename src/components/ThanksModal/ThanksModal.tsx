import React, { useContext } from 'react';
import { createPortal } from 'react-dom';

import Modal from '../Modal/Modal';

import Success from '../../assets/icons/success.svg';
import Failed from '../../assets/icons/failed.svg';

import { IThanksModalProps } from './Types';

import context from '../../context/context';

import { TRANSLATE } from '../../constants/languages';

import './ThanksModal.scss';

const ThanksModal: React.FC<IThanksModalProps> = ({ isSuccess, showModal, handleShowModal }): JSX.Element => {
  const { language } = useContext(context);

  return (
    <>
      {showModal &&
        createPortal(
          <Modal close={() => handleShowModal(true)}>
            <div className="thanks">
              <div className="thanks-icon">{isSuccess ? <Success /> : <Failed />}</div>
              {TRANSLATE[language as 'ru' | 'ua'][isSuccess ? 'successOrder' : 'failedOrder']}
            </div>
          </Modal>,
          document.body
        )}
    </>
  );
};

export default ThanksModal;
