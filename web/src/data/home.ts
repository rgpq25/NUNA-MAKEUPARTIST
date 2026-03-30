import { getSectionHref } from "../lib/content-links";
import type {
	HomePageContent,
	Photoshoot,
	SectionPreview,
	SectionPageContent,
} from "../types/content";
import type { ImageAsset } from "../types/images";
import { createLexicalParagraphs } from "../types/richtext";
import img1600 from "../assets/IMG_1600.webp";
import img2166 from "../assets/IMG_2166.webp";
import img2177 from "../assets/IMG_2177.webp";
import img2178 from "../assets/IMG_2178.webp";
import img2225 from "../assets/IMG_2225.webp";
import img2228 from "../assets/IMG_2228.webp";
import img2677 from "../assets/IMG_2677.webp";
import img6510 from "../assets/IMG_6510.webp";
import img6515 from "../assets/IMG_6515.webp";
import img9284 from "../assets/IMG_9284.webp";
import img9300 from "../assets/IMG_9300.webp";
import img9320 from "../assets/IMG_9320.webp";
import img9751 from "../assets/IMG_9751.webp";

const bridalImages = [
	img1600,
	img2177,
	img2178,
	img9751,
	img2178,
	img9751,
	img2178,
	img9751,
];

const socialImages = [
	img9751,
	img2177,
	img9751,
	img1600,
	img2178,
	img9751,
	img2178,
	img2178,
];

const editorialImages = [img6515, img6510, img2677, img9300];

const brandImages = [img2225, img2228, img9284, img9320];

const repeatImages = (images: ImageAsset["src"][], count: number, start = 0) =>
	Array.from(
		{ length: count },
		(_, index) => images[(start + index) % images.length],
	);

const buildImageAssets = (
	images: ImageAsset["src"][],
	prefix: string,
	description: string,
	count: number,
	start = 0,
): ImageAsset[] =>
	repeatImages(images, count, start).map((image, index) => ({
		src: image,
		title: `${prefix} ${String(index + 1).padStart(2, "0")}`,
		description,
	}));

const buildPhotoshoot = (
	slug: string,
	title: string,
	description: string,
	imagePool: ImageAsset["src"][],
	mainIndex: number,
	start = 0,
	imageCount = 12,
): Photoshoot => ({
	slug,
	title,
	description,
	mainImage: {
		src: imagePool[mainIndex % imagePool.length],
		title,
		description,
	},
	images: buildImageAssets(
		imagePool,
		title,
		`${description} Detalle de maquillaje y fotografia de la sesion.`,
		imageCount,
		start,
	),
});

const fallbackSectionEntries = [
	{
		slug: "bridal",
		title: "Bridal",
		description:
			"Elegancia atemporal para el dia mas especial. Maquillaje nupcial que realza tu belleza natural con un toque de sofisticacion y romance.",
		images: buildImageAssets(
			bridalImages,
			"Bridal",
			"Seleccion curada de looks nupciales con acabados luminosos y elegantes.",
			10,
		),
	},
	{
		slug: "social",
		title: "Social",
		description:
			"Glamour moderno para eventos inolvidables. Looks vibrantes y contemporaneos que capturan la energia de cada celebracion.",
		images: buildImageAssets(
			socialImages,
			"Social",
			"Looks sociales con brillo, definicion y presencia para eventos especiales.",
			16,
		),
	},
	{
		slug: "editorial",
		title: "Editorial",
		description:
			"Alta moda y fotografia editorial. Creaciones audaces que trascienden las tendencias y definen nuevos estandares de belleza.",
		images: buildImageAssets(
			editorialImages,
			"Editorial",
			"Imagenes editoriales con direccion creativa, textura y composicion refinada.",
			16,
		),
	},
	{
		slug: "brand-work",
		title: "Brand Work",
		description:
			"Colaboraciones de lujo con marcas premium. Campanas profesionales que comunican sofisticacion y excelencia.",
		images: buildImageAssets(
			brandImages,
			"Brand Work",
			"Campanas de marca con acabados pulidos y lenguaje visual premium.",
			16,
		),
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
		image: {
			src: img2166,
			title: "NUNA Makeup Artist",
			description:
				"Retrato editorial principal de NUNA Makeup Artist.",
		},
		imageAlt: "NUNA Makeup Artist",
	},
	biography: {
		title: "Biografía",
		image: {
			src: img9320,
			title: "Biografía",
			description: "Retrato de NUNA Makeup Artist para la sección de biografía.",
		},
		imageAlt: "NUNA - Makeup Artist",
		content: createLexicalParagraphs([
			"Con mas de una decada de experiencia en la industria de la belleza, me especializo en crear maquillaje que realza la belleza natural y cuenta historias unicas a traves del arte.",
			"Mi trabajo abarca desde novias que buscan elegancia atemporal hasta colaboraciones editoriales de alta moda con las principales revistas y marcas de lujo internacionales.",
			"Formada en las mejores academias de maquillaje profesional, mi filosofia se centra en la personalizacion: cada rostro es un lienzo unico que merece un enfoque artistico y personalizado.",
		]),
		certificationsTitle: "Certificaciones",
		certifications: [
			"Maquillaje Profesional Avanzado",
			"Especializacion en Novias",
			"Maquillaje Editorial y Alta Moda",
		],
	},
	sections: fallbackSections,
};
