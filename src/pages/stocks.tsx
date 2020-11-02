import React from 'react';

import Seo from '../components/SEO/SEO';
import Stocks from '../components/Stocks/Stocks';
import Subheader from '../components/Subheader/Subheader';
import StocksBannerNew from '../components/StocksBanner/StocksBanner';

import { SEO_ITEMS } from '../constants/SEOItems';

const crumbs = [
  {
    title: 'Главная',
    link: '/',
  },
  {
    title: 'Акции и скидки',
    link: '/vacancies',
  },
];

const StocksPage = () => (
  <div className="stock-page page">
    <Seo
      breadcrumbs={crumbs}
      description={SEO_ITEMS.ru.stocksPage.description}
      lang="ru"
      path="/about"
      title={SEO_ITEMS.ru.stocksPage.title}
    />
    <Subheader crumbs={crumbs} />
    <StocksBannerNew />
    <Stocks />
  </div>
);

export default StocksPage;
