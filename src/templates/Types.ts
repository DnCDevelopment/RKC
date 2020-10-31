import { ICatalogItem } from '../components/Catalog/Types';
import { ICockpitImage, IGoods } from '../components/Types';
import { ICommonProduct, IProductPhoto, IProductScope, IProductPair } from '../components/Product/Types';

export interface ICategoriesProps {
  data: {
    allCockpitSubCategories: {
      nodes: ICatalogItem[];
    };
    cockpitCategories: ISubCategoriesQuery;
  };
}

export interface IGoodsQuery {
  nodes: IGoods[];
}

export interface ISubCategoriesProps {
  data: {
    allCockpitSubSubCategories: { nodes: ISubSubCategoriesQuery[] };
    cockpitSubCategories: ISubCategoriesQuery;
  };
}

export interface ISubCategoriesQuery {
  category: {
    value: {
      link: {
        value: string;
      };
      title: {
        value: string;
      };
    };
  };
  description: {
    value: string;
  };
  image: {
    value: ICockpitImage;
  };
  lang: string;
  link: {
    value: string;
  };
  title: {
    value: string;
  };
}

export interface ICockpitProduct {
  id: string;
  lang: string;
  stock: {
    value: string;
  };
  specifications: {
    value: {
      data: {
        [key: string]: string;
      };
    };
  };
  name: {
    value: string;
  };
  description: {
    value: string;
  };
  link: {
    value: string;
  };
  price: {
    value: string;
  };
  images: {
    value: IProductPhoto[];
  };
  galleryTitle: {
    value: string;
  };
  galleryBackground: {
    value: ICockpitImage;
  };
  galleryText: {
    value: string;
  };
  galleryImages: {
    value: IProductPhoto[];
  };
  productScopeText: {
    value: string;
  };
  productScopes: {
    value: IProductScope[];
  };
  commonProducts: {
    value: ICommonProduct[];
  };
  productPairs: { value: IProductPair[] };
  code: {
    value: string;
  };
  subcategory: {
    value: {
      title: {
        value: string;
      };
      link: {
        value: string;
      };
      subCategory: {
        value: {
          title: {
            value: string;
          };
          link: {
            value: string;
          };
          category: {
            value: {
              title: {
                value: string;
              };
              link: {
                value: string;
              };
            };
          };
        };
      };
    };
  };
}

export interface IProductProps {
  data: {
    cockpitProduct: ICockpitProduct;
  };
}
export interface ISingleStockQuery {
  data: {
    cockpitStocks: {
      title: {
        value: string;
      };
      description: {
        value: string;
      };
      link: {
        value: string;
      };
      picture: {
        value: ICockpitImage;
      };
      deadline: {
        value: string;
      };
      lang: string;
    };
  };
}

export interface ISubSubCategoriesProps {
  data: {
    allCockpitProduct: IGoodsQuery;
    cockpitSubSubCategories: ISubSubCategoriesQuery;
  };
}

export interface ISubSubCategoriesQuery {
  id: string;
  lang: string;
  subCategory: {
    value: {
      link: {
        value: string;
      };
      title: {
        value: string;
      };
      category: {
        value: {
          link: {
            value: string;
          };
          title: {
            value: string;
          };
        };
      };
    };
  };
  description: {
    value: string;
  };
  image: {
    value: ICockpitImage;
  };
  link: {
    value: string;
  };
  title: {
    value: string;
  };
}
