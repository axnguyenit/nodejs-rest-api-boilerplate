export declare type FindOptionsWhere<T> = {
  [P in keyof T]?: unknown;
};

export interface FindOneOptions<T> {
  where?: Array<FindOptionsWhere<T>> | FindOptionsWhere<T>;
}
/**
 * Defines a special criteria to find specific entities.
 */
export interface FindManyOptions<Entity> extends FindOneOptions<Entity> {
  /**
   * Offset (paginated) where from entities should be taken.
   */
  skip?: number;
  /**
   * Limit (paginated) - max number of entities should be taken.
   */
  take?: number;
}

export type EntityUpdateInput<T extends Record<string, unknown>> = Omit<
  T,
  'id'
>;
