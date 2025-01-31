import { DEFAULT_LIMIT, SearchParams } from '../types/common.types';

export const paginationClause = ({
  limit,
  page,
  orderBy = 'desc',
  orderField = 'createdAt',
}: SearchParams<string>) => {
  const multiplier = limit || DEFAULT_LIMIT;
  const skip = page ? (page - 1) * multiplier : undefined;

  const orderByClause = {
    [orderField]: orderBy,
  };

  return { skip, orderByClause, take: multiplier };
};
