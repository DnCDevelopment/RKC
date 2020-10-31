import { FluidObject } from 'gatsby-image';

export interface IStocksQuery {
  allCockpitStocks: {
    nodes: IStock[];
  };
}

export interface IStock {
  id: string;
  title: {
    value: string;
  };
  description: {
    value: string;
  };
  link: {
    value: string;
  };
  banner: {
    value: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
  };
  picture: {
    value: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
  };
  deadline: {
    value: string;
  };
  lang: string;
  cockpitId: string;
}

export interface IStockCardProps {
  dl: string;
  link: string;
  title: string;
  desc: string;
  pic: FluidObject;
  id: string;
}
