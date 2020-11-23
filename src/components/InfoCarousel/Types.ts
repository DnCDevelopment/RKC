export interface IInfoItemsQuery {
  allCockpitInfoItems: {
    nodes: IInfoItem[];
  };
}

interface IInfoItem {
  id: string;
  lang: string;
  link: {
    value: string;
  };
  name: {
    value: string;
  };
  description: {
    value: string;
  };
  svg: {
    value: string;
  };
}

export interface IInfoItemProps {
  link: string;
  name: string;
  description: string;
  svg: string;
}
