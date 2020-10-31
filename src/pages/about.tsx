import React from 'react';

import AboutOurCompany from '../components/AboutUs/AboutOurCompany';
import GoodsCategories from '../components/AboutUs/GoodsCategories';
import HappyToHelp from '../components/AboutUs/HappyToHelp';
import Seo from '../components/SEO/SEO';
import OurBranches from '../components/AboutUs/OurBranches';

import { SEO_ITEMS } from '../constants/SEOItems';

const crumbs = [
  {
    title: 'Главная',
    link: '/',
  },
  {
    title: 'О нас',
    link: '/about',
  },
];

const About: React.FC = (): JSX.Element => {
  return (
    <div className="about-page page">
      <Seo description={SEO_ITEMS.ru.aboutPage.description} lang="ru" path="/about" title={SEO_ITEMS.ru.aboutPage.title} />
      <AboutOurCompany crumbs={crumbs} />
      <OurBranches />
      <GoodsCategories />
      <HappyToHelp />
    </div>
  );
};

export default About;
