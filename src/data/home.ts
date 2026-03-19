export interface NavLink {
  label: string;
  href: string;
  type: "section" | "contact";
}

export interface PreviewSection {
  slug: string;
  title: string;
  description: string;
  images: string[];
  href: string;
}

export interface Photoshoot {
  slug: string;
  title: string;
  description: string;
  mainImage: string;
  images: string[];
}

export interface SectionPageContent {
  slug: string;
  title: string;
  description: string;
  photoshoots: Photoshoot[];
}

export interface BrandingContent {
  title: string;
  subtitle: string;
}

export interface HeroContent {
  headline: string;
  description: string;
  location: string;
  image: string;
  imageAlt: string;
}

export interface BiographyContent {
  title: string;
  image: string;
  imageAlt: string;
  paragraphs: string[];
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
  sections: PreviewSection[];
}

export const getSectionHref = (slug: string) => `/works/${slug}`;
export const getPhotoshootHref = (sectionSlug: string, photoshootSlug: string) =>
  `/works/${sectionSlug}/${photoshootSlug}`;

const bridalImages = [
  "/images/real-work/IMG_1600.jpeg",
  "/images/real-work/IMG_2177.jpeg",
  "/images/real-work/IMG_2178.jpeg",
  "/images/real-work/IMG_9751.jpeg",
  "https://images.unsplash.com/photo-1525258946800-98cfd641d0de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1519741497674-611481863552?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
];

const socialImages = [
  "https://images.unsplash.com/photo-1766113479701-f3d0a8583088?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJ0eSUyMG1ha2V1cCUyMHNvY2lhbCUyMGV2ZW50fGVufDF8fHx8MTc3MjY3NDMxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1767781901512-853ebef609d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVuaW5nJTIwbWFrZXVwJTIwZ2xhbW9yb3VzfGVufDF8fHx8MTc3MjY3NDMxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1766879220930-5d4a4524d0e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJ0eSUyMGdsYW0lMjBtYWtldXAlMjBldmVuaW5nfGVufDF8fHx8MTc3MjY3MzQ5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1763625650052-47fd71d9ea2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFtb3JvdXMlMjBldmVudCUyMG1ha2V1cCUyMHNvY2lhbHxlbnwxfHx8fDE3NzI2NzMyMTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
];

const editorialImages = [
  "/images/real-work/IMG_6515.jpeg",
  "/images/real-work/IMG_6510.jpeg",
  "/images/real-work/IMG_2677.jpeg",
  "/images/real-work/IMG_9300.jpeg",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1515377905703-c4788e51af15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
];

const brandImages = [
  "/images/real-work/IMG_2225.jpeg",
  "/images/real-work/IMG_2228.jpeg",
  "/images/real-work/IMG_9284.jpeg",
  "/images/real-work/IMG_9320.jpeg",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1526045431048-f857369baa09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
];

const fallbackSectionEntries = [
  {
    slug: "bridal",
    title: "Bridal",
    description:
      "Elegancia atemporal para el dia mas especial. Maquillaje nupcial que realza tu belleza natural con un toque de sofisticacion y romance.",
    images: bridalImages,
  },
  {
    slug: "social",
    title: "Social",
    description:
      "Glamour moderno para eventos inolvidables. Looks vibrantes y contemporaneos que capturan la energia de cada celebracion.",
    images: socialImages,
  },
  {
    slug: "editorial",
    title: "Editorial",
    description:
      "Alta moda y fotografia editorial. Creaciones audaces que trascienden las tendencias y definen nuevos estandares de belleza.",
    images: editorialImages,
  },
  {
    slug: "brand-work",
    title: "Brand Work",
    description:
      "Colaboraciones de lujo con marcas premium. Campanas profesionales que comunican sofisticacion y excelencia.",
    images: brandImages,
  },
];

export const fallbackSections: PreviewSection[] = fallbackSectionEntries.map((section) => ({
  ...section,
  href: getSectionHref(section.slug),
}));

