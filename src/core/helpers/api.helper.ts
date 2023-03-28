import type { BaseEntity, Pagination, PaginationOptions } from '~/core';

export class ApiHelper {
  static parsePagination = (
    options: PaginationOptions,
    maxLimit = 50,
  ): Pagination => {
    let limit = options.limit || 10;
    if (limit <= 0 || limit > maxLimit) limit = maxLimit;
    let currentPage: number = options.page;
    if (currentPage <= 0) currentPage = 1;

    return {
      limit,
      total: 0,
      currentPage,
      lastPage: 1,
    };
  };

  static infinityPagination = <T extends BaseEntity>(
    items: Array<T>,
    pagination: Pagination,
    total: number,
  ) => ({
    items,
    pagination: {
      total,
      limit: pagination.limit,
      currentPage: pagination.currentPage,
      lastPage: Math.ceil(total / pagination.limit),
    },
  });
}
