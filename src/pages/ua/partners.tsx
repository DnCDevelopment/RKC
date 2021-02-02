import React from 'react';

import OurPartners from '../../components/OurPartners/OurPartners';
import Seo from '../../components/SEO/SEO';

import { SEO_ITEMS } from '../../constants/SEOItems';
import { TRANSLATE } from '../../constants/languages';

const crumbs = [
  {
    title: 'Главная',
    link: '/ua',
  },
  {
    title: 'Наши партнеры',
    link: '/ua/partners',
  },
];

const Partners: React.FC = (): JSX.Element => (
  <div className="medium-container">
    <Seo
      breadcrumbs={crumbs}
      description={SEO_ITEMS.ua.partnersPage.description}
      lang="ua"
      path="/ua/partners"
      title={SEO_ITEMS.ua.partnersPage.title}
    />
    <h1 className="partners-title">{TRANSLATE.ua.ourPartners}</h1>
    <OurPartners />
  </div>
);

export default Partners;
