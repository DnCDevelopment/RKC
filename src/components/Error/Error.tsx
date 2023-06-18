import React, { useContext } from 'react';
import { navigate } from 'gatsby';
import Failed from '../../assets/icons/failed.svg';

import context from '../../context/context';

import { TRANSLATE } from '../../constants/languages';

import './Error.scss';
import Button from '../Button/Button';

const Error = (): JSX.Element => {
  const { language } = useContext(context);

  return (
    <div className="error">
      <div className="error-icon">
        <Failed />
      </div>
      {TRANSLATE[language as 'ru' | 'ua'].failedOrder}
      <div className="error-button">
        <Button
          click={() => {
            navigate(-1);
          }}
          height={45}
          htmlType="button"
          text={TRANSLATE[language as 'ru' | 'ua'].goBack}
          type="primary"
          width={205}
        />
      </div>
    </div>
  );
};

export default Error;
