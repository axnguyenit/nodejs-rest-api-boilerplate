import { Allow } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

import { EntityHelper } from '../../../utils';

@Entity({ name: 'roles' })
export class Role extends EntityHelper {
  @PrimaryColumn()
  id: number;

  @Allow()
  @Column()
  name: string;
}
