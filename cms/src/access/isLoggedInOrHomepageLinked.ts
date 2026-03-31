import type { Homepage, Photoshoot, Section } from "@/payload-types";
import type { Access, PayloadRequest, Where } from "payload";

type HomepageLinkedIDs = {
	imageIDs: number[];
	photoshootIDs: number[];
	sectionIDs: number[];
};

const emptyHomepageLinkedIDs: HomepageLinkedIDs = {
	imageIDs: [],
	photoshootIDs: [],
	sectionIDs: [],
};

function addRelationID(ids: Set<number>, value: number | { id: number }) {
	let id: number | null = null;
	if (typeof value === "number") {
		id = value;
	}

	if (typeof value === "object") {
		id = value.id;
	}

	if (id !== null) ids.add(id);
}

function isPopulatedSection(
	value: number | Section | null | undefined,
): value is Section {
	return typeof value === "object" && value !== null;
}

function isPopulatedPhotoshoot(
	value: number | Photoshoot | null | undefined,
): value is Photoshoot {
	return typeof value === "object" && value !== null;
}

async function getHomepageLinkedIDs(
	req: PayloadRequest,
): Promise<HomepageLinkedIDs> {
	const homepageLinkedIDsPromise = (async () => {
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
			})) as Pick<
				Homepage,
				"_status" | "biography" | "featuredSections" | "hero"
			>;

			if (homepage._status !== "published") {
				return emptyHomepageLinkedIDs;
			}

			const sectionIDs = new Set<number>();
			const photoshootIDs = new Set<number>();
			const imageIDs = new Set<number>();

			addRelationID(imageIDs, homepage.hero.image);
			addRelationID(imageIDs, homepage.biography.image);

			for (const featuredSection of homepage.featuredSections ?? []) {
				addRelationID(sectionIDs, featuredSection.section);

				if (!isPopulatedSection(featuredSection.section)) {
					continue;
				}

				for (const image of featuredSection.section.mainImages) {
					addRelationID(imageIDs, image);
				}

				for (const photoshoot of featuredSection.section.photoshoots) {
					addRelationID(photoshootIDs, photoshoot);

					if (!isPopulatedPhotoshoot(photoshoot)) {
						continue;
					}

					addRelationID(imageIDs, photoshoot.mainImage);

					for (const image of photoshoot.images ?? []) {
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
	})();

	return homepageLinkedIDsPromise;
}

function createIDReadConstraint(ids: number[]): Where | false {
	if (!ids.length) {
		return false;
	}

	return {
		id: {
			in: ids,
		},
	};
}

export const isLoggedInOrHomepageLinkedSection: Access = async ({ req }) => {
	if (req.user) {
		return true;
	}

	const { sectionIDs } = await getHomepageLinkedIDs(req);

	return createIDReadConstraint(sectionIDs);
};

export const isLoggedInOrHomepageLinkedPhotoshoot: Access = async ({ req }) => {
	if (req.user) {
		return true;
	}

	const { photoshootIDs } = await getHomepageLinkedIDs(req);

	return createIDReadConstraint(photoshootIDs);
};

export const isLoggedInOrHomepageLinkedImage: Access = async ({ req }) => {
	if (req.user) {
		return true;
	}

	const { imageIDs } = await getHomepageLinkedIDs(req);

	return createIDReadConstraint(imageIDs);
};
