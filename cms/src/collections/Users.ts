import { isLoggedIn } from "@/access/isLoggedIn";
import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
	slug: "users",
	access: {
		create: isLoggedIn,
		read: isLoggedIn,
		update: isLoggedIn,
		delete: isLoggedIn,
	},
	admin: {
		useAsTitle: "email",
	},
	auth: true,
	fields: [],
};
