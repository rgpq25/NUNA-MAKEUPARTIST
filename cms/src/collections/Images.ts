import type { CollectionConfig } from "payload";

export const Images: CollectionConfig = {
	slug: "images",
	access: {
		read: () => true,
	},
	admin: {
		useAsTitle: "title",
		defaultColumns: ["title", "uid", "updatedAt"],
	},
	upload: {
		staticDir: "media",
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
