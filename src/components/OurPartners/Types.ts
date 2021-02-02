import { FluidObject } from 'gatsby-image';

export interface IOurPartners {
  lang: string;
  link: {
    value: string;
  };
  logo: {
    value: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
  };
  title: {
    value: string;
  };
}

export interface IOurPartnersQuery {
  allCockpitPartners: {
    nodes: IOurPartners[];
  };
}
