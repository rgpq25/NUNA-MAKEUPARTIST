import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "homepage" ALTER COLUMN "seo_title" SET DEFAULT 'NUNA Makeup Artist';
  ALTER TABLE "homepage" ALTER COLUMN "seo_description" SET DEFAULT 'Landing page editorial para NUNA Makeup Artist.';
  ALTER TABLE "_homepage_v" ALTER COLUMN "version_seo_title" SET DEFAULT 'NUNA Makeup Artist';
  ALTER TABLE "_homepage_v" ALTER COLUMN "version_seo_description" SET DEFAULT 'Landing page editorial para NUNA Makeup Artist.';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "homepage" ALTER COLUMN "seo_title" SET DEFAULT 'NUNA Makeup Artist | Home';
  ALTER TABLE "homepage" ALTER COLUMN "seo_description" SET DEFAULT 'Landing page editorial para NUNA Makeup Artist, creada a partir del export de Figma.';
  ALTER TABLE "_homepage_v" ALTER COLUMN "version_seo_title" SET DEFAULT 'NUNA Makeup Artist | Home';
  ALTER TABLE "_homepage_v" ALTER COLUMN "version_seo_description" SET DEFAULT 'Landing page editorial para NUNA Makeup Artist, creada a partir del export de Figma.';`)
}
