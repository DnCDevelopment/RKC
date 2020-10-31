import React from 'react';

import Seo from '../../components/SEO/SEO';
import Subheader from '../../components/Subheader/Subheader';
import VacanciesMain from '../../components/Vacancies/VacanciesMain';

import { SEO_ITEMS } from '../../constants/SEOItems';

const crumbs = [
  {
    title: 'Головна',
    link: '/ua',
  },
  {
    title: 'Вакансії',
    link: '/ua/vacancies',
  },
];

const Contacts: React.FC = (): JSX.Element => {
  return (
    <div className="vacancies-page page">
      <Seo description={SEO_ITEMS.ua.vacanciesPage.description} lang="ua" path="/ua/vacancies" title={SEO_ITEMS.ua.aboutPage.title} />
      <Subheader crumbs={crumbs} />
      <VacanciesMain />
    </div>
  );
};

export default Contacts;
