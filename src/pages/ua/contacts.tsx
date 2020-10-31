import React from 'react';
import Subheader from '../../components/Subheader/Subheader';
import ContactsMain from '../../components/ContactsMain/ContactsMain';
import MainOffice from '../../components/MainOffice/MainOffice';
import ContactSteps from '../../components/ContactsSteps/ContactSteps';

const crumbs = [
  {
    title: 'Головна',
    link: '/ua/',
  },
  {
    title: 'Контакти',
    link: '/ua/contacts',
  },
];

const Contacts: React.FC = (): JSX.Element => {
  return (
    <div className="contacts-page page">
      <Subheader crumbs={crumbs} />
      <ContactsMain />
      <MainOffice />
      <ContactSteps />
    </div>
  );
};

export default Contacts;
