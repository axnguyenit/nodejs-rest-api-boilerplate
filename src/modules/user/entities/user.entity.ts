import * as bcrypt from 'bcryptjs';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
} from 'typeorm';

import { BaseEntity, UserStatus } from '~/core';
import { AuthProviders } from '~/modules/auth';
import { Role } from '~/modules/role/entities/role.entity';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  //  static hashPassword(password: string): Promise<string> {
  //   return new Promise((resolve, reject) => {
  //     bcrypt.hash(password, 10, (err, hash) => {
  //       if (err) {
  //         return reject(err);
  //       }

  //       resolve(hash);
  //     });
  //   });
  // }

  //  static comparePassword(
  //   user: User,
  //   password: string,
  // ): Promise<boolean> {
  //   return new Promise((resolve, _reject) => {
  //     bcrypt.compare(password, user.password, (err, res) => {
  //       resolve(res === true);
  //     });
  //   });
  // }

  @IsNotEmpty()
  @Column()
  fullName: string;

  @IsNotEmpty()
  @Column({ unique: true })
  email: string;

  @Column({ default: AuthProviders.Email })
  @Expose({ groups: ['me', 'admin'] })
  provider: string;

  @ManyToOne(() => Role, { eager: true })
  role: Role;

  @Column({ type: 'enum', enum: UserStatus, enumName: 'user_status' })
  status?: UserStatus;

  @IsNotEmpty()
  @Column()
  @Exclude()
  password: string;

  @Exclude({ toPlainOnly: true })
  previousPassword: string;

  @AfterLoad()
  loadPreviousPassword(): void {
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
}
