import React from 'react';

import Subheader from '../components/Subheader/Subheader';
import ContactsMain from '../components/ContactsMain/ContactsMain';
import MainOffice from '../components/MainOffice/MainOffice';
import ContactSteps from '../components/ContactsSteps/ContactSteps';
import Seo from '../components/SEO/SEO';

import { SEO_ITEMS } from '../constants/SEOItems';

const crumbs = [
  {
    title: 'Главная',
    link: '/',
  },
  {
    title: 'Контакты',
    link: '/contacts',
  },
];

const Contacts: React.FC = (): JSX.Element => {
  return (
    <div className="contacts-page page">
      <Seo description={SEO_ITEMS.ru.contactsPage.description} lang="ru" path="/contacts" title={SEO_ITEMS.ru.contactsPage.title} />
      <Subheader crumbs={crumbs} />
      <ContactsMain />
      <MainOffice />
      <ContactSteps />
    </div>
  );
};

export default Contacts;
