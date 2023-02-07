import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateForgot1675787410512 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "forgots" (
        "id" SERIAL NOT NULL,
        "hash" character varying NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP,
        "userId" uuid,
        CONSTRAINT "PK_087959f5bb89da4ce3d763eab75" PRIMARY KEY ("id")
      )`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_df507d27b0fb20cd5f7bef9b9a" ON "forgots" ("hash") `,
    );
    await queryRunner.query(
      `ALTER TABLE "forgots" 
        ADD CONSTRAINT "FK_31f3c80de0525250f31e23a9b83"
        FOREIGN KEY ("userId")
        REFERENCES "users"("id")
        ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "forgots" DROP CONSTRAINT "FK_31f3c80de0525250f31e23a9b83"`,
    );
    await queryRunner.query(`DROP TABLE "forgots"`);
  }
}
