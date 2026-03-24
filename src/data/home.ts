import { getSectionHref } from "../lib/content-links";
import type {
	HomePageContent,
	Photoshoot,
	SectionPreview,
	SectionPageContent,
} from "../types/content";

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

const repeatImages = (images: string[], count: number, start = 0) =>
	Array.from(
		{ length: count },
		(_, index) => images[(start + index) % images.length],
	);

const buildPhotoshoot = (
	slug: string,
	title: string,
	description: string,
	imagePool: string[],
	mainIndex: number,
	start = 0,
	imageCount = 12,
): Photoshoot => ({
	slug,
	title,
	description,
	mainImage: imagePool[mainIndex % imagePool.length],
	images: repeatImages(imagePool, imageCount, start),
});

const fallbackSectionEntries = [
	{
		slug: "bridal",
		title: "Bridal",
		description:
			"Elegancia atemporal para el dia mas especial. Maquillaje nupcial que realza tu belleza natural con un toque de sofisticacion y romance.",
		images: repeatImages(bridalImages, 10),
	},
	{
		slug: "social",
		title: "Social",
		description:
			"Glamour moderno para eventos inolvidables. Looks vibrantes y contemporaneos que capturan la energia de cada celebracion.",
		images: repeatImages(socialImages, 16),
	},
	{
		slug: "editorial",
		title: "Editorial",
		description:
			"Alta moda y fotografia editorial. Creaciones audaces que trascienden las tendencias y definen nuevos estandares de belleza.",
		images: repeatImages(editorialImages, 16),
	},
	{
		slug: "brand-work",
		title: "Brand Work",
		description:
			"Colaboraciones de lujo con marcas premium. Campanas profesionales que comunican sofisticacion y excelencia.",
		images: repeatImages(brandImages, 16),
	},
];

export const fallbackSections: SectionPreview[] = fallbackSectionEntries.map(
	(section) => ({
		...section,
		href: getSectionHref(section.slug),
	}),
);

