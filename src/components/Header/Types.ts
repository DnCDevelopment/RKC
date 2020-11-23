export interface ICatalogProps {
  isMobile?: boolean;
}

export interface ICategoriesProps {
  isActive: boolean;
  link: string | undefined;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  setCategory: React.Dispatch<React.SetStateAction<ISubCategory>>;
}

export interface ISubCategory {
  subCategory: string;
  index: number;
}

export interface ISubCategoriesProps {
  index: number;
  isActive: boolean;
  category: string;
  setSubCategory?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export interface IMenu {
  lang: string;
  link: {
    value: string;
  };
  title: {
    value: string;
  };
}

export interface IMenuQuery {
  allCockpitMenu: {
    nodes: IMenu[];
  };
}

export interface IMobileHeaderProps {
  isMenuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IMenuProps {
  isMenuOpen: boolean;
}

export interface INavBtnProps extends IMobileHeaderProps {}
