export interface Service {
  docId?: string; // only set if getting from firebase
  name: string;
  image: string;
  summary: string;
  status: string;
}

