import React from 'react';
import Close from '../../assets/icons/close.svg';
import './PhotoModal.scss';
import { IModalProps } from './Types';

const PhotoModal: React.FC<IModalProps> = ({ close, children }): JSX.Element => {
  return (
    <div className="photo-modal">
      <div className="photo-modal-bg" onClick={close} />
      <div className="photo-modal-close" onClick={close}>
        <Close />
      </div>
      <div className="photo-modal-content">{children}</div>
    </div>
  );
};

export default PhotoModal;
