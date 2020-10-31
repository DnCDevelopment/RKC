import React, { useContext } from 'react';

import Button from '../Button/Button';

import Roller from '../../assets/illustrations/roller.svg';

import { TRANSLATE } from '../../constants/languages';

import context from '../../context/context';

import './NotFound.scss';

const NotFound: React.FC = (): JSX.Element => {
  const { language } = useContext(context);

  return (
    <div className="e404">
      <div className="painting">
        <Roller />
        <div className="e404text-container">
          <div className="e404text">
            <p>Ой</p>
            <h6>404</h6>
            <div className="divider" />
            <p>{TRANSLATE[language as 'ru' | 'ua'].error}</p>
          </div>
        </div>
      </div>
      <div className="info">
        <h2>{TRANSLATE[language as 'ru' | 'ua'].e404Title}</h2>
        <p>{TRANSLATE[language as 'ru' | 'ua'].e404Text}</p>
        <Button
          click={undefined}
          height={50}
          htmlType="button"
          text={TRANSLATE[language as 'ru' | 'ua'].returnToHome}
          type="primary"
          width={300}
        />
      </div>
    </div>
  );
};

export default NotFound;
