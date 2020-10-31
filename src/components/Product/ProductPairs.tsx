import React, { useContext } from 'react';
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import Carousel from '../Carousel/Carousel';
import ArrowSVG from '../../assets/icons/arrow.svg';
import './ProductPairs.scss';
import { IProductPairsProps } from './Types';
import { TRANSLATE } from '../../constants/languages';
import context from '../../context/context';

const ProductPairs: React.FC<IProductPairsProps> = ({
  currentProductName,
  currentProductDesciption,
  currentProductCode,
  currentProductPhoto,
  productPairs,
}): JSX.Element => {
  const { language } = useContext(context);

  return (
    <div className="product-pairs" id="pairs">
      <div className="product-pairs-wrapper">
        <h2 className="product-pairs-header">{TRANSLATE[language as 'ru' | 'ua'].productPairs}</h2>
        <Carousel infinity={false} withDots buttonNext={<ArrowSVG />} buttonPrev={<ArrowSVG />}>
          {productPairs.map(({ id, name, link, description, code, images }) => (
            <div className="product-pairs-carousel-item" key={id}>
              <div className="product-pairs-carousel-item-position">
                <Img className="product-pairs-carousel-item-position-image" fluid={currentProductPhoto} />
                <div className="product-pairs-carousel-item-position-info">
                  <h4 className="product-pairs-carousel-item-position-info-header">{currentProductName}</h4>
                  <div
                    className="product-pairs-carousel-item-position-info-text"
                    dangerouslySetInnerHTML={{ __html: currentProductDesciption }}
                  />
                  <span className="product-pairs-carousel-item-position-info-code">
                    {TRANSLATE[language as 'ru' | 'ua'].productCode} {currentProductCode}
                  </span>
                </div>
              </div>
              <div className="product-pairs-carousel-item-plus-wrapper">
                <span className="product-pairs-carousel-item-plus">+</span>
              </div>
              <div className="product-pairs-carousel-item-position">
                <Img className="product-pairs-carousel-item-position-image" fluid={images.value[0].childImageSharp.fluid} />
                <div className="product-pairs-carousel-item-position-info">
                  <Link to={link.value} className="product-pairs-carousel-item-position-info-header">
                    {name.value}
                  </Link>
                  <div className="product-pairs-carousel-item-position-info-text" dangerouslySetInnerHTML={{ __html: description.value }} />
                  <span className="product-pairs-carousel-item-position-info-code">
                    {TRANSLATE[language as 'ru' | 'ua'].productCode} {code.value}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default ProductPairs;
