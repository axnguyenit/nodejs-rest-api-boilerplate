import { Allow } from 'class-validator';
import { Column, Entity } from 'typeorm';

import { BaseEntity } from '~/core';

@Entity()
export class Status extends BaseEntity {
  @Allow()
  @Column()
  name?: string;
}
