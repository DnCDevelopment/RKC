import React from 'react';
import Stocks from '../components/Stocks/Stocks';
import Subheader from '../components/Subheader/Subheader';
import StocksBannerNew from '../components/StocksBanner/StocksBanner';

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
    <Subheader crumbs={crumbs} />
    <StocksBannerNew />
    <Stocks />
  </div>
);

export default StocksPage;
