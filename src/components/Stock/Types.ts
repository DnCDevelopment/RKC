import { FluidObject } from 'gatsby-image';

export interface IStockProps {
  imgSrc: FluidObject;
  deadline: string;
  link: string;
  title: string;
  description: string;
  lang: string;
}
