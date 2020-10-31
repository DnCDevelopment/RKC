import React, { useContext } from 'react';

import Button from '../Button/Button';

import { IVacancyCardProps } from './Types';

import { TRANSLATE } from '../../constants/languages';

import context from '../../context/context';

import './VacancyCard.scss';

const VacancyCard: React.FC<IVacancyCardProps> = ({ title, desc, parentCallback }): JSX.Element => {
  const { language } = useContext(context);

  return (
    <div className="vacancy-card">
      <h3 className="card-info-title">{title}</h3>
      <p className="card-info-desc">{desc}</p>
      <Button
        click={() => parentCallback(title)}
        height={50}
        htmlType="button"
        text={TRANSLATE[language as 'ru' | 'ua'].leaveRequest}
        type="primary"
        width={250}
      />
    </div>
  );
};

export default VacancyCard;
