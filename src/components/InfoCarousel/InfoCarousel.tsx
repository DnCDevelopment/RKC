import React, { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Carousel from '../Carousel/Carousel';
import InfoItem from './InfoItem';
import context from '../../context/context';
import { TRANSLATE } from '../../constants/languages';
import { IInfoItemsQuery } from './Types';
import './InfoCarousel.scss';

const INFO_ITEMS_QUERY = graphql`
  query queryInfoItems {
    allCockpitInfoItems {
      nodes {
        id
        lang
        name {
          value
        }
        description {
          value
        }
        svg {
          value
        }
      }
    }
  }
`;

const InfoCarousel: React.FC = (): JSX.Element => {
  const { language } = useContext(context);
  const {
    allCockpitInfoItems: { nodes },
  } = useStaticQuery<IInfoItemsQuery>(INFO_ITEMS_QUERY);
  return (
    <div className="info-carousel">
      <h2 className="info-carousel-title">{TRANSLATE[language as 'ru' | 'ua'].getInfoNow}</h2>
      <Carousel withDots>
        {nodes
          .filter(({ lang }) => lang === language)
          .map(({ id, name: { value: name }, description: { value: description }, svg: { value: svg } }) => (
            <InfoItem key={id} name={name} description={description} svg={svg} />
          ))}
      </Carousel>
    </div>
  );
};
export default InfoCarousel;
