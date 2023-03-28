export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface Pagination {
  limit: number;
  total: number;
  currentPage: number;
  lastPage: number;
}
