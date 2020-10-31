import React, { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import Carousel from '../Carousel/Carousel';
import context from '../../context/context';
import { ICockpitCategoriesCarouselQuery } from './Types';
import './CatalogCarousel.scss';

const CATALOG_CAROUSEL_QUERY = graphql`
  query catalogCarouselQuery {
    allCockpitCatalogCarousel(filter: { lang: { ne: "any" } }) {
      nodes {
        id
        lang
        title {
          value
        }
        description {
          value
        }
        image {
          value {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;

const CatalogCarousel: React.FC = (): JSX.Element => {
  const {
    allCockpitCatalogCarousel: { nodes },
  } = useStaticQuery<ICockpitCategoriesCarouselQuery>(CATALOG_CAROUSEL_QUERY);
  const { language } = useContext(context);
  return (
    <div className="catalog-carousel-wrapper">
      <Carousel withDots infinity={false}>
        {nodes
          .filter(({ lang }) => lang === language)
          .map(({ id, title: { value: title }, description: { value: description }, image: { value: { childImageSharp: { fluid } } } }) => (
            <BackgroundImage key={id} Tag="div" className="catalog-carousel-item-wrapper" fluid={fluid}>
              <div className="catalog-carousel-item">
                <h2 className="catalog-carousel-item-title">{title}</h2>
                <div className="catalog-carousel-item-text" dangerouslySetInnerHTML={{ __html: description }} />
              </div>
            </BackgroundImage>
          ))}
      </Carousel>
    </div>
  );
};

export default CatalogCarousel;
