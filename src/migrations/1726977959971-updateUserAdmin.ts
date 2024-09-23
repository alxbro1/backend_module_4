import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserAdmin1726977959971 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE users
            SET role = 'ADMIN'
            WHERE id = '971e45ca-2784-4d48-9627-676993e20d53'
          `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            UPDATE users
            SET role = 'USER'
            WHERE id = '971e45ca-2784-4d48-9627-676993e20d53'
          `);
    }

}
