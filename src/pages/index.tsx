import React from 'react';
import Advantages from '../components/Advantages/Advantages';
import Banner from '../components/Banner/Banner';
import OrderSteps from '../components/OrderSteps/OrderSteps';
import Questions from '../components/Questions/Questions';
import InfoCarousel from '../components/InfoCarousel/InfoCarousel';
import MainStocks from '../components/MainStocks/MainStocks';

const IndexPage: React.FC = (): JSX.Element => {
  return (
    <div className="home-page">
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
