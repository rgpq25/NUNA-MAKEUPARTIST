import { fallbackHomepageContent } from "../data/home";
import { getSectionHref } from "../lib/content-links";
import type { HomePageContent, NavLink } from "../types/content";
import type {
	PayloadDocsResponse,
	PayloadHomepage,
	PayloadSectionPreview,
} from "../types/payload";
import { fetchPayloadJSON } from "./client";

async function fetchHomepage(): Promise<PayloadHomepage | null> {
	try {
		return await fetchPayloadJSON<PayloadHomepage>(
			"/api/globals/homepage?depth=1&populate[sections][slug]=true&populate[sections][title]=true",
		);
	} catch {
		return null;
	}
}

export async function fetchSectionPreviews(): Promise<
	PayloadSectionPreview[] | null
> {
	try {
		const response = await fetchPayloadJSON<
			PayloadDocsResponse<PayloadSectionPreview>
		>(
			"/api/sections?limit=100&sort=createdAt&select[slug]=true&select[title]=true&select[mainDescription]=true&select[mainImages]=true&populate[mainImages][url]=true&populate[mainImages][filename]=true",
		);

		return response?.docs.length ? response.docs : null;
	} catch {
		return null;
	}
}

async function fetchHomepageContent(): Promise<HomePageContent | null> {
	const [homepagePayload, sectionPreviewsPayload] = await Promise.all([
		fetchHomepage(),
		fetchSectionPreviews(),
	]);

	console.log(JSON.stringify(homepagePayload, null, 2));

	if (!homepagePayload || !sectionPreviewsPayload) {
		return null;
	}

	const { title: seoTitle, description: seoDescription } =
		homepagePayload.seo;

	const { title: brandingTitle, subtitle: brandingSubtitle } =
		homepagePayload.branding;

	const {
		headline: heroHeadline,
		description: heroDescription,
		location: heroLocation,
		image: heroImage,
	} = homepagePayload.hero;

	const {
		title: biographyTitle,
		certificationsTitle: biographyCertificationsTitle,
		image: biographyImage,
	} = homepagePayload.biography;
	const biographyParagraphs = homepagePayload.biography.paragraphs.map(
		(item) => item.text,
	);
	const biographyCertifications =
		homepagePayload.biography.certifications.map((item) => item.title);

	const navigation: NavLink[] = homepagePayload.navigation.items.map(
		(item) => {
			if (item.type === "contact" || !item.section) {
				return {
					label: "Contacto",
					href: "#contacto",
				};
			}

			return {
				label: item.section.title,
				href: `#${item.section.slug}`,
			};
		},
	);

	const sectionPreviews = sectionPreviewsPayload.map((section) => {
		return {
			slug: section.slug,
			title: section.title,
			description: section.mainDescription,
			images: section.mainImages.map((image) => image.url),
			href: getSectionHref(section.slug),
		};
	});

	if (
		!seoTitle ||
		!seoDescription ||
		!brandingTitle ||
		!brandingSubtitle ||
		!heroHeadline ||
		!heroDescription ||
		!heroLocation ||
		!heroImage ||
		!biographyTitle ||
		!biographyImage ||
		!biographyParagraphs ||
		!biographyCertificationsTitle ||
		!biographyCertifications ||
		!navigation
	) {
		return null;
	}

	return {
		seo: {
			title: seoTitle,
			description: seoDescription,
		},
		branding: {
			title: brandingTitle,
			subtitle: brandingSubtitle,
		},
		hero: {
			headline: heroHeadline,
			description: heroDescription,
			location: heroLocation,
			image: heroImage.url,
			imageAlt: brandingTitle,
		},
		biography: {
			title: biographyTitle,
			paragraphs: biographyParagraphs,
			certificationsTitle: biographyCertificationsTitle,
			certifications: biographyCertifications,
			image: biographyImage.url,
			imageAlt: biographyTitle,
		},
		navigation,
		sections: sectionPreviews,
	};
}

export async function getHomepageContent(): Promise<HomePageContent> {
	return (await fetchHomepageContent()) ?? fallbackHomepageContent;
}
