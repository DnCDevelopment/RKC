export interface IAddPage {
  link: {
    value: string;
  };
  title: {
    value: string;
  };
  lang: string;
}

export interface IAddPagesQuery {
  data: {
    nodes: IAddPage[];
  };
}