export const fallbackSectionPages: SectionPageContent[] = [
  {
    slug: "bridal",
    title: "Bridal",
    description:
      "Elegancia atemporal para el dia mas especial. Maquillaje nupcial que realza tu belleza natural con un toque de sofisticacion y romance.",
    photoshoots: [
      {
        slug: "bridal-atelier",
        title: "Bridal Atelier",
        description: "Preparacion luminosa y retratos suaves para novias contemporaneas.",
        mainImage: "/images/real-work/IMG_1600.jpeg",
        images: bridalImages.slice(0, 6),
      },
      {
        slug: "bridal-ceremony",
        title: "Bridal Ceremony",
        description: "Acabados impecables pensados para ceremonia y fotografia editorial.",
        mainImage: "/images/real-work/IMG_9751.jpeg",
        images: [bridalImages[3], ...bridalImages.slice(4, 9)],
      },
      {
        slug: "bridal-destination",
        title: "Bridal Destination",
        description: "Belleza romantica para bodas de destino, golden hour y retratos al aire libre.",
        mainImage: bridalImages[4],
        images: [bridalImages[4], bridalImages[5], bridalImages[6], bridalImages[1], bridalImages[8]],
      },
    ],
  },
  {
    slug: "social",
    title: "Social",
    description:
      "Glamour moderno para eventos inolvidables. Looks vibrantes y contemporaneos que capturan la energia de cada celebracion.",
    photoshoots: [
      {
        slug: "social-evening",
        title: "Social Evening",
        description: "Looks de noche con brillo, definicion y una energia festiva.",
        mainImage: socialImages[0],
        images: socialImages.slice(0, 6),
      },
      {
        slug: "social-cocktail",
        title: "Social Cocktail",
        description: "Piel satinada, color estrategico y acabados pulidos para celebraciones sofisticadas.",
        mainImage: socialImages[4],
        images: socialImages.slice(3, 9),
      },
      {
        slug: "social-red-carpet",
        title: "Social Red Carpet",
        description: "Inspiracion red carpet con foco en luz, estructura y presencia frente a camara.",
        mainImage: socialImages[8],
        images: [socialImages[8], socialImages[9], socialImages[1], socialImages[2], socialImages[5], socialImages[6]],
      },
    ],
  },
  {
    slug: "editorial",
    title: "Editorial",
    description:
      "Alta moda y fotografia editorial. Creaciones audaces que trascienden las tendencias y definen nuevos estandares de belleza.",
    photoshoots: [
      {
        slug: "editorial-studio",
        title: "Editorial Studio",
        description: "Texturas, contraste y direccion creativa para producciones editoriales.",
        mainImage: "/images/real-work/IMG_6515.jpeg",
        images: editorialImages.slice(0, 6),
      },
      {
        slug: "editorial-beauty-story",
        title: "Editorial Beauty Story",
        description: "Close-ups de belleza con acabado pulido, color controlado y narrativa visual refinada.",
        mainImage: editorialImages[4],
        images: editorialImages.slice(4, 10),
      },
      {
        slug: "editorial-monochrome",
        title: "Editorial Monochrome",
        description: "Series conceptuales con una direccion minimalista y una presencia fotografica fuerte.",
        mainImage: editorialImages[2],
        images: [editorialImages[2], editorialImages[6], editorialImages[7], editorialImages[1], editorialImages[8]],
      },
    ],
  },
  {
    slug: "brand-work",
    title: "Brand Work",
    description:
      "Colaboraciones de lujo con marcas premium. Campanas profesionales que comunican sofisticacion y excelencia.",
    photoshoots: [
      {
        slug: "brand-campaign",
        title: "Brand Campaign",
        description: "Contenido de marca con una direccion visual elegante y pulida.",
        mainImage: "/images/real-work/IMG_2225.jpeg",
        images: brandImages.slice(0, 6),
      },
      {
        slug: "brand-launch",
        title: "Brand Launch",
        description: "Imagenes de lanzamiento con foco comercial, consistencia visual y maquillaje camera-ready.",
        mainImage: brandImages[4],
        images: brandImages.slice(4, 10),
      },
      {
        slug: "brand-studio-portraits",
        title: "Brand Studio Portraits",
        description: "Retratos de marca para lookbooks, key visuals y contenido digital premium.",
        mainImage: brandImages[2],
        images: [brandImages[2], brandImages[3], brandImages[6], brandImages[7], brandImages[8], brandImages[1]],
      },
    ],
  },
];

export const fallbackHomepageContent: HomePageContent = {
  seo: {
    title: "NUNA Makeup Artist | Home",
    description:
      "Landing page editorial para NUNA Makeup Artist, creada a partir del export de Figma.",
  },
  branding: {
    title: "NUNA",
    subtitle: "Makeup Artist",
  },
  navigation: [
    { label: "Bridal", href: "#bridal", type: "section" },
    { label: "Social", href: "#social", type: "section" },
    { label: "Editorial", href: "#editorial", type: "section" },
    { label: "Contact", href: "#contact", type: "contact" },
  ],
  hero: {
    headline: "Maquillaje editorial y novias con un enfoque atemporal",
    description:
      "Especializada en crear belleza que trasciende tendencias. Desde bodas intimas hasta campanas de alta moda, cada trabajo refleja sofisticacion, tecnica impecable y una vision artistica unica.",
    location: "Basada en Madrid · Disponible internacionalmente",
    image: "/images/real-work/IMG_2166.jpeg",
    imageAlt: "NUNA Makeup Artist",
  },
  biography: {
    title: "Biografia",
    image: "/images/real-work/IMG_9757.jpeg",
    imageAlt: "NUNA - Makeup Artist",
    paragraphs: [
      "Con mas de una decada de experiencia en la industria de la belleza, me especializo en crear maquillaje que realza la belleza natural y cuenta historias unicas a traves del arte.",
      "Mi trabajo abarca desde novias que buscan elegancia atemporal hasta colaboraciones editoriales de alta moda con las principales revistas y marcas de lujo internacionales.",
      "Formada en las mejores academias de maquillaje profesional, mi filosofia se centra en la personalizacion: cada rostro es un lienzo unico que merece un enfoque artistico y personalizado.",
    ],
    certificationsTitle: "Certificaciones",
    certifications: [
      "Maquillaje Profesional Avanzado",
      "Especializacion en Novias",
      "Maquillaje Editorial y Alta Moda",
    ],
  },
  sections: fallbackSections,
};
