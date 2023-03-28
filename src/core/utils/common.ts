/* eslint-disable @typescript-eslint/no-explicit-any */
export const typeOf = (value: any) =>
  Object.prototype.toString
    .call(value)
    .match(/\s([A-Za-z]+)/)?.[1]
    .toLowerCase();

// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = (x: any): x is Function => typeOf(x) === 'function';

export const isObject = (k: any): k is object => typeOf(k) === 'object';

export const isString = (k: any): k is string => typeOf(k) === 'string';

export const isNumber = (k: any): k is number => typeOf(k) === 'number';

export const isArray = (k: any): k is Array<any> => typeOf(k) === 'array';

export const isUndefined = (k: any): k is undefined =>
  typeOf(k) === 'undefined';

export const isNull = (k: any): k is null => typeOf(k) === 'null';

export const noop = () => {
  /* do nothing */
};
