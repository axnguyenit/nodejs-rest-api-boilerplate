import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFile1675787410091 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "file" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "path" character varying NOT NULL, 
        CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "file"`);
  }
}
