import { isLoggedIn } from "@/access/isLoggedIn";
import { isLoggedInOrPublished } from "@/access/isLoggedInOrPublished";
import {
	AlignFeature,
	BlockquoteFeature,
	BoldFeature,
	FixedToolbarFeature,
	HeadingFeature,
	HorizontalRuleFeature,
	InlineToolbarFeature,
	ItalicFeature,
	LinkFeature,
	OrderedListFeature,
	ParagraphFeature,
	StrikethroughFeature,
	UnderlineFeature,
	UnorderedListFeature,
	lexicalEditor,
} from "@payloadcms/richtext-lexical";
import type { GlobalConfig, Where } from "payload";
import { redeployAfterHomepageChange } from "../utilities/homepageRedeployHooks";

type NavItem = {
	type?: "contact" | "section";
	section?: number | string | { id?: number | string } | null;
};

type FeaturedSection = {
	section?: number | string | { id?: number | string } | null;
};

type HomepageData = {
	featuredSections?: FeaturedSection[] | null;
};

function getRelationID(value: NavItem["section"]) {
	if (typeof value === "string" || typeof value === "number") {
		return String(value);
	}

	if (
		value &&
		(typeof value.id === "string" || typeof value.id === "number")
	) {
		return String(value.id);
	}

	return "";
}

function getFeaturedSectionIDs(data?: HomepageData | null): string[] {
	if (!data?.featuredSections?.length) {
		return [];
	}

	return data.featuredSections
		.map((item) => getRelationID(item?.section))
		.filter((sectionID) => sectionID.length > 0);
}

function getFeaturedSectionFilter(data?: HomepageData | null): Where | false {
	const featuredSectionIDs = getFeaturedSectionIDs(data);

	if (!featuredSectionIDs.length) {
		return false;
	}

	return {
		id: {
			in: featuredSectionIDs,
		},
	};
}

function validateNavigationItems(
	value: unknown[] | null | undefined,
	data?: HomepageData | null,
) {
	const items = value as NavItem[] | null | undefined;

	if (!items?.length) {
		return true;
	}

	const seenSections = new Set<string>();
	const featuredSectionIDs = new Set(getFeaturedSectionIDs(data));
	let contactCount = 0;

	for (const item of items) {
		if (item?.type === "contact") {
			contactCount += 1;
			continue;
		}

		const sectionID = getRelationID(item?.section);

		if (!sectionID) {
			return "Each section link needs a selected section.";
		}

		if (seenSections.has(sectionID)) {
			return "Each section can only appear once in the navigation.";
		}

		if (!featuredSectionIDs.has(sectionID)) {
			return "Navigation sections must already be selected in featured sections.";
		}

		seenSections.add(sectionID);
	}

	if (contactCount > 1) {
		return "Contact can only appear once in the navigation.";
	}

	return true;
}

function validateFeaturedSections(value: unknown[] | null | undefined) {
	const items = value as FeaturedSection[] | null | undefined;

	if (!items?.length) {
		return true;
	}

	const seenSections = new Set<string>();

	for (const item of items) {
		const sectionID = getRelationID(item?.section);

		if (!sectionID) {
			return "Each featured item needs a selected section.";
		}

		if (seenSections.has(sectionID)) {
			return "Each section can only appear once in featured sections.";
		}

		seenSections.add(sectionID);
	}

	return true;
}

