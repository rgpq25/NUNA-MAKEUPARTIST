import { getPublishedHomepageLinkedIDs } from "@/utilities/publishedHomepage";
import type { Access, Where } from "payload";

function createIDReadConstraint(ids: number[]): Where {
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

	const { sectionIDs } = await getPublishedHomepageLinkedIDs(req);

	return createIDReadConstraint(sectionIDs);
};

export const isLoggedInOrHomepageLinkedPhotoshoot: Access = async ({ req }) => {
	if (req.user) {
		return true;
	}

	const { photoshootIDs } = await getPublishedHomepageLinkedIDs(req);

	return createIDReadConstraint(photoshootIDs);
};

export const isLoggedInOrHomepageLinkedImage: Access = async ({ req }) => {
	if (req.user) {
		return true;
	}

	const { imageIDs } = await getPublishedHomepageLinkedIDs(req);

	return createIDReadConstraint(imageIDs);
};