export const fallbackSectionPages: SectionPageContent[] = [
	{
		slug: "bridal",
		title: "Bridal",
		description:
			"Elegancia atemporal para el dia mas especial. Maquillaje nupcial que realza tu belleza natural con un toque de sofisticacion y romance.",
		photoshoots: [
			buildPhotoshoot(
				"bridal-atelier",
				"Bridal Atelier",
				"Preparacion luminosa y retratos suaves para novias contemporaneas.",
				bridalImages,
				0,
				0,
			),
			buildPhotoshoot(
				"bridal-ceremony",
				"Bridal Ceremony",
				"Acabados impecables pensados para ceremonia y fotografia editorial.",
				bridalImages,
				3,
				2,
			),
			buildPhotoshoot(
				"bridal-destination",
				"Bridal Destination",
				"Belleza romantica para bodas de destino, golden hour y retratos al aire libre.",
				bridalImages,
				4,
				4,
			),
			buildPhotoshoot(
				"bridal-morning-suite",
				"Bridal Morning Suite",
				"Piel fresca, acabados delicados y detalles intimos del getting ready.",
				bridalImages,
				1,
				1,
			),
			buildPhotoshoot(
				"bridal-garden-vows",
				"Bridal Garden Vows",
				"Romance al aire libre con luz natural y maquillaje de larga duracion.",
				bridalImages,
				6,
				5,
			),
			buildPhotoshoot(
				"bridal-evening-reception",
				"Bridal Evening Reception",
				"Transiciones elegantes del altar a la fiesta con glamour suave y sofisticado.",
				bridalImages,
				8,
				7,
			),
		],
	},
	{
		slug: "social",
		title: "Social",
		description:
			"Glamour moderno para eventos inolvidables. Looks vibrantes y contemporaneos que capturan la energia de cada celebracion.",
		photoshoots: [
			buildPhotoshoot(
				"social-evening",
				"Social Evening",
				"Looks de noche con brillo, definicion y una energia festiva.",
				socialImages,
				0,
				0,
			),
			buildPhotoshoot(
				"social-cocktail",
				"Social Cocktail",
				"Piel satinada, color estrategico y acabados pulidos para celebraciones sofisticadas.",
				socialImages,
				4,
				3,
			),
			buildPhotoshoot(
				"social-red-carpet",
				"Social Red Carpet",
				"Inspiracion red carpet con foco en luz, estructura y presencia frente a camara.",
				socialImages,
				8,
				7,
			),
			buildPhotoshoot(
				"social-gala-night",
				"Social Gala Night",
				"Glamour intenso, acabados de alto impacto y sofisticacion para grandes eventos.",
				socialImages,
				2,
				1,
			),
			buildPhotoshoot(
				"social-celebration-edit",
				"Social Celebration Edit",
				"Looks versatiles para cenas, fiestas privadas y momentos especiales frente a camara.",
				socialImages,
				6,
				5,
			),
			buildPhotoshoot(
				"social-vip-guest",
				"Social VIP Guest",
				"Definicion pulida y piel luminosa para invitadas que buscan presencia impecable.",
				socialImages,
				9,
				8,
			),
		],
	},
	{
		slug: "editorial",
		title: "Editorial",
		description:
			"Alta moda y fotografia editorial. Creaciones audaces que trascienden las tendencias y definen nuevos estandares de belleza.",
		photoshoots: [
			buildPhotoshoot(
				"editorial-studio",
				"Editorial Studio",
				"Texturas, contraste y direccion creativa para producciones editoriales.",
				editorialImages,
				0,
				0,
			),
			buildPhotoshoot(
				"editorial-beauty-story",
				"Editorial Beauty Story",
				"Close-ups de belleza con acabado pulido, color controlado y narrativa visual refinada.",
				editorialImages,
				4,
				4,
			),
			buildPhotoshoot(
				"editorial-monochrome",
				"Editorial Monochrome",
				"Series conceptuales con una direccion minimalista y una presencia fotografica fuerte.",
				editorialImages,
				2,
				2,
			),
			buildPhotoshoot(
				"editorial-cover-story",
				"Editorial Cover Story",
				"Belleza de portada con foco en piel, estructura y una narrativa de moda marcada.",
				editorialImages,
				7,
				6,
			),
			buildPhotoshoot(
				"editorial-runway-notes",
				"Editorial Runway Notes",
				"Detalles de backstage y acabados graficos con una actitud moderna.",
				editorialImages,
				5,
				3,
			),
			buildPhotoshoot(
				"editorial-art-direction",
				"Editorial Art Direction",
				"Composiciones intensas pensadas para campañas visuales y editoriales de belleza.",
				editorialImages,
				9,
				8,
			),
		],
	},
	{
		slug: "brand-work",
		title: "Brand Work",
		description:
			"Colaboraciones de lujo con marcas premium. Campanas profesionales que comunican sofisticacion y excelencia.",
		photoshoots: [
			buildPhotoshoot(
				"brand-campaign",
				"Brand Campaign",
				"Contenido de marca con una direccion visual elegante y pulida.",
				brandImages,
				0,
				0,
			),
			buildPhotoshoot(
				"brand-launch",
				"Brand Launch",
				"Imagenes de lanzamiento con foco comercial, consistencia visual y maquillaje camera-ready.",
				brandImages,
				4,
				4,
			),
			buildPhotoshoot(
				"brand-studio-portraits",
				"Brand Studio Portraits",
				"Retratos de marca para lookbooks, key visuals y contenido digital premium.",
				brandImages,
				2,
				2,
			),
			buildPhotoshoot(
				"brand-product-visuals",
				"Brand Product Visuals",
				"Campanas enfocadas en producto con maquillaje preciso y una estetica premium.",
				brandImages,
				6,
				5,
			),
			buildPhotoshoot(
				"brand-digital-launch",
				"Brand Digital Launch",
				"Series para redes y ecommerce con consistencia visual y acabados listos para conversion.",
				brandImages,
				8,
				7,
			),
			buildPhotoshoot(
				"brand-signature-look",
				"Brand Signature Look",
				"Imagen de marca con retratos hero, detalle de textura y lenguaje visual refinado.",
				brandImages,
				1,
				1,
			),
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
		{ label: "Bridal", href: "#bridal" },
		{ label: "Social", href: "#social" },
		{ label: "Editorial", href: "#editorial" },
		{ label: "Contact", href: "#contacto" },
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
