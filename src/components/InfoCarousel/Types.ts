export interface IInfoItemsQuery {
  allCockpitInfoItems: {
    nodes: IInfoItem[];
  };
}

interface IInfoItem {
  id: string;
  lang: string;
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
  name: string;
  description: string;
  svg: string;
}
