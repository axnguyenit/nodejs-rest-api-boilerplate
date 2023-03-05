import type { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from 'routing-controllers';

import { ErrorCode } from '~/enums';
import { HttpException } from '~/exceptions';
import type { PaginationOptions } from '~/types';
import { excludedFields } from '~/utils';

import type { CreateUserDto, UpdateUserDto } from './dto';
import type { UserService } from './user.interface';
import { UserRepositoryIml } from './user.repository';

export class UserServiceImpl implements UserService {
  private userRepository = new UserRepositoryIml();

  async create(createProfileDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createProfileDto.password, salt);

    return await this.userRepository.create({
      ...createProfileDto,
      password: hashedPassword,
    });
  }

  findManyWithPagination(paginationOptions: PaginationOptions) {
    return this.userRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  async findById(id: string) {
    try {
      const user = await this.userRepository.findOneById(id);

      return excludedFields<User, keyof User>(user!, ['password', 'hash']);
    } catch {
      throw new NotFoundError('not found');
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOneBy({ email });

      return user;
    } catch {
      throw new HttpException(StatusCodes.NOT_FOUND, [
        {
          code: ErrorCode.NotFound,
          key: 'User',
          message: `Not found user with ${email}`,
        },
      ]);
    }
  }

  update(id: string, updateProfileDto: UpdateUserDto) {
    return this.userRepository.update(id, updateProfileDto);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
