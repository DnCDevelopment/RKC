import { IBreadcrumb } from '../Breadcrumbs/Types';
import { IOffice } from '../Types';

export interface IProduct {
  price: string;
  seoImages: string[];
  url: string;
}

export interface ISeoProps {
  breadcrumbs: IBreadcrumb[];
  description: string;
  lang: 'ru' | 'ua';
  path: string;
  product?: IProduct;
  title: string;
}

export interface ISiteQueryProps {
  allCockpitOffices: {
    nodes: IOffice[];
  };
  site: {
    siteMetadata: {
      author: {
        name: string;
      };
      siteUrl: string;
    };
  };
}
