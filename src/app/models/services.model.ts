import { Hours } from './hours.model';

export interface Service {
  docId?: string; // only set if getting from firebase
  name: string;
  image: string;
  summary: string;
  mainInfo: string;
  email: string;
  phoneNumber: string;
  hours: Hours;
  bigLocation: string;
  tinyLocation: string;
}
