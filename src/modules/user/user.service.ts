import type { Repository } from 'typeorm';

import type { EntityCondition, PaginationOptions } from '~/core';

import type { CreateUserDto, UpdateUserDto } from './dto';
import type { User } from './entities';

export class UserService {
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

  findOne(fields: EntityCondition<User>): Promise<User> {
    return this.userRepository.findOneOrFail({
      where: fields,
    });
  }

  update(_id: string, _updateProfileDto: UpdateUserDto) {
    // return this.userRepository.save(
    //   this.userRepository.create({
    //     id,
    //     ...updateProfileDto,
    //   }),
    // );
  }

  async softDelete(id: string): Promise<void> {
    await this.userRepository.softDelete(id);
  }
}
