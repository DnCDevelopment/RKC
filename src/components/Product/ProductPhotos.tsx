import React, { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import Img from 'gatsby-image';
import { IProductPhotosProps } from './Types';
import './ProductPhotos.scss';
import PhotoModal from '../Modal/PhotoModal';

const ProductPhotos: React.FC<IProductPhotosProps> = ({ images }): JSX.Element => {
  const [currentPhoto, changePhoto] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleShowModal = useCallback(() => {
    setShowModal(prev => !prev);
    document.body.classList.toggle('fixed');
  }, [showModal]);

  return (
    <>
      <div className="product-photos">
        <div className="product-photos-feed-wrapper">
          <div className="product-photos-feed">
            {images.map(({ childImageSharp: { fluid }, id }, idx) => (
              <div
                key={id}
                className="product-photos-feed-item"
                onClick={() => {
                  changePhoto(idx);
                }}
              >
                <Img fluid={fluid} />
              </div>
            ))}
          </div>
        </div>
        <div onClick={handleShowModal}>
          <Img fluid={images[currentPhoto].childImageSharp.fluid} imgStyle={{ objectFit: 'contain' }} />
        </div>
      </div>
      {showModal &&
        createPortal(
          <PhotoModal close={handleShowModal}>
            <img src={images[currentPhoto].childImageSharp.fluid.src} alt="modal" />
          </PhotoModal>,
          document.body
        )}
    </>
  );
};

export default ProductPhotos;
