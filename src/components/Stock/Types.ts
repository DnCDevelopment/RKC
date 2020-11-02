import { FluidObject } from 'gatsby-image';

import { IBreadcrumb } from '../Breadcrumbs/Types';

export interface IStockProps {
  crumbs: IBreadcrumb[];
  imgSrc: FluidObject;
  deadline: string;
  title: string;
  description: string;
  lang: string;
}
