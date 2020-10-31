import React from 'react';
import AboutOurCompany from '../../components/AboutUs/AboutOurCompany';
import GoodsCategories from '../../components/AboutUs/GoodsCategories';
import HappyToHelp from '../../components/AboutUs/HappyToHelp';
import OurBranches from '../../components/AboutUs/OurBranches';

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
      <AboutOurCompany crumbs={crumbs} />
      <OurBranches />
      <GoodsCategories />
      <HappyToHelp />
    </div>
  );
};

export default About;
