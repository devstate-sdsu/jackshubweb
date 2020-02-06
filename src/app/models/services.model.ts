import { Hours, AllHours } from './hours.model';

export interface Service {
  docId?: string; // only set if getting from firebase
  name: string;
  image: string;
  summary: string;
  mainInfo: string;
  email: string;
  phoneNumber: string;
  hours: AllHours;
  bigLocation: string;
  tinyLocation: string;
}
