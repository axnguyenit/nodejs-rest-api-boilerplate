import { isObject, isUndefined } from './common';

const recursion = <T = unknown>(
  object: object,
  keys: Array<string>,
  index = 0,
): T => {
  if (isUndefined(object[keys[index]])) {
    throw new Error(`Undefined value with key: ${keys[index]}`);
  }

  if (!isObject(object[keys[index]]) && keys.length - 1 === index) {
    return object[keys[index]];
  }

  return recursion(object[keys[index]], keys, index + 1);
};

export const valueFromMappedUnion = <T = string | boolean>(
  object: object,
  unionKey: string,
  splittedSymbol = '.',
  index = 0,
): T => {
  if (isUndefined(unionKey)) {
    throw new Error(`Undefined value with key: ${unionKey}`);
  }

  if (!unionKey.includes('.') && isUndefined(object[unionKey])) {
    throw new Error(`Undefined value with key: ${unionKey}`);
  }

  const value = recursion<T>(object, unionKey.split(splittedSymbol), index);

  if (['false', 'true'].includes(<string>value)) {
    return <T>(value === 'true');
  }

  return value;
};
