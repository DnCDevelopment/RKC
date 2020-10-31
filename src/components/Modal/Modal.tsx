import React from 'react';

import Form from '../Form/Form';

import Close from '../../assets/icons/close.svg';

import { IModalProps } from './Types';

import './Modal.scss';

const Modal: React.FC<IModalProps> = ({ close, children }): JSX.Element => {
  return (
    <div className="modal-wrapper">
      <div className="modal-window-container">
        <div className="close" onClick={close}>
          <Close />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
