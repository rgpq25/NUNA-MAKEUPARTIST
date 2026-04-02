import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_homepage_navigation_items_type" AS ENUM('section', 'contact');
  CREATE TYPE "public"."enum_homepage_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__homepage_v_version_navigation_items_type" AS ENUM('section', 'contact');
  CREATE TYPE "public"."enum__homepage_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "images" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"uid" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "photoshoots" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"main_image_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "photoshoots_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"images_id" integer
  );
  
  CREATE TABLE "sections" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"main_description" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "sections_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"images_id" integer,
  	"photoshoots_id" integer
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"images_id" integer,
  	"photoshoots_id" integer,
  	"sections_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "homepage_featured_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" integer
  );
  
  CREATE TABLE "homepage_biography_certifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar
  );
  
  CREATE TABLE "homepage_navigation_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_homepage_navigation_items_type" DEFAULT 'section',
  	"section_id" integer
  );
  
  CREATE TABLE "homepage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"seo_title" varchar DEFAULT 'NUNA Makeup Artist | Home',
  	"seo_description" varchar DEFAULT 'Landing page editorial para NUNA Makeup Artist, creada a partir del export de Figma.',
  	"branding_title" varchar DEFAULT 'NUNA',
  	"branding_subtitle" varchar DEFAULT 'Makeup Artist',
  	"hero_headline" varchar DEFAULT 'Maquillaje editorial y novias con un enfoque atemporal',
  	"hero_description" varchar DEFAULT 'Especializada en crear belleza que trasciende tendencias. Desde bodas intimas hasta campanas de alta moda, cada trabajo refleja sofisticacion, tecnica impecable y una vision artistica unica.',
  	"hero_location" varchar DEFAULT 'Basada en Madrid · Disponible internacionalmente',
  	"hero_image_id" integer,
  	"biography_title" varchar DEFAULT 'Biografia',
  	"biography_image_id" integer,
  	"biography_content" jsonb,
  	"biography_certifications_title" varchar DEFAULT 'Certificaciones',
  	"_status" "enum_homepage_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_homepage_v_version_featured_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_version_biography_certifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v_version_navigation_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum__homepage_v_version_navigation_items_type" DEFAULT 'section',
  	"section_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_homepage_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_seo_title" varchar DEFAULT 'NUNA Makeup Artist | Home',
  	"version_seo_description" varchar DEFAULT 'Landing page editorial para NUNA Makeup Artist, creada a partir del export de Figma.',
  	"version_branding_title" varchar DEFAULT 'NUNA',
  	"version_branding_subtitle" varchar DEFAULT 'Makeup Artist',
  	"version_hero_headline" varchar DEFAULT 'Maquillaje editorial y novias con un enfoque atemporal',
  	"version_hero_description" varchar DEFAULT 'Especializada en crear belleza que trasciende tendencias. Desde bodas intimas hasta campanas de alta moda, cada trabajo refleja sofisticacion, tecnica impecable y una vision artistica unica.',
  	"version_hero_location" varchar DEFAULT 'Basada en Madrid · Disponible internacionalmente',
  	"version_hero_image_id" integer,
  	"version_biography_title" varchar DEFAULT 'Biografia',
  	"version_biography_image_id" integer,
  	"version_biography_content" jsonb,
  	"version_biography_certifications_title" varchar DEFAULT 'Certificaciones',
  	"version__status" "enum__homepage_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "photoshoots" ADD CONSTRAINT "photoshoots_main_image_id_images_id_fk" FOREIGN KEY ("main_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "photoshoots_rels" ADD CONSTRAINT "photoshoots_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."photoshoots"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "photoshoots_rels" ADD CONSTRAINT "photoshoots_rels_images_fk" FOREIGN KEY ("images_id") REFERENCES "public"."images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_rels" ADD CONSTRAINT "sections_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_rels" ADD CONSTRAINT "sections_rels_images_fk" FOREIGN KEY ("images_id") REFERENCES "public"."images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sections_rels" ADD CONSTRAINT "sections_rels_photoshoots_fk" FOREIGN KEY ("photoshoots_id") REFERENCES "public"."photoshoots"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_images_fk" FOREIGN KEY ("images_id") REFERENCES "public"."images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_photoshoots_fk" FOREIGN KEY ("photoshoots_id") REFERENCES "public"."photoshoots"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sections_fk" FOREIGN KEY ("sections_id") REFERENCES "public"."sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_featured_sections" ADD CONSTRAINT "homepage_featured_sections_section_id_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."sections"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_featured_sections" ADD CONSTRAINT "homepage_featured_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_biography_certifications" ADD CONSTRAINT "homepage_biography_certifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_navigation_items" ADD CONSTRAINT "homepage_navigation_items_section_id_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."sections"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_navigation_items" ADD CONSTRAINT "homepage_navigation_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_hero_image_id_images_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_biography_image_id_images_id_fk" FOREIGN KEY ("biography_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v_version_featured_sections" ADD CONSTRAINT "_homepage_v_version_featured_sections_section_id_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."sections"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v_version_featured_sections" ADD CONSTRAINT "_homepage_v_version_featured_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_version_biography_certifications" ADD CONSTRAINT "_homepage_v_version_biography_certifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_version_navigation_items" ADD CONSTRAINT "_homepage_v_version_navigation_items_section_id_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."sections"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v_version_navigation_items" ADD CONSTRAINT "_homepage_v_version_navigation_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v" ADD CONSTRAINT "_homepage_v_version_hero_image_id_images_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v" ADD CONSTRAINT "_homepage_v_version_biography_image_id_images_id_fk" FOREIGN KEY ("version_biography_image_id") REFERENCES "public"."images"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "images_uid_idx" ON "images" USING btree ("uid");
  CREATE INDEX "images_updated_at_idx" ON "images" USING btree ("updated_at");
  CREATE INDEX "images_created_at_idx" ON "images" USING btree ("created_at");
  CREATE UNIQUE INDEX "images_filename_idx" ON "images" USING btree ("filename");
  CREATE UNIQUE INDEX "photoshoots_slug_idx" ON "photoshoots" USING btree ("slug");
  CREATE INDEX "photoshoots_main_image_idx" ON "photoshoots" USING btree ("main_image_id");
  CREATE INDEX "photoshoots_updated_at_idx" ON "photoshoots" USING btree ("updated_at");
  CREATE INDEX "photoshoots_created_at_idx" ON "photoshoots" USING btree ("created_at");
  CREATE INDEX "photoshoots_rels_order_idx" ON "photoshoots_rels" USING btree ("order");
  CREATE INDEX "photoshoots_rels_parent_idx" ON "photoshoots_rels" USING btree ("parent_id");
  CREATE INDEX "photoshoots_rels_path_idx" ON "photoshoots_rels" USING btree ("path");
  CREATE INDEX "photoshoots_rels_images_id_idx" ON "photoshoots_rels" USING btree ("images_id");
  CREATE UNIQUE INDEX "sections_slug_idx" ON "sections" USING btree ("slug");
  CREATE INDEX "sections_updated_at_idx" ON "sections" USING btree ("updated_at");
  CREATE INDEX "sections_created_at_idx" ON "sections" USING btree ("created_at");
  CREATE INDEX "sections_rels_order_idx" ON "sections_rels" USING btree ("order");
  CREATE INDEX "sections_rels_parent_idx" ON "sections_rels" USING btree ("parent_id");
  CREATE INDEX "sections_rels_path_idx" ON "sections_rels" USING btree ("path");
  CREATE INDEX "sections_rels_images_id_idx" ON "sections_rels" USING btree ("images_id");
  CREATE INDEX "sections_rels_photoshoots_id_idx" ON "sections_rels" USING btree ("photoshoots_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_images_id_idx" ON "payload_locked_documents_rels" USING btree ("images_id");
  CREATE INDEX "payload_locked_documents_rels_photoshoots_id_idx" ON "payload_locked_documents_rels" USING btree ("photoshoots_id");
  CREATE INDEX "payload_locked_documents_rels_sections_id_idx" ON "payload_locked_documents_rels" USING btree ("sections_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "homepage_featured_sections_order_idx" ON "homepage_featured_sections" USING btree ("_order");
  CREATE INDEX "homepage_featured_sections_parent_id_idx" ON "homepage_featured_sections" USING btree ("_parent_id");
  CREATE INDEX "homepage_featured_sections_section_idx" ON "homepage_featured_sections" USING btree ("section_id");
  CREATE INDEX "homepage_biography_certifications_order_idx" ON "homepage_biography_certifications" USING btree ("_order");
  CREATE INDEX "homepage_biography_certifications_parent_id_idx" ON "homepage_biography_certifications" USING btree ("_parent_id");
  CREATE INDEX "homepage_navigation_items_order_idx" ON "homepage_navigation_items" USING btree ("_order");
  CREATE INDEX "homepage_navigation_items_parent_id_idx" ON "homepage_navigation_items" USING btree ("_parent_id");
  CREATE INDEX "homepage_navigation_items_section_idx" ON "homepage_navigation_items" USING btree ("section_id");
  CREATE INDEX "homepage_hero_hero_image_idx" ON "homepage" USING btree ("hero_image_id");
  CREATE INDEX "homepage_biography_biography_image_idx" ON "homepage" USING btree ("biography_image_id");
  CREATE INDEX "homepage__status_idx" ON "homepage" USING btree ("_status");
  CREATE INDEX "_homepage_v_version_featured_sections_order_idx" ON "_homepage_v_version_featured_sections" USING btree ("_order");
  CREATE INDEX "_homepage_v_version_featured_sections_parent_id_idx" ON "_homepage_v_version_featured_sections" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_version_featured_sections_section_idx" ON "_homepage_v_version_featured_sections" USING btree ("section_id");
  CREATE INDEX "_homepage_v_version_biography_certifications_order_idx" ON "_homepage_v_version_biography_certifications" USING btree ("_order");
  CREATE INDEX "_homepage_v_version_biography_certifications_parent_id_idx" ON "_homepage_v_version_biography_certifications" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_version_navigation_items_order_idx" ON "_homepage_v_version_navigation_items" USING btree ("_order");
  CREATE INDEX "_homepage_v_version_navigation_items_parent_id_idx" ON "_homepage_v_version_navigation_items" USING btree ("_parent_id");
  CREATE INDEX "_homepage_v_version_navigation_items_section_idx" ON "_homepage_v_version_navigation_items" USING btree ("section_id");
  CREATE INDEX "_homepage_v_version_hero_version_hero_image_idx" ON "_homepage_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_homepage_v_version_biography_version_biography_image_idx" ON "_homepage_v" USING btree ("version_biography_image_id");
  CREATE INDEX "_homepage_v_version_version__status_idx" ON "_homepage_v" USING btree ("version__status");
  CREATE INDEX "_homepage_v_created_at_idx" ON "_homepage_v" USING btree ("created_at");
  CREATE INDEX "_homepage_v_updated_at_idx" ON "_homepage_v" USING btree ("updated_at");
  CREATE INDEX "_homepage_v_latest_idx" ON "_homepage_v" USING btree ("latest");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "images" CASCADE;
  DROP TABLE "photoshoots" CASCADE;
  DROP TABLE "photoshoots_rels" CASCADE;
  DROP TABLE "sections" CASCADE;
  DROP TABLE "sections_rels" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "homepage_featured_sections" CASCADE;
  DROP TABLE "homepage_biography_certifications" CASCADE;
  DROP TABLE "homepage_navigation_items" CASCADE;
  DROP TABLE "homepage" CASCADE;
  DROP TABLE "_homepage_v_version_featured_sections" CASCADE;
  DROP TABLE "_homepage_v_version_biography_certifications" CASCADE;
  DROP TABLE "_homepage_v_version_navigation_items" CASCADE;
  DROP TABLE "_homepage_v" CASCADE;
  DROP TYPE "public"."enum_homepage_navigation_items_type";
  DROP TYPE "public"."enum_homepage_status";
  DROP TYPE "public"."enum__homepage_v_version_navigation_items_type";
  DROP TYPE "public"."enum__homepage_v_version_status";`)
}
