import React from 'react';
import Img from 'gatsby-image';
import Carousel from '../Carousel/Carousel';
import ArrowSVG from '../../assets/icons/arrow.svg';
import { IProductGalleryCarouselProps } from './Types';

const ProductGalleryCarousel: React.FC<IProductGalleryCarouselProps> = ({ images }): JSX.Element => {
  return (
    <div className="product-gallery-carousel">
      <Carousel withDots buttonPrev={<ArrowSVG />} buttonNext={<ArrowSVG />}>
        {images.map(({ childImageSharp: { fluid } }, idx) => (
          <Img key={idx} className="product-gallery-carousel-item" fluid={fluid} />
        ))}
      </Carousel>
    </div>
  );
};

export default ProductGalleryCarousel;
