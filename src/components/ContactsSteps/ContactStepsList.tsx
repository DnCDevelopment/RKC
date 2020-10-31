/* eslint-disable max-len */
import React, { Fragment, useContext } from 'react';
import ElipsSVG from '../../assets/icons/stepElips.svg';
import { CONTACTS_STEPS } from '../../constants/languages';
import context from '../../context/context';
import './ContactStepsList.scss';

const ContactStepsList: React.FC = (): JSX.Element => {
  const { language } = useContext(context);
  return (
    <div className="contacts-steps-list">
      {CONTACTS_STEPS[language as 'ru' | 'ua'].map((text, idx) => (
        <Fragment key={text.slice(10, 20)}>
          <div className="contacts-steps-list-index">
            <ElipsSVG />
            <span>0{idx + 1}</span>
          </div>
          <div className="contacts-steps-list-text">{text}</div>
        </Fragment>
      ))}
    </div>
  );
};

export default ContactStepsList;
