import type { Prisma, PrismaClient } from '@prisma/client';

import type {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
} from '~/core';
import { DI } from '~/providers';

import type { UserEntity } from './entities';
import type { UserRepository } from './user.interface';

export class UserRepositoryIml implements UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = DI.instance.prismaService;
  }

  async create(entity: DeepPartial<UserEntity>): Promise<UserEntity> {
    return await this.prisma.user.create({
      data: <Prisma.UserCreateInput>entity,
    });
  }

  async findOne(
    options: FindOneOptions<UserEntity>,
  ): Promise<UserEntity | null> {
    return await this.prisma.user.findFirst({
      where: <Prisma.UserWhereInput>options,
    });
  }

  async find(
    options?: FindManyOptions<UserEntity>,
  ): Promise<Array<UserEntity>> {
    return await this.prisma.user.findMany({
      skip: options?.skip,
      take: options?.take,
      where: <Prisma.UserWhereInput>options?.where,
    });
  }

  async findBy(
    options: FindOptionsWhere<UserEntity>,
  ): Promise<Array<UserEntity>> {
    return await this.prisma.user.findMany({
      where: <Prisma.UserWhereInput>{ ...options },
    });
  }

  async findOneBy(
    where: Prisma.UserWhereUniqueInput,
  ): Promise<UserEntity | null> {
    return await this.prisma.user.findUnique({ where });
  }

  async findOneById(id: string): Promise<UserEntity | null> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async countBy(where: Prisma.UserWhereInput): Promise<number> {
    return await this.prisma.user.count({ where });
  }

  async count(options?: FindManyOptions<UserEntity>): Promise<number> {
    return await this.prisma.user.count({
      skip: options?.skip,
      take: options?.take,
      where: <Prisma.UserWhereInput>options?.where,
    });
  }

  async update(
    id: string,
    entity: DeepPartial<UserEntity>,
  ): Promise<UserEntity> {
    return await this.prisma.user.update({
      where: { id },
      data: entity,
    });
  }

  async delete(id: string): Promise<UserEntity> {
    return await this.prisma.user.delete({ where: { id } });
  }
}
