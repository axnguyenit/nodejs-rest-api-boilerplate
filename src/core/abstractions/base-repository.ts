import type {
  DeepPartial,
  EntityUpdateInput,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
} from '../types';

export abstract class BaseRepository<Entity extends Record<string, unknown>> {
  abstract create(entity: DeepPartial<Entity>): Promise<Entity>;

  abstract findOne(options: FindOneOptions<Entity>): Promise<Entity | null>;

  abstract findOneBy(where: FindOptionsWhere<Entity>): Promise<Entity | null>;

  abstract findOneById(id: string | number): Promise<Entity | null>;

  abstract find(options?: FindManyOptions<Entity>): Promise<Array<Entity>>;

  abstract findBy(where: FindOptionsWhere<Entity>): Promise<Array<Entity>>;

  abstract count(options?: FindManyOptions<Entity>): Promise<number>;

  abstract countBy(where: FindOptionsWhere<Entity>): Promise<number>;

  abstract update(
    id: string | number,
    entity: EntityUpdateInput<DeepPartial<Entity>>,
  ): Promise<Entity>;

  abstract delete(id: string | number): Promise<Entity>;
}
