import { Allow } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

import { EntityHelper } from '../../../utils';
@Entity()
export class Status extends EntityHelper {
  @PrimaryColumn()
  id: number;

  @Allow()
  @Column()
  name?: string;
}
