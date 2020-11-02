import React from 'react';

import Seo from '../components/SEO/SEO';
import Subheader from '../components/Subheader/Subheader';
import VacanciesMain from '../components/Vacancies/VacanciesMain';

import { SEO_ITEMS } from '../constants/SEOItems';

const crumbs = [
  {
    title: 'Главная',
    link: '/',
  },
  {
    title: 'Вакансии',
    link: '/vacancies',
  },
];

const Contacts: React.FC = (): JSX.Element => {
  return (
    <div className="vacancies-page page">
      <Seo
        breadcrumbs={crumbs}
        description={SEO_ITEMS.ru.vacanciesPage.description}
        lang="ru"
        path="/vacancies"
        title={SEO_ITEMS.ru.aboutPage.title}
      />
      <Subheader crumbs={crumbs} />
      <VacanciesMain />
    </div>
  );
};

export default Contacts;
