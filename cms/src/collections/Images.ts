import { isLoggedIn } from "@/access/isLoggedIn";
import { isLoggedInOrHomepageLinkedImage } from "@/access/isLoggedInOrHomepageLinked";
import type { CollectionConfig } from "payload";

const isProduction = process.env.NODE_ENV === "production";

export const Images: CollectionConfig = {
	slug: "images",
	access: {
		create: isLoggedIn,
		read: isLoggedInOrHomepageLinkedImage,
		update: isLoggedIn,
		delete: isLoggedIn,
	},
	admin: {
		useAsTitle: "title",
		defaultColumns: ["title", "uid", "updatedAt"],
	},
	upload: {
		staticDir: isProduction ? undefined : "media",
		mimeTypes: ["image/*"],
	},
	fields: [
		{
			name: "title",
			type: "text",
			required: true,
		},
		{
			name: "description",
			type: "textarea",
		},
		{
			name: "uid",
			type: "text",
			required: true,
			unique: true,
			admin: {
				position: "sidebar",
				readOnly: true,
			},
			hooks: {
				beforeValidate: [
					({ value }: { value?: unknown }) => {
						if (typeof value === "string" && value.trim()) {
							return value;
						}

						return crypto.randomUUID();
					},
				],
			},
		},
	],
};
