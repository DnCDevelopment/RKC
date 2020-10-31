import React from 'react';
import Stocks from '../../components/Stocks/Stocks';
import StocksBanner from '../../components/StocksBanner/StocksBanner';
import Subheader from '../../components/Subheader/Subheader';

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
    <Subheader crumbs={crumbs} />
    <StocksBanner />
    <Stocks />
  </div>
);

export default StocksPage;
