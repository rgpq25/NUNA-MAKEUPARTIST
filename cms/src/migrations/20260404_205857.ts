import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "images_uid_idx";
  ALTER TABLE "images" DROP COLUMN "uid";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "images" ADD COLUMN "uid" varchar NOT NULL;
  CREATE UNIQUE INDEX "images_uid_idx" ON "images" USING btree ("uid");`)
}
