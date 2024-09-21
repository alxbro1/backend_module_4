import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1726553030485 implements MigrationInterface {
    name = 'InitialMigration1726553030485'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL, "imgUrl" character varying NOT NULL DEFAULT 'https://img.freepik.com/vector-gratis/fondo-estudio-blanco-plataforma-visualizacion-podio_1017-37977.jpg?t=st=1726193092~exp=1726196692~hmac=8a52c817d5b9dad06ce8514421140944e3f3c1e642319dec1cb5ff1bf9bf7704&w=900', "categoryIdId" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders_details" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric NOT NULL, "orderIdId" uuid, CONSTRAINT "REL_a387c0d2956a3bae7860ccc0e0" UNIQUE ("orderIdId"), CONSTRAINT "PK_9e5b29b50620aadf9af8eccb36d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL DEFAULT now(), "userIdId" uuid, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(20) NOT NULL, "phone" integer NOT NULL, "country" character varying(50) NOT NULL, "address" character varying NOT NULL, "city" character varying(50) NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders_details_products_products" ("ordersDetailsId" uuid NOT NULL, "productsId" uuid NOT NULL, CONSTRAINT "PK_c6950a54cebf7911d69ff3ae7c7" PRIMARY KEY ("ordersDetailsId", "productsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_20b33011864cbc2067d0083a67" ON "orders_details_products_products" ("ordersDetailsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3b802c251834ab9ca59afd8abe" ON "orders_details_products_products" ("productsId") `);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_33b88e166df04f2d9291628bebb" FOREIGN KEY ("categoryIdId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders_details" ADD CONSTRAINT "FK_a387c0d2956a3bae7860ccc0e0d" FOREIGN KEY ("orderIdId") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_916c66b74d50fe7cad01e3e5895" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders_details_products_products" ADD CONSTRAINT "FK_20b33011864cbc2067d0083a670" FOREIGN KEY ("ordersDetailsId") REFERENCES "orders_details"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "orders_details_products_products" ADD CONSTRAINT "FK_3b802c251834ab9ca59afd8abe3" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders_details_products_products" DROP CONSTRAINT "FK_3b802c251834ab9ca59afd8abe3"`);
        await queryRunner.query(`ALTER TABLE "orders_details_products_products" DROP CONSTRAINT "FK_20b33011864cbc2067d0083a670"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_916c66b74d50fe7cad01e3e5895"`);
        await queryRunner.query(`ALTER TABLE "orders_details" DROP CONSTRAINT "FK_a387c0d2956a3bae7860ccc0e0d"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_33b88e166df04f2d9291628bebb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3b802c251834ab9ca59afd8abe"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_20b33011864cbc2067d0083a67"`);
        await queryRunner.query(`DROP TABLE "orders_details_products_products"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "orders_details"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
