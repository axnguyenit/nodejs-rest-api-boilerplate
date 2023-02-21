import type { User } from '@prisma/client';

import type { PaginationOptions } from '~/types';

import type { CreateUserDto, UpdateUserDto } from './dto';

export interface UserService {
  create(createProfileDto: CreateUserDto): Promise<User>;

  findManyWithPagination(
    paginationOptions: PaginationOptions,
  ): Promise<Array<User>>;

  findById(id: string): Promise<Omit<User, keyof User>>;

  findByEmail(email: string): Promise<User | null>;

  update(id: string, updateProfileDto: UpdateUserDto);

  delete(id: string): Promise<void>;
}
