import { ITextField } from '../Types';

export interface IInitialState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  name: ITextField;
  phone: ITextField;
  email: ITextField;
  agree: {
    value: boolean;
  };
}
