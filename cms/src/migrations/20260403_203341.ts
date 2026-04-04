import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_homepage_contact_visible_socials_type" AS ENUM('email', 'telephone', 'location', 'instagram', 'tiktok', 'facebook');
  CREATE TYPE "public"."enum__homepage_v_version_contact_visible_socials_type" AS ENUM('email', 'telephone', 'location', 'instagram', 'tiktok', 'facebook');
  CREATE TABLE "homepage_contact_visible_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_homepage_contact_visible_socials_type"
  );
  
  CREATE TABLE "_homepage_v_version_contact_visible_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__homepage_v_version_contact_visible_socials_type",
  	"_uuid" varchar
  );
  
  ALTER TABLE "homepage" ADD COLUMN "contact_title" varchar DEFAULT 'Contacto';
  ALTER TABLE "homepage" ADD COLUMN "contact_description" varchar DEFAULT '¿Lista para transformar tu visión en realidad? Contáctame para reservas, colaboraciones o consultas sobre servicios personalizados.';
  ALTER TABLE "homepage" ADD COLUMN "contact_horario" varchar DEFAULT 'Lunes - Sabado: 9:00 - 20:00
  Domingo: Consultar disponibilidad';
  ALTER TABLE "homepage" ADD COLUMN "contact_email" varchar DEFAULT 'hola@nunamakeup.com';
  ALTER TABLE "homepage" ADD COLUMN "contact_telephone" varchar DEFAULT '+34 612 345 678';
  ALTER TABLE "homepage" ADD COLUMN "contact_location" varchar DEFAULT 'Madrid, Espana · Disponible para viajar';
  ALTER TABLE "homepage" ADD COLUMN "contact_instagram" varchar DEFAULT 'https://instagram.com/nunamakeupartist';
  ALTER TABLE "homepage" ADD COLUMN "contact_tiktok" varchar;
  ALTER TABLE "homepage" ADD COLUMN "contact_facebook" varchar;
  ALTER TABLE "_homepage_v" ADD COLUMN "version_contact_title" varchar DEFAULT 'Contacto';
  ALTER TABLE "_homepage_v" ADD COLUMN "version_contact_description" varchar DEFAULT '¿Lista para transformar tu visión en realidad? Contáctame para reservas, colaboraciones o consultas sobre servicios personalizados.';
  ALTER TABLE "_homepage_v" ADD COLUMN "version_contact_horario" varchar DEFAULT 'Lunes - Sabado: 9:00 - 20:00
  Domingo: Consultar disponibilidad';
  ALTER TABLE "_homepage_v" ADD COLUMN "version_contact_email" varchar DEFAULT 'hola@nunamakeup.com';
  ALTER TABLE "_homepage_v" ADD COLUMN "version_contact_telephone" varchar DEFAULT '+34 612 345 678';
  ALTER TABLE "_homepage_v" ADD COLUMN "version_contact_location" varchar DEFAULT 'Madrid, Espana · Disponible para viajar';
  ALTER TABLE "_homepage_v" ADD COLUMN "version_contact_instagram" varchar DEFAULT 'https://instagram.com/nunamakeupartist';
  ALTER TABLE "_homepage_v" ADD COLUMN "version_contact_tiktok" varchar;
  ALTER TABLE "_homepage_v" ADD COLUMN "version_contact_facebook" varchar;
  ALTER TABLE "homepage_contact_visible_socials" ADD CONSTRAINT "homepage_contact_visible_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_version_contact_visible_socials" ADD CONSTRAINT "_homepage_v_version_contact_visible_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "homepage_contact_visible_socials_order_idx" ON "homepage_contact_visible_socials" USING btree ("_order");
  CREATE INDEX "homepage_contact_visible_socials_parent_id_idx" ON "homepage_contact_visible_socials" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_version_contact_visible_socials_order_idx" ON "_homepage_v_version_contact_visible_socials" USING btree ("_order");
  CREATE INDEX "_homepage_v_version_contact_visible_socials_parent_id_idx" ON "_homepage_v_version_contact_visible_socials" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "homepage_contact_visible_socials" CASCADE;
  DROP TABLE "_homepage_v_version_contact_visible_socials" CASCADE;
  ALTER TABLE "homepage" DROP COLUMN "contact_title";
  ALTER TABLE "homepage" DROP COLUMN "contact_description";
  ALTER TABLE "homepage" DROP COLUMN "contact_horario";
  ALTER TABLE "homepage" DROP COLUMN "contact_email";
  ALTER TABLE "homepage" DROP COLUMN "contact_telephone";
  ALTER TABLE "homepage" DROP COLUMN "contact_location";
  ALTER TABLE "homepage" DROP COLUMN "contact_instagram";
  ALTER TABLE "homepage" DROP COLUMN "contact_tiktok";
  ALTER TABLE "homepage" DROP COLUMN "contact_facebook";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_contact_title";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_contact_description";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_contact_horario";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_contact_email";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_contact_telephone";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_contact_location";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_contact_instagram";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_contact_tiktok";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_contact_facebook";
  DROP TYPE "public"."enum_homepage_contact_visible_socials_type";
  DROP TYPE "public"."enum__homepage_v_version_contact_visible_socials_type";`)
}
