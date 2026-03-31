import { isLoggedIn } from "@/access/isLoggedIn";
import { isLoggedInOrHomepageLinkedSection } from "@/access/isLoggedInOrHomepageLinked";
import type { CollectionConfig } from "payload";
import { slugify } from "../utilities/slugify";

export const Sections: CollectionConfig = {
	slug: "sections",
	access: {
		create: isLoggedIn,
		read: isLoggedInOrHomepageLinkedSection,
		update: isLoggedIn,
		delete: isLoggedIn,
	},
	admin: {
		useAsTitle: "title",
		defaultColumns: ["title", "slug", "updatedAt"],
		description:
			"Homepage sections. Each section must reference at least one photoshoot.",
	},
	fields: [
		{
			name: "slug",
			type: "text",
			required: true,
			unique: true,
			index: true,
			admin: {
				position: "sidebar",
			},
			hooks: {
				beforeValidate: [
					({
						value,
						siblingData,
					}: {
						value?: unknown;
						siblingData?: { title?: unknown };
					}) => {
						if (typeof value === "string" && value.trim()) {
							return slugify(value);
						}

						return slugify(siblingData?.title);
					},
				],
			},
			validate: (value: unknown) => {
				if (typeof value !== "string" || !value.trim()) {
					return "Slug is required.";
				}

				return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
					? true
					: "Use lowercase letters, numbers, and hyphens only.";
			},
		},
		{
			name: "title",
			type: "text",
			required: true,
		},
		{
			name: "mainDescription",
			type: "textarea",
			required: true,
		},
		{
			name: "mainImages",
			label: "Main images",
			type: "relationship",
			relationTo: "images",
			hasMany: true,
			required: true,
			minRows: 1,
		},
		{
			name: "photoshoots",
			type: "relationship",
			relationTo: "photoshoots",
			hasMany: true,
			required: true,
			minRows: 1,
		},
	],
};
