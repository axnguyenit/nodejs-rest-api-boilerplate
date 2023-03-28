import { Allow } from 'class-validator';
import { Column, Entity } from 'typeorm';

import { BaseEntity } from '~/core';

@Entity({ name: 'role' })
export class Role extends BaseEntity {
  @Allow()
  @Column({ unique: true })
  name: string;
}
