import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStatus1675787410184 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "status" (
        "id" integer NOT NULL,
        "name" character varying NOT NULL,
        CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "status"`);
  }
}
