import type { ImageAsset } from "./images";
import type { LexicalRichText } from "./richtext";

export interface NavLink {
  label: string;
  href: string;
}

export interface SectionPreview {
  slug: string;
  title: string;
  description: string;
  images: ImageAsset[];
  href: string;
}

export interface Photoshoot {
  slug: string;
  title: string;
  description: string;
  mainImage: ImageAsset;
  images: ImageAsset[];
}

export interface SectionPageContent {
  slug: string;
  title: string;
  description: string;
  photoshoots: Photoshoot[];
}

export interface PhotoshootPage {
  section: SectionPageContent;
  photoshoot: Photoshoot;
  href: string;
}

export interface BrandingContent {
  title: string;
  subtitle: string;
}

export interface HeroContent {
  headline: string;
  description: string;
  location: string;
  image: ImageAsset;
  imageAlt: string;
}

export interface BiographyContent {
  title: string;
  image: ImageAsset;
  imageAlt: string;
  content: LexicalRichText;
  certificationsTitle: string;
  certifications: string[];
}

export interface SEOContent {
  title: string;
  description: string;
}

export interface HomePageContent {
  seo: SEOContent;
  branding: BrandingContent;
  navigation: NavLink[];
  hero: HeroContent;
  biography: BiographyContent;
  sections: SectionPreview[];
}
