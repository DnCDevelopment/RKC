import { IBreadcrumb } from '../Breadcrumbs/Types';
import { IOffice } from '../Types';

export interface ISeoProps {
  breadcrumbs: IBreadcrumb[];
  description: string;
  lang: 'ru' | 'ua';
  path: string;
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
