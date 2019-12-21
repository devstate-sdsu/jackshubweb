export function mapToCamelCase<T>(data: any): T {
  return replaceKeys(data, /(_[A-Z])/gi, match => match[1].toUpperCase());
}

export function mapToSnakeCase<T>(data: T): T {
  return replaceKeys(data, /[A-Z]/g, match => '_' + match.toLowerCase());
}

export function replaceKeys<T>(data: T, searchRegex: RegExp, replaceFn: (match: string) => string) {
  return Object.keys(data).reduce<T>((newData, key) => {
    const newKey = key.replace(searchRegex, replaceFn);
    return {
      ...newData,
      [newKey]: data[key]
    };
  }, {} as T);
}
