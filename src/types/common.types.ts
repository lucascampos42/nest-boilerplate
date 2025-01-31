export type SearchParams<T> = {
  page?: number;
  limit?: number;
  orderBy?: 'desc' | 'asc';
  orderField?: T;
  search?: string;
};

export const DEFAULT_LIMIT = 20;
