import React from 'react';

import Advantages from '../../components/Advantages/Advantages';
import Banner from '../../components/Banner/Banner';
import OrderSteps from '../../components/OrderSteps/OrderSteps';
import Seo from '../../components/SEO/SEO';
import Questions from '../../components/Questions/Questions';
import MainStocks from '../../components/MainStocks/MainStocks';
import InfoCarousel from '../../components/InfoCarousel/InfoCarousel';

import { SEO_ITEMS } from '../../constants/SEOItems';

const IndexPage: React.FC = (): JSX.Element => {
  return (
    <div className="home-page">
      <Seo
        breadcrumbs={[
          {
            title: 'Головна',
            link: '/ua',
          },
        ]}
        description={SEO_ITEMS.ua.indexPage.description}
        lang="ua"
        path="/ua"
        title={SEO_ITEMS.ua.indexPage.title}
      />
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
