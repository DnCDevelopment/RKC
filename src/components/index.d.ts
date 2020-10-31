declare module '*.jpg';

declare module 'react-grid-carousel' {
  interface ICarouselProps {
    rows: number;
    cols: number;
    children: React.ReactNode[];
  }
  interface IItemProps {
    children: React.ReactNode | React.ReactNode[];
  }

  const Carousel: React.FC<ICarouselProps>;
  export const Item: React.FC<IItemProps>;
  export default Carousel;
}
