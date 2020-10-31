import React, { useContext } from 'react';

import Phone from '../../assets/icons/phone.svg';

import { TRANSLATE } from '../../constants/languages';

import context from '../../context/context';

import './ConnectWithUs.scss';

const ConnectWithUs: React.FC = (): JSX.Element => {
  const {
    language,
    office: {
      phone: { value: phoneValue },
    },
  } = useContext(context);

  return (
    <div className="connect-with-us">
      <a className="connect-with-us-link" href={`tel:${phoneValue}`}>
        <div className="icon">
          <Phone />
        </div>
        <h2>{TRANSLATE[language as 'ru' | 'ua'].connectwithus}</h2>
      </a>
    </div>
  );
};

export default ConnectWithUs;
