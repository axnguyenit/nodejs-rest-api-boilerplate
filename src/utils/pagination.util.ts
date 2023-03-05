import type { PaginationOptions } from '~/types';

import { excludedFields } from './prisma.util';

export const infinityPagination = <
  T extends Record<string, unknown>,
  K extends keyof T,
>(
  data: Array<T>,
  options: PaginationOptions,
  keys: Array<K>,
) => {
  const filledData = data.map((e) => excludedFields<T, K>(e, keys));

  return {
    data: filledData,
    hasNextPage: data.length === options.limit,
  };
};
