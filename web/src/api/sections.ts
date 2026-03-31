import { fallbackSectionPages } from "../data/home";
import type { Photoshoot, SectionPageContent } from "../types/content";
import type { PayloadDocsResponse, PayloadSection } from "../types/payload";
import { fetchPayloadJSON, resolvePayloadAssetURL } from "./client";
import { fetchHomepage } from "./homepage";

async function fetchFeaturedSectionsPayload(
	sectionIDs: string[],
): Promise<PayloadSection[] | null> {
	if (!sectionIDs.length) {
		return null;
	}

	const queryParams = new URLSearchParams({
		depth: "2",
		limit: String(sectionIDs.length),
	});

	sectionIDs.forEach((sectionID, index) => {
		queryParams.append(`where[id][in][${index}]`, sectionID);
	});

	try {
		const response = await fetchPayloadJSON<
			PayloadDocsResponse<PayloadSection>
		>(`/api/sections?${queryParams.toString()}`);

		return response?.docs.length ? response.docs : null;
	} catch {
		return null;
	}
}

async function fetchFeaturedSectionPages(): Promise<
	SectionPageContent[] | null
> {
	const homepagePayload = await fetchHomepage();

	if (!homepagePayload || homepagePayload.featuredSections.length === 0) {
		return null;
	}

	const sectionIDs = homepagePayload.featuredSections.map((item) =>
		String(item.section.id),
	);

	const featuredSectionIDs = sectionIDs.length > 0 ? sectionIDs : null;

	if (!featuredSectionIDs) {
		return null;
	}

	const sectionPayload =
		await fetchFeaturedSectionsPayload(featuredSectionIDs);

	if (!sectionPayload) {
		return null;
	}

	const sectionsByID = new Map(
		sectionPayload.map((section) => [String(section.id), section]),
	);

	const sections: SectionPageContent[] = featuredSectionIDs
		.map((sectionID) => sectionsByID.get(sectionID))
		.filter((section): section is PayloadSection => Boolean(section))
		.map((section) => {
			const photoshoots: Photoshoot[] = section.photoshoots.map(
				(photoshoot) => ({
					slug: photoshoot.slug,
					title: photoshoot.title,
					description: photoshoot.description,
					mainImage: {
						src: resolvePayloadAssetURL(photoshoot.mainImage.url),
						title: photoshoot.mainImage.title,
						description:
							photoshoot.mainImage.description ?? undefined,
					},
					images: photoshoot.images.map((image) => ({
						src: resolvePayloadAssetURL(image.url),
						title: image.title,
						description: image.description ?? undefined,
					})),
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

export async function getFeaturedSectionPages(): Promise<SectionPageContent[]> {
	return (await fetchFeaturedSectionPages()) ?? fallbackSectionPages;
}
