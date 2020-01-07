export interface Hours {
  name: string;
  trigger?: SDateRange;
  days: Day[];
}

export interface Day {
  day: SDate;
  hours: HoursSet;
}

export interface SDateRange {
  start: SDate;
  end: SDate;
}

export type SDate = string | Date;
export type HoursSet = SDateRange[];
