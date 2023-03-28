import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDefaultRole1680010655979 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.query(
      `INSERT INTO role (name) VALUES ('SuperAdmin')`,
    );
    await queryRunner.manager.query(`INSERT INTO role (name) VALUES ('Admin')`);
    await queryRunner.manager.query(`INSERT INTO role (name) VALUES ('User')`);
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    ////
  }
}
