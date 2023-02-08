import type { PaginationOptions } from '../types';

export const infinityPagination = <T>(
  data: Array<T>,
  options: PaginationOptions,
) => ({
  data,
  hasNextPage: data.length === options.limit,
});
