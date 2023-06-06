import React from 'react';

import Close from '../../assets/icons/close.svg';

import { IModalProps } from './Types';

import './Modal.scss';

const Modal: React.FC<IModalProps> = ({ close, children }): JSX.Element => {
  return (
    <div className="modal-wrapper">
      <div className="modal-window-container">
        <div className="header">
          <button className="header__button" type="button" onClick={close}>
            <Close />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
