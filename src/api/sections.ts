import { fallbackSectionPages } from "../data/home";
import type { Photoshoot, SectionPageContent } from "../types/content";
import type { PayloadDocsResponse, PayloadSection } from "../types/payload";
import { fetchPayloadJSON, resolvePayloadAssetURL } from "./client";

async function fetchSectionPayload(): Promise<PayloadSection[] | null> {
	try {
		const response = await fetchPayloadJSON<
			PayloadDocsResponse<PayloadSection>
		>("/api/sections?depth=3&limit=100&sort=createdAt");

		return response?.docs.length ? response.docs : null;
	} catch {
		return null;
	}
}

export async function fetchSectionPages(): Promise<
	SectionPageContent[] | null
> {
	const sectionPayload = await fetchSectionPayload();

	if (!sectionPayload) {
		return null;
	}

	const sections: SectionPageContent[] = sectionPayload.map((section) => {
		const photoshoots: Photoshoot[] = section.photoshoots.map(
			(photoshoot) => ({
				slug: photoshoot.slug,
				title: photoshoot.title,
				description: photoshoot.description,
				mainImage: resolvePayloadAssetURL(photoshoot.mainImage.url),
				images: photoshoot.images.map((image) =>
					resolvePayloadAssetURL(image.url),
				),
			}),
		);

		return {
			slug: section.slug,
			title: section.title,
			description: section.mainDescription,
			photoshoots,
		};
	});

	return sections.length ? sections : null;
}

export async function getSectionPages(): Promise<SectionPageContent[]> {
	return (await fetchSectionPages()) ?? fallbackSectionPages;
}
