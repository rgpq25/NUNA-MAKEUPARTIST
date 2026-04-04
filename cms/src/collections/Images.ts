import { isLoggedIn } from "@/access/isLoggedIn";
import { isLoggedInOrHomepageLinkedImage } from "@/access/isLoggedInOrHomepageLinked";
import {
	preventHomepageImageDelete,
	redeployAfterImageChange,
} from "@/utilities/homepageRedeployHooks";
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
		defaultColumns: ["fileName", "title", "updatedAt"],
	},
	hooks: {
		afterChange: [redeployAfterImageChange],
		beforeDelete: [preventHomepageImageDelete],
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
	],
};
