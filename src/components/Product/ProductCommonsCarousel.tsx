import React from 'react';
import ProductCommonItem from './ProductCommonItem';
import Carousel from '../Carousel/Carousel';
import ArrowSVG from '../../assets/icons/arrow.svg';
import { IProductCommonsCarousel } from './Types';

const ProductCommonsCarousel: React.FC<IProductCommonsCarousel> = ({ chunkedProducts }): JSX.Element => {
  return (
    <Carousel withDots infinity={false} buttonPrev={<ArrowSVG />} buttonNext={<ArrowSVG />}>
      {chunkedProducts.map(product => (
        <div key={product[0].id} className="product-common-carousel-item">
          {product.map(({ id, name: { value: name }, link: { value: link }, images: { value: images } }) => (
            <ProductCommonItem key={id} name={name} link={link} image={images[0]} />
          ))}
        </div>
      ))}
    </Carousel>
  );
};

export default ProductCommonsCarousel;
