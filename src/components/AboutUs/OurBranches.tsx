import React, { useContext } from 'react';

import StaticMap from '../../assets/illustrations/staticMap.svg';

import { OUR_BRANCHES } from '../../constants/languages';

import context from '../../context/context';

import './OurBranches.scss';

const OurBranches: React.FC = (): JSX.Element => {
  const { language } = useContext(context);

  return (
    <div className="our-branches-wrapper">
      <div className="our-branches-info">
        <h3 className="our-branches-info-title">{OUR_BRANCHES[language as 'ru' | 'ua'].title}</h3>
        {OUR_BRANCHES[language as 'ru' | 'ua'].about.map(label => (
          <p key={label} className="our-branches-info-about">
            {label}
          </p>
        ))}
      </div>
      <StaticMap />
    </div>
  );
};

export default OurBranches;
