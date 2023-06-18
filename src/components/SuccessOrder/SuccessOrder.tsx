import React, { useContext } from 'react';
import { navigate } from 'gatsby';
import Success from '../../assets/icons/success.svg';

import context from '../../context/context';

import { TRANSLATE } from '../../constants/languages';

import './SuccessOrder.scss';
import Button from '../Button/Button';

const SuccessOrder = (): JSX.Element => {
  const { language } = useContext(context);

  return (
    <div className="thanks">
      <div className="thanks-icon">
        <Success />
      </div>
      {TRANSLATE[language as 'ru' | 'ua'].successOrder}
      <div className="error-button">
        <Button
          click={() => {
            navigate('/');
          }}
          height={45}
          htmlType="button"
          text={TRANSLATE[language as 'ru' | 'ua'].goToMain}
          type="primary"
          width={205}
        />
      </div>
    </div>
  );
};

export default SuccessOrder;
