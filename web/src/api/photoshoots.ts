import { getPhotoshootHref } from "../lib/content-links";
import type { PhotoshootPage } from "../types/content";
import { getSectionPages } from "./sections";

export async function getPhotoshootPages(): Promise<PhotoshootPage[]> {
  const sections = await getSectionPages();

  return sections.flatMap((section) =>
    section.photoshoots.map((photoshoot) => ({
      section,
      photoshoot,
      href: getPhotoshootHref(section.slug, photoshoot.slug),
    })),
  );
}
