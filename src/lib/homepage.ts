import {
  fallbackHomepageContent,
  fallbackSectionPages,
  fallbackSections,
  getSectionHref,
  type HomePageContent,
  type NavLink,
  type Photoshoot,
  type PreviewSection,
  type SectionPageContent,
} from "../data/home";

type PayloadID = number | string;

type PayloadMedia = {
  id?: PayloadID;
  title?: string | null;
  description?: string | null;
  url?: string | null;
};

type PayloadSection = {
  id?: PayloadID;
  slug?: string | null;
  title?: string | null;
  mainDescription?: string | null;
  mainImages?: Array<PayloadMedia | PayloadID> | null;
  photoshoots?: Array<PayloadPhotoshoot | PayloadID> | null;
};

type PayloadPhotoshoot = {
  id?: PayloadID;
  slug?: string | null;
  title?: string | null;
  description?: string | null;
  mainImage?: PayloadMedia | PayloadID | null;
  images?: Array<PayloadMedia | PayloadID> | null;
};

type PayloadHomepage = {
  seo?: {
    title?: string | null;
    description?: string | null;
  } | null;
  branding?: {
    title?: string | null;
    subtitle?: string | null;
  } | null;
  hero?: {
    headline?: string | null;
    description?: string | null;
    location?: string | null;
    image?: PayloadMedia | PayloadID | null;
  } | null;
  biography?: {
    title?: string | null;
    image?: PayloadMedia | PayloadID | null;
    paragraphs?: Array<{ text?: string | null }> | null;
    certificationsTitle?: string | null;
    certifications?: Array<{ title?: string | null }> | null;
  } | null;
  navigation?: {
    items?: Array<{
      type?: "section" | "contact" | null;
      section?: PayloadSection | PayloadID | null;
    }> | null;
  } | null;
};

type PayloadDocsResponse<T> = {
  docs?: T[];
};

const payloadAPIURL = normalizeURL(import.meta.env.PAYLOAD_API_URL);
const payloadToken = getOptionalEnv("PAYLOAD_API_TOKEN");

function getOptionalEnv(key: "PAYLOAD_API_TOKEN" | "PAYLOAD_API_URL") {
  return import.meta.env[key] as string | undefined;
}

function normalizeURL(value: string | undefined) {
  return value?.replace(/\/$/, "") ?? "";
}

function isPayloadMedia(value: PayloadID | PayloadMedia | null | undefined): value is PayloadMedia {
  return typeof value === "object" && value !== null;
}

function getRelationID(value: PayloadID | { id?: PayloadID } | null | undefined) {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (value && (typeof value.id === "string" || typeof value.id === "number")) {
    return String(value.id);
  }

  return "";
}

