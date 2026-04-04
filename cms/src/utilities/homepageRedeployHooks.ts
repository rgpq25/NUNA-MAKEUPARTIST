import type { Homepage, Image, Photoshoot, Section } from "@/payload-types";
import { getPublishedHomepageLinkedIDs } from "@/utilities/publishedHomepage";
import { triggerFrontendRedeploy } from "@/utilities/triggerFrontendRedeploy";
import {
	APIError,
	type CollectionAfterChangeHook,
	type CollectionBeforeDeleteHook,
	type GlobalAfterChangeHook,
} from "payload";

function isHomepagePublished(doc: Homepage): boolean {
	return doc._status === "published";
}

async function triggerIfLinked(
	req: Parameters<CollectionAfterChangeHook>[0]["req"],
	ids: number[],
	docID: number,
	reason: string,
) {
	if (!ids.includes(docID)) {
		return;
	}

	await triggerFrontendRedeploy({ reason, req });
}

export const redeployAfterHomepageChange: GlobalAfterChangeHook = async ({
	doc,
	req,
}) => {
	if (isHomepagePublished(doc as Homepage)) {
		await triggerFrontendRedeploy({
			reason: "homepage published content changed",
			req,
		});
	}

	return doc;
};

async function assertNotLinkedToPublishedHomepage(
	req: Parameters<CollectionBeforeDeleteHook>[0]["req"],
	id: number | string,
	ids: number[],
	message: string,
) {
	const docID = typeof id === "number" ? id : Number(id);

	if (!ids.includes(docID)) {
		return;
	}

	throw new APIError(message, 400);
}

export const redeployAfterSectionChange: CollectionAfterChangeHook<
	Section
> = async ({ doc, req }) => {
	const { sectionIDs } = await getPublishedHomepageLinkedIDs(req);

	await triggerIfLinked(
		req,
		sectionIDs,
		doc.id,
		` featured section changed (${doc.slug})`,
	);

	return doc;
};

export const redeployAfterPhotoshootChange: CollectionAfterChangeHook<
	Photoshoot
> = async ({ doc, req }) => {
	const { photoshootIDs } = await getPublishedHomepageLinkedIDs(req);

	await triggerIfLinked(
		req,
		photoshootIDs,
		doc.id,
		`featured section photoshoot changed (${doc.slug})`,
	);

	return doc;
};

export const redeployAfterImageChange: CollectionAfterChangeHook<
	Image
> = async ({ doc, req }) => {
	const { imageIDs } = await getPublishedHomepageLinkedIDs(req);

	await triggerIfLinked(
		req,
		imageIDs,
		doc.id,
		`homepage image / featured section image / featured section photoshoot image changed (${doc.id})`,
	);

	return doc;
};

export const preventHomepageSectionDelete: CollectionBeforeDeleteHook = async ({
	id,
	req,
}) => {
	const { sectionIDs } = await getPublishedHomepageLinkedIDs(req);

	await assertNotLinkedToPublishedHomepage(
		req,
		id,
		sectionIDs,
		"This section is used by the published homepage. Remove it from homepage featured sections to delete it.",
	);
};

export const preventHomepagePhotoshootDelete: CollectionBeforeDeleteHook =
	async ({ id, req }) => {
		const { photoshootIDs } = await getPublishedHomepageLinkedIDs(req);

		await assertNotLinkedToPublishedHomepage(
			req,
			id,
			photoshootIDs,
			"This photoshoot is used by the published homepage. Remove it from the linked homepage section to delete it.",
		);
	};

export const preventHomepageImageDelete: CollectionBeforeDeleteHook = async ({
	id,
	req,
}) => {
	const { imageIDs } = await getPublishedHomepageLinkedIDs(req);

	await assertNotLinkedToPublishedHomepage(
		req,
		id,
		imageIDs,
		"This image is used by the published homepage. Remove it from the homepage or its linked content to delete it.",
	);
};
