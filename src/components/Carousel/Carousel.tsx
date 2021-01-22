/* eslint-disable react/no-array-index-key */
import React, { useState, useRef, useLayoutEffect } from 'react';
import { ICarousel } from './Types';
import './Carousel.scss';

const TRANSITION = 200;

const Carousel: React.FC<ICarousel> = ({
  children,
  infinity = true,
  buttonPrev,
  buttonNext,
  withRange,
  withDots,
  callback = () => {},
}): JSX.Element => {
  const carousel = useRef<HTMLDivElement>();
  const [slide, setSlide] = useState(0);

  const handleNextSlide = () => {
    if (slide + 1 < children.length) setSlide(slide + 1);
    else if (infinity) {
      setSlide(slide + 1);
      setTimeout(() => {
        carousel.current.style.transition = 'none';
        setSlide(0);
        setTimeout(() => {
          carousel.current.style.transition = `transform ${TRANSITION}ms`;
        }, 10);
      }, 200);
    }
  };

  const handlePrevSlide = () => {
    if (slide - 1 >= 0) {
      setSlide(slide - 1);
    } else if (infinity) {
      setSlide(slide - 1);
      setTimeout(() => {
        carousel.current.style.transition = 'none';
        setSlide(children.length - 1);
        setTimeout(() => {
          carousel.current.style.transition = `transform ${TRANSITION}ms`;
        }, 10);
      }, 200);
    }
  };

  const handleTouch = () => {
    let startX = 0;
    let startY = 0;
    const handleTouchStart: EventListener = event => {
      const e = event as TouchEvent;
      const { screenX, screenY } = e.touches[0];
      startX = screenX;
      startY = screenY;
      carousel.current.style.transition = 'none';
    };

    const handleTouchMove: EventListener = event => {
      const e = event as TouchEvent;
      const { screenX, screenY } = e.changedTouches[0];

      const { offsetWidth } = carousel.current;
      const delta = screenX - startX;
      if (infinity || (!(slide === children.length - 1 && delta < 0) && !(slide === 0 && delta > 0)))
        carousel.current.style.transform = `translateX(${-offsetWidth * (slide + +infinity * children.length) + delta}px)`;
    };

    const handleTouchEnd: EventListener = event => {
      const e = event as TouchEvent;
      const { screenX } = e.changedTouches[0];
      const delta = screenX - startX;
      carousel.current.style.transition = `transform ${TRANSITION}ms`;
      if (delta < -40) handleNextSlide();
      else if (delta > 40) handlePrevSlide();
      else carousel.current.style.transform = `translateX(-${100 * (slide + +infinity * children.length)}%)`;
    };
    const items = document.querySelectorAll('.carousel-list-item');
    items.forEach(el => {
      el.addEventListener('touchstart', handleTouchStart, { passive: true });
      el.addEventListener('touchmove', handleTouchMove, { passive: false });
      el.addEventListener('touchend', handleTouchEnd, { passive: true });
    });

    return () => {
      items.forEach(el => {
        el.removeEventListener('touchstart', handleTouchStart);
        el.removeEventListener('touchmove', handleTouchMove);
        el.removeEventListener('touchend', handleTouchEnd);
      });
    };
  };

  useLayoutEffect(() => {
    carousel.current.style.transform = `translateX(-${100 * (slide + +infinity * children.length)}%)`;
    const touchcleanUp = handleTouch();
    callback(slide);
    return () => {
      touchcleanUp();
    };
  }, [slide]);

  return (
    <div className="carousel">
      <div
        className="carousel-list"
        ref={carousel}
        style={{
          transition: `transform ${TRANSITION}ms`,
        }}
      >
        {infinity &&
          children.map((child, idx) => (
            <div key={idx} className="carousel-list-item">
              {child}
            </div>
          ))}
        {children.map((child, idx) => (
          <div key={idx} className={`carousel-list-item ${idx === slide ? 'carousel-list-item-current' : ''}`}>
            {child}
          </div>
        ))}
        {infinity &&
          children.map((child, idx) => (
            <div key={idx} className="carousel-list-item">
              {child}
            </div>
          ))}
      </div>
      <div className="carousel-buttons">
        <div className="carousel-buttons-prev" onClick={handlePrevSlide}>
          {buttonPrev}
        </div>
        <div className="carousel-buttons-next" onClick={handleNextSlide}>
          {buttonNext}
        </div>
      </div>
      {withRange && (
        <div className="carousel-range">
          <span className="carousel-range-number">01</span>
          <input
            className="carousel-range-input"
            value={slide}
            type="range"
            min="0"
            max={children.length - 1}
            step="1"
            onChange={({ target: { value } }) => {
              setSlide(+value);
            }}
          />
          <span className="carousel-range-number">{`${children.length < 10 ? 0 : ''}${children.length}`}</span>
        </div>
      )}
      {withDots && (
        <div className="carousel-dots">
          {children.map((_, idx) => (
            <div
              key={idx}
              className={`carousel-dots-item ${idx === slide ? 'carousel-dots-item-current' : ''}`}
              onClick={() => setSlide(idx)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
