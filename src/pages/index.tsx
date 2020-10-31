import React from 'react';

import Advantages from '../components/Advantages/Advantages';
import Banner from '../components/Banner/Banner';
import OrderSteps from '../components/OrderSteps/OrderSteps';
import Questions from '../components/Questions/Questions';
import Seo from '../components/SEO/SEO';
import InfoCarousel from '../components/InfoCarousel/InfoCarousel';
import MainStocks from '../components/MainStocks/MainStocks';

import { SEO_ITEMS } from '../constants/SEOItems';

const IndexPage: React.FC = (): JSX.Element => {
  return (
    <div className="home-page">
      <Seo description={SEO_ITEMS.ru.indexPage.description} lang="ru" path="/" title={SEO_ITEMS.ru.indexPage.title} />
      <Banner />
      <InfoCarousel />
      <Advantages />
      <OrderSteps />
      <MainStocks />
      <Questions />
    </div>
  );
};

export default IndexPage;