function toAbsoluteMediaURL(url: string | null | undefined) {
  if (!url) {
    return "";
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  if (!payloadAPIURL) {
    return url;
  }

  return new URL(url, `${payloadAPIURL}/`).toString();
}

function getMediaURL(value: PayloadID | PayloadMedia | null | undefined) {
  if (!isPayloadMedia(value)) {
    return "";
  }

  return toAbsoluteMediaURL(value.url);
}

function getMediaAlt(value: PayloadID | PayloadMedia | null | undefined, fallback: string) {
  if (!isPayloadMedia(value)) {
    return fallback;
  }

  return value.title?.trim() || value.description?.trim() || fallback;
}

function isPreviewSection(value: PreviewSection | null): value is PreviewSection {
  return value !== null;
}

function isSectionPageContent(value: SectionPageContent | null): value is SectionPageContent {
  return value !== null;
}

function isPhotoshoot(value: Photoshoot | null): value is Photoshoot {
  return value !== null;
}

function isDefinedString(value: string | undefined): value is string {
  return Boolean(value);
}

function mapSection(section: PayloadSection | null | undefined) {
  if (!section?.slug || !section.title || !section.mainDescription) {
    return null;
  }

  const images = (section.mainImages ?? []).map((image) => getMediaURL(image)).filter(Boolean);

  if (images.length === 0) {
    return null;
  }

  return {
    slug: section.slug,
    title: section.title,
    description: section.mainDescription,
    images,
    href: getSectionHref(section.slug),
  } satisfies PreviewSection;
}

function mapPhotoshoot(photoshoot: PayloadPhotoshoot | PayloadID | null | undefined) {
  if (!isPayloadPhotoshoot(photoshoot) || !photoshoot.slug || !photoshoot.title) {
    return null;
  }

  const galleryImages = (photoshoot.images ?? []).map((image) => getMediaURL(image)).filter(Boolean);
  const mainImage = getMediaURL(photoshoot.mainImage);
  const images = galleryImages.length ? galleryImages : mainImage ? [mainImage] : [];

  if (!images.length) {
    return null;
  }

  return {
    slug: photoshoot.slug,
    title: photoshoot.title,
    description: photoshoot.description?.trim() || "",
    images,
  } satisfies Photoshoot;
}

function mapSectionPage(section: PayloadSection | null | undefined) {
  if (!section?.slug || !section.title || !section.mainDescription) {
    return null;
  }

  const photoshoots = (section.photoshoots ?? []).map((photoshoot) => mapPhotoshoot(photoshoot)).filter(isPhotoshoot);

  if (!photoshoots.length) {
    return null;
  }

  return {
    slug: section.slug,
    title: section.title,
    description: section.mainDescription,
    photoshoots,
  } satisfies SectionPageContent;
}

function mapNavigation(
  homepage: PayloadHomepage | null,
  sections: PreviewSection[],
  sectionDocs: PayloadSection[],
) {
  const items = homepage?.navigation?.items;

  if (!items?.length) {
    return fallbackHomepageContent.navigation;
  }

  const sectionDocByID = new Map(
    sectionDocs.map((section) => [getRelationID(section), section] as const).filter(([id]) => Boolean(id)),
  );
  const sectionBySlug = new Map(sections.map((section) => [section.slug, section] as const));
  const seenSections = new Set<string>();
  let hasContact = false;

  const links: NavLink[] = [];

  for (const item of items) {
    if (links.length === 4) {
      break;
    }

    if (item?.type === "contact") {
      if (hasContact) {
        continue;
      }

      hasContact = true;
      links.push({ label: "Contact", href: "#contact", type: "contact" });
      continue;
    }

    const relatedSection = isPayloadSection(item?.section)
      ? item?.section
      : sectionDocByID.get(getRelationID(item?.section));

    const slug = relatedSection?.slug?.trim();

    if (!slug || seenSections.has(slug)) {
      continue;
    }

    const section = sectionBySlug.get(slug);

    if (!section) {
      continue;
    }

    seenSections.add(slug);
    links.push({ label: section.title, href: `#${slug}`, type: "section" });
  }

  return links.length ? links : fallbackHomepageContent.navigation;
}

function isPayloadSection(value: PayloadSection | PayloadID | null | undefined): value is PayloadSection {
  return typeof value === "object" && value !== null;
}

function isPayloadPhotoshoot(
  value: PayloadPhotoshoot | PayloadID | null | undefined,
): value is PayloadPhotoshoot {
  return typeof value === "object" && value !== null;
}

async function fetchPayloadJSON<T>(path: string) {
  if (!payloadAPIURL) {
    return null;
  }

  const headers: HeadersInit = {};

  if (payloadToken) {
    headers.Authorization = `Bearer ${payloadToken}`;
  }

  const response = await fetch(`${payloadAPIURL}${path}`, {
    headers,
  });

  if (!response.ok) {
    throw new Error(`Payload request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

async function fetchSectionDocs() {
  try {
    const response = await fetchPayloadJSON<PayloadDocsResponse<PayloadSection>>(
      "/api/sections?depth=3&limit=100&sort=createdAt",
    );

    return response?.docs ?? null;
  } catch {
    return null;
  }
}

async function fetchHomepageDoc() {
  try {
    return await fetchPayloadJSON<PayloadHomepage>("/api/globals/homepage?depth=2");
  } catch {
    return null;
  }
}

export async function getSectionPreviews() {
  const sectionDocs = await fetchSectionDocs();

  if (!sectionDocs?.length) {
    return fallbackSections;
  }

  const sections = sectionDocs.map((section) => mapSection(section)).filter(isPreviewSection);

  return sections.length ? sections : fallbackSections;
}

export async function getSectionPages() {
  const sectionDocs = await fetchSectionDocs();

  if (!sectionDocs?.length) {
    return fallbackSectionPages;
  }

  const sections = sectionDocs.map((section) => mapSectionPage(section)).filter(isSectionPageContent);

  return sections.length ? sections : fallbackSectionPages;
}

export async function getHomepageContent(): Promise<HomePageContent> {
  const [sectionDocs, homepage] = await Promise.all([fetchSectionDocs(), fetchHomepageDoc()]);
  const sections = sectionDocs?.map((section) => mapSection(section)).filter(isPreviewSection) ?? [];
  const resolvedSections = sections.length ? sections : fallbackSections;

  return {
    seo: {
      title: homepage?.seo?.title?.trim() || fallbackHomepageContent.seo.title,
      description: homepage?.seo?.description?.trim() || fallbackHomepageContent.seo.description,
    },
    branding: {
      title: homepage?.branding?.title?.trim() || fallbackHomepageContent.branding.title,
      subtitle: homepage?.branding?.subtitle?.trim() || fallbackHomepageContent.branding.subtitle,
    },
    hero: {
      headline: homepage?.hero?.headline?.trim() || fallbackHomepageContent.hero.headline,
      description: homepage?.hero?.description?.trim() || fallbackHomepageContent.hero.description,
      location: homepage?.hero?.location?.trim() || fallbackHomepageContent.hero.location,
      image: getMediaURL(homepage?.hero?.image) || fallbackHomepageContent.hero.image,
      imageAlt: getMediaAlt(homepage?.hero?.image, fallbackHomepageContent.hero.imageAlt),
    },
    biography: {
      title: homepage?.biography?.title?.trim() || fallbackHomepageContent.biography.title,
      image: getMediaURL(homepage?.biography?.image) || fallbackHomepageContent.biography.image,
      imageAlt: getMediaAlt(homepage?.biography?.image, fallbackHomepageContent.biography.imageAlt),
      paragraphs:
        homepage?.biography?.paragraphs
          ?.map((item) => item.text?.trim())
          .filter(isDefinedString) ?? fallbackHomepageContent.biography.paragraphs,
      certificationsTitle:
        homepage?.biography?.certificationsTitle?.trim() ||
        fallbackHomepageContent.biography.certificationsTitle,
      certifications:
        homepage?.biography?.certifications
          ?.map((item) => item.title?.trim())
          .filter(isDefinedString) ?? fallbackHomepageContent.biography.certifications,
    },
    navigation: mapNavigation(homepage, resolvedSections, sectionDocs ?? []),
    sections: resolvedSections,
  };
}
