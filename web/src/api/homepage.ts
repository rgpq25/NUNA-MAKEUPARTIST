import { getSectionHref } from "../lib/content-links";
import type { HomePageContent, NavLink } from "../types/content";
import type { PayloadHomepage } from "../types/payload";
import { fetchPayloadJSON, resolvePayloadAssetURL } from "./client";

export async function fetchHomepage(): Promise<PayloadHomepage | null> {
	try {
		return await fetchPayloadJSON<PayloadHomepage>(
			"/api/globals/homepage?depth=2",
		);
	} catch {
		return null;
	}
}

export async function getHomepageSeo(): Promise<HomePageContent["seo"]> {
	try {
		const response = await fetchPayloadJSON<Pick<PayloadHomepage, "seo">>(
			"/api/globals/homepage?select[seo]=true",
		);

		return {
			title: response.seo.title,
			description: response.seo.description,
		};
	} catch {
		return {
			title: "Makeup Artist",
			description: "Sitio temporalmente en construcción.",
		};
	}
}

export async function getHomepageContent(): Promise<HomePageContent | null> {
	const homepagePayload = await fetchHomepage();

	if (!homepagePayload || Object.keys(homepagePayload).length === 0) {
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
		content: biographyContent,
		certificationsTitle: biographyCertificationsTitle,
		image: biographyImage,
	} = homepagePayload.biography;
	const biographyCertifications =
		homepagePayload.biography.certifications.map((item) => item.title);
		
	const contactSocials = homepagePayload.contact.socials
		.map((item) => ({
			type: item.type,
			url: item.url.trim(),
			label: item.label?.trim() || undefined,
		}))
		.filter((item) => item.url.length > 0);

	const navigation: NavLink[] = homepagePayload.navigationItems.map(
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

	const sectionPreviews = homepagePayload.featuredSections
		.map((item) => item.section)
		.map((section) => {
			return {
				slug: section.slug,
				title: section.title,
				description: section.mainDescription,
				images: section.mainImages.map((image) => ({
					src: resolvePayloadAssetURL(image.url),
					title: image.title,
					description: image.description ?? undefined,
				})),
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
		!biographyContent ||
		!biographyImage ||
		!biographyCertificationsTitle ||
		!homepagePayload.contact.title ||
		!homepagePayload.contact.description ||
		!homepagePayload.contact.horario ||
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
			image: {
				src: resolvePayloadAssetURL(heroImage.url),
				title: heroImage.title,
				description: heroImage.description ?? undefined,
			},
			imageAlt: brandingTitle,
		},
		biography: {
			title: biographyTitle,
			content: biographyContent,
			certificationsTitle: biographyCertificationsTitle,
			certifications: biographyCertifications,
			image: {
				src: resolvePayloadAssetURL(biographyImage.url),
				title: biographyImage.title,
				description: biographyImage.description ?? undefined,
			},
			imageAlt: biographyTitle,
		},
		contact: {
			title: homepagePayload.contact.title,
			description: homepagePayload.contact.description,
			horario: homepagePayload.contact.horario,
			socials: contactSocials,
		},
		navigation: navigation,
		sections: sectionPreviews,
	};
}
