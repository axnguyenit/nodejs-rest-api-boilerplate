import { BaseRepository } from '~/core';
import type { PaginationOptions } from '~/types';

import type { CreateUserDto, UpdateUserDto } from './dto';
import type { UserEntity } from './entities';

export interface UserService {
  create(createProfileDto: CreateUserDto): Promise<UserEntity>;

  findManyWithPagination(paginationOptions: PaginationOptions): Promise<Array<UserEntity>>;

  findById(id: string): Promise<Omit<UserEntity, keyof UserEntity>>;

  findByEmail(email: string): Promise<UserEntity | null>;

  update(id: string, updateProfileDto: UpdateUserDto);

  delete(id: string): Promise<void>;
}

export abstract class UserRepository extends BaseRepository<UserEntity> {}
