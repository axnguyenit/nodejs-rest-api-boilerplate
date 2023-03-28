import type { Repository } from 'typeorm';

import type { PaginationOptions } from '~/core';

import type { CreateUserDto, UpdateUserDto } from './dto';
import type { User } from './entities';
import type { UserService } from './user.interface';

export class UserServiceImpl implements UserService {
  constructor(private userRepository: Repository<User>) {}

  create(createProfileDto: CreateUserDto) {
    return this.userRepository.save(
      this.userRepository.create(createProfileDto),
    );
  }

  findManyWithPagination(paginationOptions: PaginationOptions) {
    return this.userRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  getFilteredUsers(
    _options: PaginationOptions,
    _query: string,
  ): Promise<Array<User>> {
    return this.userRepository.find({});
  }

  getUserById(id: string): Promise<User> {
    return this.userRepository.findOneOrFail({
      where: { id },
    });
  }

  getUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOneOrFail({
      where: { email },
    });
  }

  updateUser(id: string, updateProfileDto: UpdateUserDto) {
    return this.userRepository.save(
      this.userRepository.create({
        id,
        ...updateProfileDto,
      }),
    );
  }

  async softDelete(id: string): Promise<void> {
    await this.userRepository.softDelete(id);
  }
}
