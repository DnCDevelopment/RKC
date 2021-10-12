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
    allCockpitProduct: IGoodsQuery;
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
  priceList: {
    value: {
      publicURL: string;
    };
  } | null;
  link: {
    value: string;
  };
  title: {
    value: string;
  };
  videoLink: {
    value: string;
  } | null;
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
    } | null;
  };
  productAvailable: {
    value: string;
  } | null;
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
  price2: {
    value: string;
  } | null;
  price3: {
    value: string;
  } | null;
  price4: {
    value: string;
  } | null;
  measurment: {
    value: string;
  };
  measurment2: {
    value: string;
  } | null;
  measurment3: {
    value: string;
  } | null;
  measurment4: {
    value: string;
  } | null;
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
    value: IProductPhoto[] | null;
  };
  productScopeText: {
    value: string;
  };
  productScopes: {
    value: IProductScope[] | null;
  };
  commonProducts: {
    value: ICommonProduct[] | null;
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
}

export interface IProductProps {
  data: {
    cockpitProduct: ICockpitProduct;
  };
}
export interface ISingleStockQuery {
  data: {
    cockpitStocks: {
      cockpitCreated: string;
      cockpitModified: string;
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
