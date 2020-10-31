import React, { useContext } from 'react';

import SocialIcons from '../SocialIcons/SocialIcons';

import { TRANSLATE } from '../../constants/languages';

import context from '../../context/context';

import './Subscribe.scss';

const Subscribe: React.FC = (): JSX.Element => {
  const { language } = useContext(context);

  return (
    <div className="subscribe">
      <h2>{TRANSLATE[language as 'ru' | 'ua'].subscribe}</h2>
      <SocialIcons />
    </div>
  );
};

export default Subscribe;
