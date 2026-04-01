import type { Photoshoot, SectionPageContent } from "../types/content";
import type {
	PayloadDocsResponse,
	PayloadHomepage,
	PayloadSection,
} from "../types/payload";
import { fetchPayloadJSON, resolvePayloadAssetURL } from "./client";

function mapPayloadSection(section: PayloadSection): SectionPageContent {
	const photoshoots: Photoshoot[] = section.photoshoots.map((photoshoot) => ({
		slug: photoshoot.slug,
		title: photoshoot.title,
		description: photoshoot.description,
		mainImage: {
			src: resolvePayloadAssetURL(photoshoot.mainImage.url),
			title: photoshoot.mainImage.title,
			description: photoshoot.mainImage.description ?? undefined,
		},
		images: photoshoot.images.map((image) => ({
			src: resolvePayloadAssetURL(image.url),
			title: image.title,
			description: image.description ?? undefined,
		})),
	}));

	return {
		slug: section.slug,
		title: section.title,
		description: section.mainDescription,
		photoshoots,
	};
}

export async function getFeaturedSectionPages(): Promise<SectionPageContent[]> {
	try {
		const homepagePayload = await fetchPayloadJSON<
			Pick<PayloadHomepage, "featuredSections">
		>("/api/globals/homepage?depth=2&select[featuredSections]=true");

		if (!homepagePayload || homepagePayload.featuredSections.length === 0) {
			return [];
		}

		const sections: SectionPageContent[] = homepagePayload.featuredSections
			.map((item) => item.section)
			.map(mapPayloadSection);

		return sections;
	} catch {
		return [];
	}
}

export async function getSectionPageBySlug(
	sectionSlug: string,
): Promise<SectionPageContent | null> {
	try {
		const queryParams = new URLSearchParams({
			depth: "2",
			limit: "1",
		});
		queryParams.append("where[slug][equals]", sectionSlug);

		const response = await fetchPayloadJSON<
			PayloadDocsResponse<PayloadSection>
		>(`/api/sections?${queryParams.toString()}`);

		const section = response?.docs[0] ?? null;

		if (!section) {
			return null;
		}

		return mapPayloadSection(section);
	} catch {
		return null;
	}
}
