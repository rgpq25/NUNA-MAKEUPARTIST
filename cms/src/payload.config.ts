import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import path from "node:path";
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { buildConfig } from "payload";
import { Images } from "./collections/Images";
import { Photoshoots } from "./collections/Photoshoots";
import { Sections } from "./collections/Sections";
import { Users } from "./collections/Users";
import { Homepage } from "./globals/Homepage";

function getEnv(name: string): string {
	const value = process.env[name];

	if (!value) {
		throw new Error(`Missing environment variable: ${name}`);
	}

	return value;
}

function getNumberEnv(name: string): number {
	const value = Number(getEnv(name));

	if (Number.isNaN(value)) {
		throw new Error(`Environment variable ${name} must be a number`);
	}

	return value;
}

function getBooleanEnv(name: string): boolean {
	return getEnv(name).toLowerCase() === "true";
}

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const frontendURL = getEnv("FRONTEND_URL");
const isProduction = process.env.NODE_ENV === "production";

const plugins = isProduction
	? [
		s3Storage({
			collections: {
				images: true,
			},
			bucket: getEnv("S3_BUCKET"),
			config: {
				credentials: {
					accessKeyId: getEnv("S3_ACCESS_KEY_ID"),
					secretAccessKey: getEnv("S3_SECRET_ACCESS_KEY"),
				},
				endpoint: getEnv("S3_ENDPOINT"),
				forcePathStyle: getBooleanEnv("S3_FORCE_PATH_STYLE"),
				region: getEnv("S3_REGION"),
			},
		}),
	]
	: [];

const db = isProduction
	? postgresAdapter({
			pool: {
				connectionString: getEnv("DATABASE_URL"),
			},
		})
	: sqliteAdapter({
			client: {
				url: "file:./payload.db",
				
			},
		});

export default buildConfig({
	admin: {
		user: Users.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
	},
	collections: [Users, Images, Photoshoots, Sections],
	globals: [Homepage],
	plugins,
	editor: lexicalEditor(),
	email: nodemailerAdapter({
		defaultFromAddress: getEnv("EMAIL_FROM_ADDRESS"),
		defaultFromName: getEnv("EMAIL_FROM_NAME"),
		transportOptions: {
			host: getEnv("SMTP_HOST"),
			port: getNumberEnv("SMTP_PORT"),
			secure: getBooleanEnv("SMTP_SECURE"),
			auth: {
				user: getEnv("SMTP_USER"),
				pass: getEnv("SMTP_PASS"),
			},
		},
	}),
	secret: getEnv("PAYLOAD_SECRET"),
	serverURL: getEnv("NEXT_PUBLIC_SERVER_URL"),
	cors: [frontendURL],
	db,
	sharp,
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
});
