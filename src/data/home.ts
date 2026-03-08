export interface NavLink {
  label: string;
  href: string;
}

export interface PreviewSection {
  id: string;
  title: string;
  description: string;
  images: string[];
  href: string;
  reversed?: boolean;
}

export const navLinks: NavLink[] = [
  { label: "Bridal", href: "#bridal" },
  { label: "Social", href: "#social" },
  { label: "Editorial", href: "#editorial" },
  { label: "Contact", href: "#contact" },
];

const bridalImages = [
  "/images/real-work/IMG_1600.jpeg",
  "/images/real-work/IMG_2177.jpeg",
  "/images/real-work/IMG_2178.jpeg",
  "/images/real-work/IMG_9751.jpeg",
];

const socialImages = [
  "https://images.unsplash.com/photo-1766113479701-f3d0a8583088?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJ0eSUyMG1ha2V1cCUyMHNvY2lhbCUyMGV2ZW50fGVufDF8fHx8MTc3MjY3NDMxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1767781901512-853ebef609d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVuaW5nJTIwbWFrZXVwJTIwZ2xhbW9yb3VzfGVufDF8fHx8MTc3MjY3NDMxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1766879220930-5d4a4524d0e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJ0eSUyMGdsYW0lMjBtYWtldXAlMjBldmVuaW5nfGVufDF8fHx8MTc3MjY3MzQ5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1763625650052-47fd71d9ea2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFtb3JvdXMlMjBldmVudCUyMG1ha2V1cCUyMHNvY2lhbHxlbnwxfHx8fDE3NzI2NzMyMTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
];

const editorialImages = [
  "/images/real-work/IMG_6515.jpeg",
  "/images/real-work/IMG_6510.jpeg",
  "/images/real-work/IMG_2677.jpeg",
  "/images/real-work/IMG_9300.jpeg",
];

const brandImages = [
  "/images/real-work/IMG_2225.jpeg",
  "/images/real-work/IMG_2228.jpeg",
  "/images/real-work/IMG_9284.jpeg",
  "/images/real-work/IMG_9320.jpeg",
];

export const previewSections: PreviewSection[] = [
  {
    id: "bridal",
    title: "Bridal",
    description:
      "Elegancia atemporal para el dia mas especial. Maquillaje nupcial que realza tu belleza natural con un toque de sofisticacion y romance.",
    images: bridalImages,
    href: "/works/bridal",
  },
  {
    id: "social",
    title: "Social",
    description:
      "Glamour moderno para eventos inolvidables. Looks vibrantes y contemporaneos que capturan la energia de cada celebracion.",
    images: socialImages,
    href: "/works/social",
    reversed: true,
  },
  {
    id: "editorial",
    title: "Editorial",
    description:
      "Alta moda y fotografia editorial. Creaciones audaces que trascienden las tendencias y definen nuevos estandares de belleza.",
    images: editorialImages,
    href: "/works/editorial",
  },
  {
    id: "brand-work",
    title: "Brand Work",
    description:
      "Colaboraciones de lujo con marcas premium. Campanas profesionales que comunican sofisticacion y excelencia.",
    images: brandImages,
    href: "/works/brand",
    reversed: true,
  },
];
