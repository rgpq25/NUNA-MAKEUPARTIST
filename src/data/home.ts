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
  "https://images.unsplash.com/photo-1762068863020-4ca97ec60cb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlkYWwlMjB3ZWRkaW5nJTIwbWFrZXVwJTIwZWxlZ2FudHxlbnwxfHx8fDE3NzI2NzQzMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1762606989984-a3c611aa5886?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlkYWwlMjBtYWtldXAlMjBuYXR1cmFsJTIwYmVhdXR5fGVufDF8fHx8MTc3MjY3NDMxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1704451194278-f0c3a611d54f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlkZSUyMGdldHRpbmclMjByZWFkeSUyMG1ha2V1cHxlbnwxfHx8fDE3NzI2NzQzMTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1732950217690-dca11b6f7353?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlkYWwlMjBtYWtldXAlMjBjbG9zZSUyMHVwJTIwZGV0YWlsfGVufDF8fHx8MTc3MjY3MzQ5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
];

const socialImages = [
  "https://images.unsplash.com/photo-1766113479701-f3d0a8583088?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJ0eSUyMG1ha2V1cCUyMHNvY2lhbCUyMGV2ZW50fGVufDF8fHx8MTc3MjY3NDMxM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1767781901512-853ebef609d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVuaW5nJTIwbWFrZXVwJTIwZ2xhbW9yb3VzfGVufDF8fHx8MTc3MjY3NDMxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1766879220930-5d4a4524d0e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJ0eSUyMGdsYW0lMjBtYWtldXAlMjBldmVuaW5nfGVufDF8fHx8MTc3MjY3MzQ5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1763625650052-47fd71d9ea2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFtb3JvdXMlMjBldmVudCUyMG1ha2V1cCUyMHNvY2lhbHxlbnwxfHx8fDE3NzI2NzMyMTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
];

const editorialImages = [
  "https://images.unsplash.com/photo-1670056855799-1bbe4c58bb5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZGl0b3JpYWwlMjBtYWtldXAlMjBmYXNoaW9uJTIwbW9kZWx8ZW58MXx8fHwxNzcyNjc0MzE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1593528625646-d705402054ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWdoJTIwZmFzaGlvbiUyMGJlYXV0eSUyMGVkaXRvcmlhbHxlbnwxfHx8fDE3NzI2NzQzMTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1700070929495-2f993f4e1ffe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwbW9kZWwlMjBlZGl0b3JpYWwlMjBiZWF1dHl8ZW58MXx8fHwxNzcyNjczNDk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1768088856882-61b546834262?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZGl0b3JpYWwlMjBmYXNoaW9uJTIwbWFrZXVwJTIwaGlnaCUyMGZhc2hpb258ZW58MXx8fHwxNzcyNjczMjE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
];

const brandImages = [
  "https://images.unsplash.com/photo-1759926967575-e3254dc7d531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBicmFuZCUyMGNhbXBhaWduJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MjY3NDMxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1762522930348-070b98229e9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWF1dHklMjBjYW1wYWlnbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzI2NzMyMjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1695972235555-4b0d3c09c6ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpYyUyMGJlYXV0eSUyMHByb2R1Y3QlMjBsdXh1cnl8ZW58MXx8fHwxNzcyNjczNDk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "https://images.unsplash.com/photo-1612883695890-f2ab22e65215?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwbWFrZXVwJTIwYXJ0aXN0JTIwd29ya2luZ3xlbnwxfHx8fDE3NzI2NzM0OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
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
