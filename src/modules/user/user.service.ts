import type { PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from 'routing-controllers';

import { DI } from '~/providers';
import type { PaginationOptions } from '~/types';
import { excludedFields } from '~/utils';

import { ErrorCode } from '../../enums';
import { HttpException } from '../../exceptions';
import type { CreateUserDto, UpdateUserDto } from './dto';
import type { UserService } from './user.interface';

export class UserServiceImpl implements UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = DI.instance.prismaService;
  }

  async create(createProfileDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createProfileDto.password, salt);

    return this.prisma.user.create({
      data: {
        ...createProfileDto,
        password: hashedPassword,
      },
    });
  }

  findManyWithPagination(paginationOptions: PaginationOptions) {
    return this.prisma.user.findMany({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  async findById(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      return excludedFields<User, keyof User>(user!, ['password', 'hash']);
    } catch {
      throw new NotFoundError('not found');
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

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
    return this.prisma.user.update({ where: { id }, data: updateProfileDto });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
