import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  public static hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return reject(err);
        }

        resolve(hash);
      });
    });
  }

  public static comparePassword(
    user: User,
    password: string,
  ): Promise<boolean> {
    return new Promise((resolve, _reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        resolve(res === true);
      });
    });
  }

  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @IsNotEmpty()
  @Column({ name: 'last_name' })
  public fullName: string;

  @IsNotEmpty()
  @Column({ unique: true })
  public email: string;

  @IsNotEmpty()
  @Column()
  public username: string;

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
}
