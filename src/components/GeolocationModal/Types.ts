import { IOffice } from '../Types';

export interface IGeolocationModalProps {
  office: IOffice;
  offices: IOffice[];
  changeOffice: (office: IOffice) => void;
  close: () => void;
}
