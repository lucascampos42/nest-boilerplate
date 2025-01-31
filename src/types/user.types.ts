import { Prisma } from '@prisma/client';

export type SearchUser = {
  username: Prisma.StringFilter<'User'>;
};

export type UserOrderFields = 'username' | 'email' | 'createdAt';

export type PersonOrderFields = 'name' | 'fantasyName' | 'email' | 'createdAt';
