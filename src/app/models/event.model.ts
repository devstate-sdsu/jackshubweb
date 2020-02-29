export const collectionName = 'eventsCol';

export interface JacksEvent {
  name: string;
  bigLocation: string;
  tinyLocation: string;
  description: string;
  summary: string;
  image: string;
  startTime: Date;
  endTime: Date;
  timeUpdated: Date;
  updates: string;
  tags: Array<string>;
}
