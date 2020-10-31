import React from 'react';

import Seo from '../../components/SEO/SEO';
import Stocks from '../../components/Stocks/Stocks';
import StocksBanner from '../../components/StocksBanner/StocksBanner';
import Subheader from '../../components/Subheader/Subheader';

import { SEO_ITEMS } from '../../constants/SEOItems';

const crumbs = [
  {
    title: 'Головна',
    link: '/',
  },
  {
    title: 'Акції та знижки',
    link: '/vacancies',
  },
];

const StocksPage = () => (
  <div className="stock-page page">
    <Seo description={SEO_ITEMS.ua.stocksPage.description} lang="ua" path="/ua/about" title={SEO_ITEMS.ua.stocksPage.title} />
    <Subheader crumbs={crumbs} />
    <StocksBanner />
    <Stocks />
  </div>
);

export default StocksPage;
