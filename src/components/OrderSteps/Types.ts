export interface IOrderStepsQuery {
  allCockpitOrderSteps: {
    nodes: IOrderSteps[];
  };
}

export interface IOrderSteps {
  lang: string;
  number: {
    value: number;
  };
  text: {
    value: string;
  };
  title: {
    value: string;
  };
}

export interface IFigure {
  type: number;
  turn: number;
}
