import React, { useContext } from 'react';

import { TRANSLATE } from '../../constants/languages';

import context from '../../context/context';

import Form from '../Form/Form';

import './Questions.scss';

const Questions: React.FC = (): JSX.Element => {
  const { language } = useContext(context);

  return (
    <div className="questions-container">
      <div className="questions-content-container">
        <div className="questions-info">
          <h2>{TRANSLATE[language as 'ru' | 'ua'].questionsTitle}</h2>
          <p dangerouslySetInnerHTML={{ __html: TRANSLATE[language as 'ru' | 'ua'].questionsText }} />
        </div>
        <div className="form-container">
          <Form dataLayerEvent="sendform" />
        </div>
      </div>
      <div className="arc-container">
        <div className="arc" />
      </div>
    </div>
  );
};

export default Questions;
