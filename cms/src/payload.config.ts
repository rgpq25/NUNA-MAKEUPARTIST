import { postgresAdapter } from "@payloadcms/db-postgres";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Images } from "./collections/Images";
import { Photoshoots } from "./collections/Photoshoots";
import { Sections } from "./collections/Sections";
import { Users } from "./collections/Users";
import { Homepage } from "./globals/Homepage";
import { getBooleanEnv, getNumberEnv, getStringEnv } from "./utilities/getEnv";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const frontendURL = getStringEnv("FRONTEND_URL");
const isProduction = process.env.NODE_ENV === "production";

const plugins = isProduction
	? [
			s3Storage({
				collections: {
					images: true,
				},
				bucket: getStringEnv("S3_BUCKET"),
				config: {
					credentials: {
						accessKeyId: getStringEnv("S3_ACCESS_KEY_ID"),
						secretAccessKey: getStringEnv("S3_SECRET_ACCESS_KEY"),
					},
					endpoint: getStringEnv("S3_ENDPOINT"),
					forcePathStyle: getBooleanEnv("S3_FORCE_PATH_STYLE"),
					region: getStringEnv("S3_REGION"),
				},
			}),
		]
	: [];

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
		defaultFromAddress: getStringEnv("EMAIL_FROM_ADDRESS"),
		defaultFromName: getStringEnv("EMAIL_FROM_NAME"),
		transportOptions: {
			host: getStringEnv("SMTP_HOST"),
			port: getNumberEnv("SMTP_PORT"),
			secure: getBooleanEnv("SMTP_SECURE"),
			auth: {
				user: getStringEnv("SMTP_USER"),
				pass: getStringEnv("SMTP_PASS"),
			},
		},
	}),
	secret: getStringEnv("PAYLOAD_SECRET"),
	serverURL: getStringEnv("NEXT_PUBLIC_SERVER_URL"),
	cors: [frontendURL],
	db: postgresAdapter({
		pool: {
			connectionString: getStringEnv("DATABASE_URL"),
		},
	}),
	sharp,
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
});
