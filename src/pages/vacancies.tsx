import React from 'react';
import Subheader from '../components/Subheader/Subheader';
import VacanciesMain from '../components/Vacancies/VacanciesMain';

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
      <Subheader crumbs={crumbs} />
      <VacanciesMain />
    </div>
  );
};

export default Contacts;
