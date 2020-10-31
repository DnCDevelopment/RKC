export interface IVacanciesQuery {
  allCockpitVacancies: {
    nodes: IVacancy[];
  };
}

export interface IVacancy {
  title: {
    value: string;
  };
  description: {
    value: string;
  };
  listOfCities: {
    value: ICity[];
  };
  lang: string;
}

export interface ICity {
  city: {
    value: string;
  };
}

export interface IVacancyCardProps {
  title: string;
  desc: string;
  parentCallback: (title: string) => void;
}
