import React, { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import Figure from './Figure';

import { TRANSLATE } from '../../constants/languages';

import context from '../../context/context';

import { IOrderStepsQuery } from './Types';

import './OrderSteps.scss';

const ORDERSTEPS_QUERY = graphql`
  {
    allCockpitOrderSteps(sort: { fields: number___value, order: ASC }, filter: { lang: { ne: "any" } }) {
      nodes {
        lang
        number {
          value
        }
        text {
          value
        }
        title {
          value
        }
      }
    }
  }
`;

const OrderSteps: React.FC = (): JSX.Element => {
  const {
    allCockpitOrderSteps: { nodes },
  }: IOrderStepsQuery = useStaticQuery(ORDERSTEPS_QUERY);

  const { language } = useContext(context);

  const steps = nodes.filter(({ lang }) => lang === language);

  return (
    <div className="order-steps">
      <h2>{TRANSLATE[language as 'ru' | 'ua'].orderStepsTitle}</h2>
      <p className="order-steps-description" dangerouslySetInnerHTML={{ __html: TRANSLATE[language as 'ru' | 'ua'].orderStepsText }} />
      <div className="order-steps-grid">
        {steps.map(({ number: { value: numVal }, text: { value: textVal }, title: { value: titleVal } }) => (
          <div key={numVal} className="order-steps-element">
            <Figure type={Math.floor(Math.random() * 4)} turn={Math.floor(Math.random() * 3)} />
            <h3 className="order-steps-num">{`0${numVal}`}</h3>
            <h4>{titleVal}</h4>
            <p>{textVal}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderSteps;
