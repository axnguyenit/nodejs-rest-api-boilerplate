import type { PaginationOptions } from '../../core';
import type { CreateUserDto, UpdateUserDto } from './dto';
import type { User } from './entities';

export abstract class UserService {
  abstract create(data: CreateUserDto): Promise<User>;

  abstract updateUser(id: string, data: UpdateUserDto): Promise<User>;

  abstract getFilteredUsers(
    options: PaginationOptions,
    query: string,
  ): Promise<Array<User>>;

  abstract getUserById(id: string): Promise<User>;

  abstract getUserByEmail(email: string): Promise<User>;

  abstract softDelete(id: string): Promise<void>;
}