export const Homepage: GlobalConfig = {
	slug: "homepage",
	access: {
		read: isLoggedInOrPublished,
		update: isLoggedIn,
	},
	admin: {
		description:
			"Editable homepage content consumed by the Astro frontend.",
	},
	versions: {
		drafts: true,
	},
	hooks: {
		afterChange: [redeployAfterHomepageChange],
	},
	fields: [
		{
			name: "seo",
			type: "group",
			fields: [
				{
					name: "title",
					type: "text",
					defaultValue: "NUNA Makeup Artist | Home",
				},
				{
					name: "description",
					type: "textarea",
					defaultValue:
						"Landing page editorial para NUNA Makeup Artist, creada a partir del export de Figma.",
				},
			],
		},
		{
			name: "branding",
			type: "group",
			fields: [
				{
					name: "title",
					type: "text",
					required: true,
					defaultValue: "NUNA",
				},
				{
					name: "subtitle",
					type: "text",
					required: true,
					defaultValue: "Makeup Artist",
				},
			],
		},
		{
			name: "hero",
			type: "group",
			fields: [
				{
					name: "headline",
					type: "text",
					required: true,
					defaultValue:
						"Maquillaje editorial y novias con un enfoque atemporal",
				},
				{
					name: "description",
					type: "textarea",
					required: true,
					defaultValue:
						"Especializada en crear belleza que trasciende tendencias. Desde bodas intimas hasta campanas de alta moda, cada trabajo refleja sofisticacion, tecnica impecable y una vision artistica unica.",
				},
				{
					name: "location",
					type: "text",
					required: true,
					defaultValue:
						"Basada en Madrid · Disponible internacionalmente",
				},
				{
					name: "image",
					type: "relationship",
					relationTo: "images",
					required: true,
				},
			],
		},
		{
			name: "featuredSections",
			type: "array",
			validate: (value) =>
				validateFeaturedSections(value as unknown[] | null | undefined),
			admin: {
				description:
					"Choose which sections appear on the homepage. Drag to control display order.",
			},
			fields: [
				{
					name: "section",
					type: "relationship",
					relationTo: "sections",
					required: true,
				},
			],
		},
		{
			name: "navigation",
			type: "group",
			fields: [
				{
					name: "items",
					type: "array",
					minRows: 1,
					maxRows: 4,
					validate: (value, { data }) =>
						validateNavigationItems(
							value as unknown[] | null | undefined,
							data as HomepageData | null | undefined,
						),
					admin: {
						description:
							"Select up to four homepage anchors. Use existing sections or the fixed Contact anchor.",
					},
					fields: [
						{
							name: "type",
							type: "select",
							required: true,
							defaultValue: "section",
							options: [
								{
									label: "Section",
									value: "section",
								},
								{
									label: "Contact",
									value: "contact",
								},
							],
						},
						{
							name: "section",
							type: "relationship",
							relationTo: "sections",
							filterOptions: ({ data }) =>
								getFeaturedSectionFilter(
									data as HomepageData | null | undefined,
								),
							admin: {
								condition: (
									_: unknown,
									siblingData?: {
										type?: "contact" | "section";
									},
								) => siblingData?.type === "section",
							},
							validate: (
								value: unknown,
								{
									siblingData,
								}: {
									siblingData?: {
										type?: "contact" | "section";
									};
								},
							) => {
								if (siblingData?.type === "section" && !value) {
									return "Select a section.";
								}

								return true;
							},
						},
					],
				},
			],
		},
		{
			name: "biography",
			type: "group",
			fields: [
				{
					name: "title",
					type: "text",
					required: true,
					defaultValue: "Biografia",
				},
				{
					name: "image",
					type: "relationship",
					relationTo: "images",
					required: true,
				},
				{
					name: "content",
					type: "richText",
					required: true,
					editor: lexicalEditor({
						features: () => [
							BoldFeature(),
							ItalicFeature(),
							UnderlineFeature(),
							StrikethroughFeature(),
							ParagraphFeature(),
							HeadingFeature(),
							AlignFeature(),
							UnorderedListFeature(),
							OrderedListFeature(),
							LinkFeature({
								enabledCollections: [],
							}),
							BlockquoteFeature(),
							HorizontalRuleFeature(),
							InlineToolbarFeature(),
							FixedToolbarFeature(),
						],
					}),
				},
				{
					name: "certificationsTitle",
					type: "text",
					defaultValue: "Certificaciones",
				},
				{
					name: "certifications",
					type: "array",
					fields: [
						{
							name: "title",
							type: "text",
							required: true,
						},
					],
				},
			],
		},
		{
			name: "contact",
			type: "group",
			fields: [
				{
					name: "title",
					type: "text",
					required: true,
					defaultValue: "Contacto",
				},
				{
					name: "description",
					type: "textarea",
					required: true,
					defaultValue:
						"¿Lista para transformar tu visión en realidad? Contáctame para reservas, colaboraciones o consultas sobre servicios personalizados.",
				},
				{
					name: "horario",
					type: "textarea",
					required: true,
					defaultValue:
						"Lunes - Sabado: 9:00 - 20:00\nDomingo: Consultar disponibilidad",
				},
				{
					name: "socials",
					type: "array",
					admin: {
						description:
							"Add the contact links to show and drag to control display order.",
					},
					fields: [
						{
							name: "type",
							type: "select",
							required: true,
							options: [
								{
									label: "Email",
									value: "email",
								},
								{
									label: "Telephone",
									value: "telephone",
								},
								{
									label: "Instagram",
									value: "instagram",
								},
								{
									label: "TikTok",
									value: "tiktok",
								},
								{
									label: "Facebook",
									value: "facebook",
								},
								{
									label: "Other",
									value: "other",
								},
							],
						},
						{
							name: "url",
							type: "text",
							required: true,
						},
						{
							name: "label",
							type: "text",
							admin: {
								description:
									"Optional. If left empty, the URL/value will be shown.",
							},
						},
					],
				},
			],
		},
	],
};
