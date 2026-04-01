import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildConfig } from "payload";
import sharp from "sharp";
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

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const frontendURL = getEnv("FRONTEND_URL");

export default buildConfig({
	admin: {
		user: Users.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
	},
	collections: [Users, Images, Photoshoots, Sections],
	globals: [Homepage],
	editor: lexicalEditor(),
	secret: getEnv("PAYLOAD_SECRET"),
	serverURL: getEnv("NEXT_PUBLIC_SERVER_URL"),
	cors: [frontendURL],
	db: postgresAdapter({
		pool: {
			connectionString: getEnv("DATABASE_URL"),
		},
	}),
	sharp,
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
});
