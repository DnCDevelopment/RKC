import { ICockpitImage } from '../Types';

export interface ICatalogItemProps {
  name: string;
  link: string;
  image: ICockpitImage;
}

export interface ICatalogItem {
  id: string;
  lang: string;
  title: {
    value: string;
  };
  link: {
    value: string;
  };
  image: {
    value: ICockpitImage;
  };
}

export interface ICatalogProps {
  nodes: ICatalogItem[];
  title: string;
}

export interface ICockpitCategoriesQuery {
  allCockpitCategories: {
    nodes: ICatalogItem[];
  };
  cockpitCatalogCarousel: ICategoriesCarouselItem;
}

export interface ICockpitCategoriesCarouselQuery {
  allCockpitCatalogCarousel: {
    nodes: ICategoriesCarouselItem[];
  };
}
interface ICategoriesCarouselItem {
  id: string;
  lang: string;
  title: {
    value: string;
  };
  description: {
    value: string;
  };
  image: {
    value: ICockpitImage;
  };
}
