import { getPhotoshootHref } from "../lib/content-links";
import type { PhotoshootPage } from "../types/content";
import { getFeaturedSectionPages, getSectionPageBySlug } from "./sections";

/*
[
  { sectionSlug: "fashion", photoshootSlug: "summer-2025" },
  { sectionSlug: "fashion", photoshootSlug: "winter-2025" },
  { sectionSlug: "sports", photoshootSlug: "nike-campaign" },
]
*/
export async function getPhotoshootSlugs(): Promise<
	Array<{ sectionSlug: string; photoshootSlug: string }>
> {
	const sections = await getFeaturedSectionPages();

	return sections.flatMap((section) =>
		section.photoshoots.map((photoshoot) => ({
			sectionSlug: section.slug,
			photoshootSlug: photoshoot.slug,
		})),
	);
}

export async function getPhotoshootPageBySlug(
	sectionSlug: string,
	photoshootSlug: string,
): Promise<PhotoshootPage | null> {
	const section = await getSectionPageBySlug(sectionSlug);

	if (!section) {
		return null;
	}

	const photoshoot = section.photoshoots.find(
		(item) => item.slug === photoshootSlug,
	);

	if (!photoshoot) {
		return null;
	}

	return {
		section,
		photoshoot,
		href: getPhotoshootHref(section.slug, photoshoot.slug),
	};
}
