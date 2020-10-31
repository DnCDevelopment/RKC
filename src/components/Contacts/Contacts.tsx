import React, { useContext } from 'react';

import context from '../../context/context';

import Phone from '../../assets/icons/phone.svg';
import Email from '../../assets/icons/mail.svg';
import Marker from '../../assets/icons/marker.svg';

import { IChildren } from '../Types';

import './Contacts.scss';

const Contacts: React.FC<IChildren> = ({ children }): JSX.Element => {
  const {
    office: {
      address: { value: addressValue },
      email: { value: emailValue },
      phone: { value: phoneValue },
    },
  } = useContext(context);

  return (
    <div className="contacts">
      {children}
      <a href={`tel: ${phoneValue}`} className="contacts-item">
        <Phone />
        {phoneValue}
      </a>
      <a href={`mailto:${emailValue}`} className="contacts-item">
        <Email />
        {emailValue}
      </a>
      <p className="contacts-item">
        <Marker />
        {addressValue}
      </p>
    </div>
  );
};

export default Contacts;
