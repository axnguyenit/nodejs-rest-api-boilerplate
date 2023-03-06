import bcrypt from 'bcrypt';
import { isString } from 'lodash';

export class BcryptHelper {
  public static async hash(
    plainText: string,
    saltRounds = 10,
  ): Promise<string> {
    return bcrypt.hash(plainText, saltRounds);
  }

  public static async verifyHash(
    plainText: string,
    hash: string,
  ): Promise<boolean> {
    if (!isString(plainText) || !isString(hash)) return false;

    return bcrypt.compare(plainText, hash);
  }
}
