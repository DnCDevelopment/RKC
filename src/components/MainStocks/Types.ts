import { ICockpitProduct } from '../../templates/Types';

export interface IProductsWithStocksQuery {
  allCockpitProduct: {
    nodes: ICockpitProduct[];
  };
}
