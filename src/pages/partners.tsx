import React from 'react';

import OurPartners from '../components/OurPartners/OurPartners';
import Seo from '../components/SEO/SEO';

import { SEO_ITEMS } from '../constants/SEOItems';
import { TRANSLATE } from '../constants/languages';

const crumbs = [
  {
    title: 'Главная',
    link: '/',
  },
  {
    title: 'Наши партнеры',
    link: '/partners',
  },
];

const Partners: React.FC = (): JSX.Element => (
  <div className="medium-container">
    <Seo
      breadcrumbs={crumbs}
      description={SEO_ITEMS.ru.partnersPage.description}
      lang="ru"
      path="/partners"
      title={SEO_ITEMS.ru.partnersPage.title}
    />
    <h1 className="partners-title">{TRANSLATE.ru.ourPartners}</h1>
    <OurPartners />
  </div>
);

export default Partners;
