import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "images" DROP COLUMN "focal_x";
  ALTER TABLE "images" DROP COLUMN "focal_y";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "images" ADD COLUMN "focal_x" numeric;
  ALTER TABLE "images" ADD COLUMN "focal_y" numeric;`)
}
