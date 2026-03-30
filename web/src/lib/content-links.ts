export const getSectionHref = (slug: string) => `/works/${slug}`;

export const getPhotoshootHref = (sectionSlug: string, photoshootSlug: string) =>
  `/works/${sectionSlug}/${photoshootSlug}`;
