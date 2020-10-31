/* eslint-disable react/jsx-boolean-value */
import React, { useCallback, useContext, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import Offices from '../Header/Offices';
import VacancyCard from './VacancyCard';
import CVStepsList from './CVSteps';

import { IVacanciesQuery } from './Types';

import { TRANSLATE } from '../../constants/languages';

import context from '../../context/context';

import './VacanciesMain.scss';
import Form from '../Form/Form';

const VACANCIES_QUERY = graphql`
  {
    allCockpitVacancies(filter: { lang: { ne: "any" } }) {
      nodes {
        title {
          value
        }
        description {
          value
        }
        listOfCities: city {
          value {
            city {
              value
            }
          }
        }
        lang
      }
    }
  }
`;

const VacanciesMain: React.FC = (): JSX.Element => {
  const {
    language,
    office: {
      city: { value: currentCity },
    },
  } = useContext(context);

  const {
    allCockpitVacancies: { nodes },
  }: IVacanciesQuery = useStaticQuery(VACANCIES_QUERY);

  const actualVacancies = nodes
    .filter(({ lang }) => lang === language)
    .map(({ title, description, listOfCities }) => {
      return {
        title: title.value,
        description: description.value,
        listOfCities: listOfCities.value.map(city => city.city.value),
      };
    })
    .filter(({ listOfCities }) => listOfCities.includes(currentCity));

  const [curPosition, setCurPosition] = useState('');
  const changeCurPosition = useCallback((position: string) => {
    setCurPosition(position);
  }, []);

  return (
    <div className="vacancies-wrapper">
      <div className="vacancies-header">
        <h1 className="vacancies-wrapper-info-title">{TRANSLATE[language as 'ru' | 'ua'].vacanciesTitle}</h1>
        <div className="city-select-wrapper">
          <h3 className="vacancies-wrapper-city-select">{TRANSLATE[language as 'ru' | 'ua'].citySelect}</h3>
          <Offices />
        </div>
      </div>
      <div className="vacancies-cards-container">
        {actualVacancies.map(({ title, description }) => (
          <VacancyCard key={currentCity + title} title={title} desc={description} parentCallback={changeCurPosition} />
        ))}
      </div>
      <div className="cv-steps-container">
        <CVStepsList />
        <Form
          type="yellow-form"
          title={TRANSLATE[language as 'ru' | 'ua'].formTitleProposal}
          subTitle={TRANSLATE[language as 'ru' | 'ua'].formSubtitleProposal}
          positionField={true}
          positionFieldValue={curPosition}
        />
      </div>
    </div>
  );
};

export default VacanciesMain;
