import React from 'react';
import Img from 'gatsby-image';
import Carousel from '../Carousel/Carousel';
import { IProductGalleryCarouselProps } from './Types';

const ProductGalleryCarousel: React.FC<IProductGalleryCarouselProps> = ({ images }): JSX.Element => {
  return (
    <div className="product-gallery-carousel">
      <Carousel withDots>
        {images.map(({ childImageSharp: { fluid } }, idx) => (
          <Img key={idx} className="product-gallery-carousel-item" fluid={fluid} />
        ))}
      </Carousel>
    </div>
  );
};

export default ProductGalleryCarousel;
