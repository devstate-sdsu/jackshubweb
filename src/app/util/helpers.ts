import { HoursSet } from '../models/hours.model';

/**
 * Convert keys from Snake Case to Camel Case. For example: an_example -> anExample
 */
export function mapToCamelCase<T>(data: any): T {
  return replaceKeys<T>(data, /(_[A-Z])/gi, match => match[1].toUpperCase());
}

/**
 * Convert keys from Camel Case to Snake Case. For example: anExample -> an_example
 */
export function mapToSnakeCase<T>(data: any): T {
  return replaceKeys<T>(data, /[A-Z]/g, match => '_' + match.toLowerCase());
}

/**
 * Used to format keys.
 * @param obj Target object to perform the operation on
 * @param searchRegex Matches string to replace
 * @param replaceFn Returns what the matched string will be replaced with
 */
export function replaceKeys<T>(obj: T, searchRegex: RegExp, replaceFn: (match: string) => string) {
  return Object.keys(obj).reduce<T>((newData, key) => {
    const newKey = key.replace(searchRegex, replaceFn);
    return {
      ...newData,
      [newKey]: obj[key]
    };
  }, {} as T);
}

/**
 * Temporary time range parser. Use this until UI is improved
 * @param timeString Must be in HH:MMPM/AM - HH:MMPM/AM format. For example '4:00PM - 8:00PM'
 * To add multiple ranges, separate by commas. For example '8:00AM - 12:00PM, 4:00PM - 8:00PM'
 */
export function parseTimeRange(timeString: string): HoursSet {
  const ranges = timeString.replace(/ /g, '').split(',');
  return ranges.map(rng => {
    const times = rng.split('-');
    if (times.length > 1) return { start: times[0], end: times[1] };
    throw new Error(`format error for ${timeString}`);
  });
}

/**
 * Get keys from enum type in a string array
 */
export function extractEnumKeys(E: object): string[] {
  return Object.keys(E).filter(k => typeof E[k as any] === 'number');
}
