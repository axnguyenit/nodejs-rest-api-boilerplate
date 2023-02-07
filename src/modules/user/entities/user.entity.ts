import * as bcrypt from 'bcryptjs';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { EntityHelper } from '../../../utils';
import { AuthProviders } from '../../auth';
import { Role } from '../../role/entities/role.entity';
import { Status } from '../../status/entities/status.entity';

@Entity({ name: 'users' })
export class User extends EntityHelper {
  // public static hashPassword(password: string): Promise<string> {
  //   return new Promise((resolve, reject) => {
  //     bcrypt.hash(password, 10, (err, hash) => {
  //       if (err) {
  //         return reject(err);
  //       }

  //       resolve(hash);
  //     });
  //   });
  // }

  // public static comparePassword(
  //   user: User,
  //   password: string,
  // ): Promise<boolean> {
  //   return new Promise((resolve, _reject) => {
  //     bcrypt.compare(password, user.password, (err, res) => {
  //       resolve(res === true);
  //     });
  //   });
  // }

  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @IsNotEmpty()
  @Column()
  public fullName: string;

  @IsNotEmpty()
  @Column({ unique: true })
  public email: string;

  @Column({ default: AuthProviders.Email })
  @Expose({ groups: ['me', 'admin'] })
  provider: string;

  @ManyToOne(() => Role, {
    eager: true,
  })
  role: Role;

  @ManyToOne(() => Status, {
    eager: true,
  })
  status?: Status;

  @IsNotEmpty()
  @Column()
  @Exclude()
  public password: string;

  @Exclude({ toPlainOnly: true })
  public previousPassword: string;

  @AfterLoad()
  public loadPreviousPassword(): void {
    this.previousPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (this.previousPassword !== this.password && this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
