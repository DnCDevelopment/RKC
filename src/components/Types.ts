import { FluidObject } from 'gatsby-image';

export interface IChildren {
  children?: React.ReactNode;
}

export interface ICategory {
  lang: string;
  link: {
    value: string;
  };
  title: {
    value: string;
  };
}

export interface ICategoryQuery {
  allCockpitCategories: {
    nodes: ICategory[];
  };
}

export interface IContext {
  language: string;
  office: IOffice;
  offices: IOffice[];
  pathname: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  setOffice: React.Dispatch<React.SetStateAction<IOffice>>;
}

export interface IGoods {
  category: IGoodsCategory[];
  image: {
    value: ICockpitImage;
  };
  link: {
    value: string;
  };
  price: {
    value: string;
  };
  name: {
    value: string;
  };
}

export interface IGoodsCategory {
  value: {
    title: {
      value: string;
    }[];
  };
}

export interface IGoodsQuery {
  allCockpitGoods: {
    nodes: IGoods[];
  };
}

export interface ICockpitImage {
  childImageSharp: {
    fluid: FluidObject;
  };
}

export interface ILayoutProps extends IChildren {
  location: {
    pathname: string;
  };
}

export interface IOffice {
  id: string;
  address: {
    value: string;
  };
  city: {
    value: string;
  };
  email: {
    value: string;
  };
  lang: string;
  phone: {
    value: string;
  };
}

export interface IOfficeQuery {
  allCockpitOffices: {
    nodes: IOffice[];
  };
}

export interface ISubCategories {
  lang: string;
  link: {
    value: string;
  };
  title: {
    value: string;
  };
  category: {
    value: ICategory;
  };
}
export interface ISubSubCategories {
  lang: string;
  link: {
    value: string;
  };
  title: {
    value: string;
  };
  subCategory: {
    value: ICategory;
  };
}

export interface ISubCategoriesQuery {
  allCockpitSubCategories: {
    nodes: ISubCategories[];
  };
}
export interface ISubSubCategoriesQuery {
  allCockpitSubSubCategories: {
    nodes: ISubSubCategories[];
  };
}

export interface ITextField {
  value: string;
  isTouched: boolean;
  regexp: RegExp;
  valid: boolean;
}

export interface IAction {
  type?: string;
  name: string;
  value?: string;
  checked?: boolean;
}
