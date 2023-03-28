/* eslint-disable max-len */
import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1675787410411 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE auth_provider AS ENUM ('Email', 'Facebook', 'Google', 'Twitter', 'Apple')`,
    );
    await queryRunner.query(
      `CREATE TYPE user_status AS ENUM ('ACTIVE', 'DEACTIVATED', 'REMOVED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "email" character varying,
        "password" character varying,
        "provider" auth_provider NOT NULL DEFAULT 'Email',
        "socialId" character varying,
        "fullName" character varying,
        "hash" character varying,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP,
        "photoId" uuid,
        "roleId" uuid,
        "status" user_status NOT NULL DEFAULT 'DEACTIVATED',
        CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
        CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
      )`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9bd2fe7a8e694dedc4ec2f666f" ON "user" ("socialId")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_58e4dbff0e1a32a9bdc861bb29" ON "user" ("fullName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e282acb94d2e3aec10f480e4f6" ON "user" ("hash") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_df507d27b0fb20cd5f7bef9b9a"`);
    await queryRunner.query(`DROP INDEX "IDX_e282acb94d2e3aec10f480e4f6"`);
    await queryRunner.query(`DROP INDEX "IDX_f0e1b4ecdca13b177e2e3a0613"`);
    await queryRunner.query(`DROP INDEX "IDX_58e4dbff0e1a32a9bdc861bb29"`);
    await queryRunner.query(`DROP INDEX "IDX_9bd2fe7a8e694dedc4ec2f666f"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
