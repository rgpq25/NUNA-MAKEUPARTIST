import type { LexicalRichText } from "./richtext";

export type PayloadID = number | string;

export interface PayloadMedia {
	id: number;
	uid: string;
	title: string;
	description: string;
	url: string;
	updatedAt: Date;
	createdAt: Date;
}

export interface PayloadPhotoshoot {
	id: number;
	slug: string;
	title: string;
	description: string;
	mainImage: PayloadMedia;
	images: PayloadMedia[];
}

export interface PayloadSection {
	id: number;
	slug: string;
	title: string;
	mainDescription: string;
	mainImages: Array<PayloadMedia>;
	photoshoots: Array<PayloadPhotoshoot>;
	createdAt: Date;
	updatedAt: Date;
}

export interface PayloadSectionPreview {
	id: number;
	slug: string;
	title: string;
	mainDescription: string;
	mainImages: Array<PayloadMedia>;
}

export interface PayloadHomepage {
	seo: {
		title: string;
		description: string;
	};
	branding: {
		title: string;
		subtitle: string;
	};
	hero: {
		headline: string;
		description: string;
		location: string;
		image?: PayloadMedia;
	};
	biography: {
		title: string;
		content: LexicalRichText;
		certificationsTitle: string;
		certifications: Array<{ title: string }>;
		image?: PayloadMedia;
	};
	featuredSections: Array<{
		section: PayloadSectionPreview;
	}>;
	navigation: {
		items: Array<{
			type: "section" | "contact";
			section: {
				id: number;
				slug: string;
				title: string;
			} | null;
		}>;
	};
}

export interface PayloadDocsResponse<T> {
	docs: T[];
}
