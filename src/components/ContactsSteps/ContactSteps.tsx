import React, { useContext } from 'react';
import ContactStepsList from './ContactStepsList';
import ContactStepsForm from './ContactStepsForm';
import './ContactSteps.scss';
import context from '../../context/context';
import { TRANSLATE } from '../../constants/languages';

const ContactSteps: React.FC = (): JSX.Element => {
  const { language } = useContext(context);
  return (
    <div className="contacts-steps-wrapper">
      <h3 className="contacts-steps-title">{TRANSLATE[language as 'ru' | 'ua'].orderSteps}</h3>
      <ContactStepsList />
      <ContactStepsForm />
    </div>
  );
};

export default ContactSteps;
