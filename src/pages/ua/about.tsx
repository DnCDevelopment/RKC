import React from 'react';

import AboutOurCompany from '../../components/AboutUs/AboutOurCompany';
import GoodsCategories from '../../components/AboutUs/GoodsCategories';
import HappyToHelp from '../../components/AboutUs/HappyToHelp';
import OurBranches from '../../components/AboutUs/OurBranches';
import Seo from '../../components/SEO/SEO';

import { SEO_ITEMS } from '../../constants/SEOItems';

const crumbs = [
  {
    title: 'Головна',
    link: '/ua',
  },
  {
    title: 'Про нас',
    link: '/ua/about',
  },
];

const About: React.FC = (): JSX.Element => {
  return (
    <div className="about-page page">
      <Seo
        breadcrumbs={crumbs}
        description={SEO_ITEMS.ua.aboutPage.description}
        lang="ua"
        path="/ua/about"
        title={SEO_ITEMS.ua.aboutPage.title}
      />
      <AboutOurCompany crumbs={crumbs} />
      <OurBranches />
      <GoodsCategories />
      <HappyToHelp />
    </div>
  );
};

export default About;
