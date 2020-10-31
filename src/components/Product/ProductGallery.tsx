import React, { useContext } from 'react';
import BackgroundImage from 'gatsby-background-image';
import ProductGalleryCarousel from './ProductGalleryCarousel';
import context from '../../context/context';
import { IProductGalleryProps } from './Types';
import { TRANSLATE } from '../../constants/languages';
import './ProductGallery.scss';

const ProductGallery: React.FC<IProductGalleryProps> = ({
  title,
  description,
  background: {
    childImageSharp: { fluid },
  },
  images,
}): JSX.Element => {
  const { language } = useContext(context);
  return (
    <>
      <div className="product-gallery" id="gallery">
        <h2 className="product-gallery-title">{TRANSLATE[language as 'ru' | 'ua'].productGallery}</h2>
        <BackgroundImage fluid={fluid} className="product-gallery-banner">
          <div className="product-gallery-banner-wrapper">
            <h3 className="product-gallery-banner-title">{title}</h3>
            <div className="product-gallery-banner-text" dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        </BackgroundImage>
      </div>
      <ProductGalleryCarousel images={images} />
    </>
  );
};

export default ProductGallery;
