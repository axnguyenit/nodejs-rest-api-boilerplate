export function excludedFields<
  T extends Record<string, unknown>,
  K extends keyof T,
>(object: T, keys: Array<K>): Omit<T, K> {
  for (const key of keys) {
    delete object[key];
  }

  return object;
}
