import { Allow } from 'class-validator';
import { Column, Entity } from 'typeorm';

import { BaseEntity } from '~/core';

@Entity({ name: 'roles' })
export class Role extends BaseEntity {
  @Allow()
  @Column()
  name: string;
}
