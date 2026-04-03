import type { Homepage } from "@/payload-types";
import type { PayloadRequest } from "payload";

export type HomepageLinkedIDs = {
	imageIDs: number[];
	photoshootIDs: number[];
	sectionIDs: number[];
};

const emptyHomepageLinkedIDs: HomepageLinkedIDs = {
	imageIDs: [],
	photoshootIDs: [],
	sectionIDs: [],
};

function addRelationID(
	ids: Set<number>,
	value:
		| number
		| {
				id: number;
		  }
		| null
		| undefined,
) {
	let id: number | null = null;

	if (typeof value === "number") {
		id = value;
	}

	if (value && typeof value === "object") {
		id = value.id;
	}

	if (id !== null) {
		ids.add(id);
	}
}

type PublishedHomepage = Pick<
	Homepage,
	"_status" | "biography" | "featuredSections" | "hero"
>;

type HomepageSection = {
	id: number;
	mainImages: ({ id: number } | number)[];
	photoshoots: (HomepagePhotoshoot | number)[];
};

type HomepagePhotoshoot = {
	id: number;
	mainImage: { id: number } | number;
	images?: ({ id: number } | number)[] | null;
};

export async function getPublishedHomepageLinkedIDs(
	req: PayloadRequest,
): Promise<HomepageLinkedIDs> {
	try {
		const homepage = (await req.payload.findGlobal({
			slug: "homepage",
			depth: 3,
			draft: false,
			overrideAccess: true,
			req,
			select: {
				_status: true,
				hero: {
					image: true,
				},
				biography: {
					image: true,
				},
				featuredSections: {
					section: true,
				},
			},
		})) as PublishedHomepage;

		if (homepage._status !== "published") {
			return emptyHomepageLinkedIDs;
		}

		const imageIDs = new Set<number>();
		const sectionIDs = new Set<number>();
		const photoshootIDs = new Set<number>();

		addRelationID(imageIDs, homepage.hero.image);
		addRelationID(imageIDs, homepage.biography.image);

		for (const featuredSection of homepage.featuredSections ?? []) {
			addRelationID(sectionIDs, featuredSection.section);

			if (
				featuredSection.section === null ||
				typeof featuredSection.section !== "object"
			) {
				continue;
			}

			const section = featuredSection.section as HomepageSection;

			for (const image of section.mainImages) {
				addRelationID(imageIDs, image);
			}

			for (const photoshoot of section.photoshoots) {
				addRelationID(photoshootIDs, photoshoot);

				if (photoshoot === null || typeof photoshoot !== "object") {
					continue;
				}

				const homepagePhotoshoot = photoshoot as HomepagePhotoshoot;

				addRelationID(imageIDs, homepagePhotoshoot.mainImage);

				for (const image of homepagePhotoshoot.images ?? []) {
					addRelationID(imageIDs, image);
				}
			}
		}

		return {
			imageIDs: [...imageIDs],
			photoshootIDs: [...photoshootIDs],
			sectionIDs: [...sectionIDs],
		};
	} catch {
		return emptyHomepageLinkedIDs;
	}
}
