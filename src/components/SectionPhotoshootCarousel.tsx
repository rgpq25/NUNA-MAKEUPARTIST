import type { CSSProperties } from "react";

import useEmblaCarousel from "embla-carousel-react";
import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { getPhotoshootHref } from "../lib/content-links";
import type { Photoshoot } from "../types/content";
import ResponsiveImage from "./ResponsiveImage";
import WorksPageHeader from "./WorksPageHeader";
import WorksPageLayout from "./WorksPageLayout";

const WORK_CARD_ASPECT_RATIO = 10 / 13;
const MOBILE_WORK_CARD_ASPECT_RATIO = 9 / 13;
const MAX_FOCUS_SCALE = 1.035;
const AUTO_SCROLL_INTERVAL_MS = 2000;
const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

const clamp = (value: number, min: number, max: number) =>
	Math.min(Math.max(value, min), max);

const mix = (start: number, end: number, amount: number) =>
	start + (end - start) * amount;

interface SectionPhotoshootCarouselProps {
	sectionDescription: string;
	sectionSlug: string;
	sectionTitle: string;
	photoshoots: Photoshoot[];
}

export default function SectionPhotoshootCarousel({
	sectionDescription,
	sectionSlug,
	sectionTitle,
	photoshoots,
}: SectionPhotoshootCarouselProps) {
	const shouldReduceMotion = useReducedMotion();
	const carouselAreaRef = useRef<HTMLDivElement | null>(null);
	const slideRefs = useRef<Array<HTMLAnchorElement | null>>([]);
	const autoScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
		null,
	);
	const [prevDisabled, setPrevDisabled] = useState(true);
	const [nextDisabled, setNextDisabled] = useState(false);
	const [slideWidth, setSlideWidth] = useState<number | null>(null);
	const [emblaRef, emblaApi] = useEmblaCarousel({
		align: "center",
		containScroll: false,
		dragFree: false,
		duration: shouldReduceMotion ? 0 : 25,
		loop: false,
		skipSnaps: false,
	});

	const updateEmblaState = useCallback(() => {
		if (!emblaApi) {
			return;
		}

		setPrevDisabled(!emblaApi.canScrollPrev());
		setNextDisabled(!emblaApi.canScrollNext());
	}, [emblaApi]);

	const syncSlideStyles = useCallback(() => {
		if (!emblaApi) {
			return;
		}

		const scrollProgress = clamp(emblaApi.scrollProgress(), 0, 1);
		const snapList = emblaApi.scrollSnapList();

		slideRefs.current.forEach((slide, index) => {
			if (!slide) {
				return;
			}

			const snap = snapList[index] ?? 0;
			const prevSnap = snapList[index - 1];
			const nextSnap = snapList[index + 1];
			const distanceToPrev =
				prevSnap === undefined
					? Number.POSITIVE_INFINITY
					: snap - prevSnap;
			const distanceToNext =
				nextSnap === undefined
					? Number.POSITIVE_INFINITY
					: nextSnap - snap;
			const neighborDistances = [distanceToPrev, distanceToNext].filter(
				(distance): distance is number =>
					Number.isFinite(distance) && distance > 0,
			);
			const influenceRange =
				neighborDistances.length > 0
					? Math.min(...neighborDistances)
					: 1;
			const focus = clamp(
				1 - Math.abs(snap - scrollProgress) / influenceRange,
				0,
				1,
			);
			const scale = mix(0.92, 1.035, focus);
			const opacity = mix(0.68, 1, focus);
			const overlayOpacity = mix(0.84, 0.58, focus);
			const contentOpacity = clamp((focus - 0.72) / 0.2, 0, 1);

			slide.style.setProperty(
				"--section-photoshoot-slide-scale",
				scale.toFixed(3),
			);
			slide.style.setProperty(
				"--section-photoshoot-slide-opacity",
				opacity.toFixed(3),
			);
			slide.style.setProperty(
				"--section-photoshoot-slide-overlay-opacity",
				overlayOpacity.toFixed(3),
			);
			slide.style.setProperty(
				"--section-photoshoot-slide-content-opacity",
				contentOpacity.toFixed(3),
			);
			slide.style.setProperty(
				"--section-photoshoot-slide-z-index",
				String(Math.round(mix(1, 20, focus))),
			);
		});
	}, [emblaApi]);

	const buildRevealMotion = useCallback(
		(delay: number, y = 24) =>
			shouldReduceMotion
				? {}
				: {
						initial: { opacity: 0, y },
						animate: { opacity: 1, y: 0 },
						transition: {
							duration: 0.82,
							delay,
							ease: REVEAL_EASE,
						},
					},
		[shouldReduceMotion],
	);

	const buildSlideRevealMotion = useCallback(
		(index: number) =>
			shouldReduceMotion
				? {}
				: {
						initial: { opacity: 0, y: 24 },
						animate: { opacity: 1, y: 0 },
						transition: {
							duration: 0.78,
							delay: 0.18 + Math.min(index, 4) * 0.08,
							ease: REVEAL_EASE,
						},
					},
		[shouldReduceMotion],
	);

	const clearAutoScroll = useCallback(() => {
		if (autoScrollTimeoutRef.current !== null) {
			clearTimeout(autoScrollTimeoutRef.current);
			autoScrollTimeoutRef.current = null;
		}
	}, []);

	const scheduleAutoScroll = useCallback(() => {
		clearAutoScroll();

		if (!emblaApi || shouldReduceMotion || photoshoots.length < 2) {
			return;
		}

		autoScrollTimeoutRef.current = setTimeout(() => {
			if (!emblaApi) {
				return;
			}

			if (emblaApi.canScrollNext()) {
				emblaApi.scrollNext();
				return;
			}

			emblaApi.scrollTo(0);
		}, AUTO_SCROLL_INTERVAL_MS);
	}, [clearAutoScroll, emblaApi, photoshoots.length, shouldReduceMotion]);

	useEffect(() => {
		if (!emblaApi) {
			return;
		}

		updateEmblaState();
		syncSlideStyles();
		emblaApi
			.on("pointerDown", clearAutoScroll)
			.on("reInit", updateEmblaState)
			.on("reInit", syncSlideStyles)
			.on("reInit", scheduleAutoScroll)
			.on("scroll", syncSlideStyles)
			.on("select", updateEmblaState)
			.on("settle", scheduleAutoScroll)
			.on("settle", syncSlideStyles);
		emblaApi.scrollTo(0, true);
		scheduleAutoScroll();

		return () => {
			clearAutoScroll();
			emblaApi
				.off("pointerDown", clearAutoScroll)
				.off("reInit", updateEmblaState)
				.off("reInit", syncSlideStyles)
				.off("reInit", scheduleAutoScroll)
				.off("scroll", syncSlideStyles)
				.off("select", updateEmblaState)
				.off("settle", scheduleAutoScroll)
				.off("settle", syncSlideStyles);
		};
	}, [
		clearAutoScroll,
		emblaApi,
		photoshoots,
		scheduleAutoScroll,
		syncSlideStyles,
		updateEmblaState,
	]);

	useEffect(() => {
		const carouselArea = carouselAreaRef.current;

		if (!carouselArea) {
			return;
		}

		const updateSlideWidth = () => {
			const { width, height } = carouselArea.getBoundingClientRect();

			if (!width || !height) {
				return;
			}

			const viewportInset =
				width >= 1024
					? 220
					: width >= 768
						? 124
						: width >= 640
							? 72
							: 40;
			const cardAspectRatio =
				width < 640
					? MOBILE_WORK_CARD_ASPECT_RATIO
					: WORK_CARD_ASPECT_RATIO;
			const maxWidthFromHeight =
				(height * cardAspectRatio) / MAX_FOCUS_SCALE;
			const maxWidthFromViewport = Math.max(width - viewportInset, 0);
			const nextSlideWidth = Math.floor(
				Math.min(maxWidthFromHeight, maxWidthFromViewport),
			);

			setSlideWidth((currentWidth) =>
				currentWidth === nextSlideWidth ? currentWidth : nextSlideWidth,
			);
		};

		const resizeObserver = new ResizeObserver(updateSlideWidth);

		resizeObserver.observe(carouselArea);
		updateSlideWidth();

		return () => {
			resizeObserver.disconnect();
		};
	}, []);

	useEffect(() => {
		if (!emblaApi || !slideWidth) {
			return;
		}

		emblaApi.reInit();
		updateEmblaState();
		syncSlideStyles();
	}, [emblaApi, slideWidth, syncSlideStyles, updateEmblaState]);

	const scrollPrev = useCallback(() => {
		emblaApi?.scrollPrev();
	}, [emblaApi]);

	const scrollNext = useCallback(() => {
		emblaApi?.scrollNext();
	}, [emblaApi]);

	const viewportStyle = slideWidth
		? ({
				"--section-photoshoot-slide-width": `${slideWidth}px`,
			} as CSSProperties)
		: undefined;

	return (
		<WorksPageLayout
			className="section-photoshoot-carousel bg-[#f7f1e9]"
			overlayClassName="bg-[radial-gradient(circle_at_top,_rgba(201,169,110,0.16),_transparent_40%),linear-gradient(180deg,_rgba(255,255,255,0.8),_rgba(247,241,233,0.96))]"
			innerClassName="grid min-h-dvh grid-rows-[auto_minmax(0,1fr)_auto] gap-2 md:gap-6"
			bleedContentClassName="relative min-h-0"
			header={
				<WorksPageHeader
					backHref={`/#${sectionSlug}`}
					breadcrumbs={[{ label: "Works" }, { label: sectionTitle }]}
					title={sectionTitle}
					description={sectionDescription}
				/>
			}
			bleedContent={
				<div
					ref={carouselAreaRef}
					className="relative min-h-100 w-full h-full"
				>
					<div
						ref={emblaRef}
						className="section-photoshoot-viewport h-full min-h-0 overflow-hidden"
						style={viewportStyle}
					>
						<div className="section-photoshoot-track flex h-full items-center gap-3 sm:gap-4 lg:gap-0">
							{photoshoots.map((photoshoot, index) => (
								<a
									key={photoshoot.slug}
									href={getPhotoshootHref(
										sectionSlug,
										photoshoot.slug,
									)}
									ref={(element) => {
										slideRefs.current[index] = element;
									}}
									className="section-photoshoot-slide group relative shrink-0 overflow-hidden"
								>
									<motion.div
										className="absolute inset-0"
										{...buildSlideRevealMotion(index)}
									>
										<ResponsiveImage
											src={photoshoot.mainImage}
											alt={photoshoot.title}
											draggable={false}
											sizes="(max-width: 639px) 82vw, (max-width: 1023px) 60vw, 38vw"
											loading={index === 0 ? "eager" : "lazy"}
											className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
										/>
										<div
											className="absolute inset-0 bg-linear-to-t from-[#120d09]/70 via-[#120d09]/8 to-transparent"
											style={{
												opacity:
													"var(--section-photoshoot-slide-overlay-opacity, 0.84)",
											}}
										/>

										<div
											className="absolute inset-x-0 bottom-0 p-5 text-white transition-opacity duration-300 ease-out md:p-6"
											style={{
												opacity:
													"var(--section-photoshoot-slide-content-opacity, 0.7)",
											}}
										>
											<p className="mb-3 font-['Montserrat'] text-[0.66rem] tracking-[0.28em] text-white/78 uppercase">
												{String(index + 1).padStart(
													2,
													"0",
												)}
											</p>
											<h2 className="max-w-[16rem] font-['Cormorant_Garamond'] text-3xl leading-[0.96] md:text-4xl">
												{photoshoot.title}
											</h2>
										</div>
									</motion.div>
								</a>
							))}
						</div>
					</div>

					<motion.button
						type="button"
						onClick={scrollPrev}
						disabled={prevDisabled}
						className="inline-flex absolute left-4 top-1/2 z-20 h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#2a2a2a]/10 bg-[#f7f1e9]/90 text-[#2a2a2a]/70 backdrop-blur transition-opacity disabled:cursor-not-allowed disabled:opacity-35"
						aria-label="Previous photoshoot"
						{...buildRevealMotion(0.3, 18)}
					>
						<ChevronLeft className="h-5 w-5" strokeWidth={1.7} />
					</motion.button>

					<motion.button
						type="button"
						onClick={scrollNext}
						disabled={nextDisabled}
						className="inline-flex absolute right-4 top-1/2 z-20 h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#2a2a2a]/10 bg-[#f7f1e9]/90 text-[#2a2a2a]/70 backdrop-blur transition-opacity disabled:cursor-not-allowed disabled:opacity-35"
						aria-label="Next photoshoot"
						{...buildRevealMotion(0.34, 18)}
					>
						<ChevronRight className="h-5 w-5" strokeWidth={1.7} />
					</motion.button>
				</div>
			}
		>
			<motion.div
				className="flex justify-center pt-2"
				{...buildRevealMotion(0.38, 18)}
			>
				<a href="/#contacto">
					<span className="inline-flex min-h-12 items-center justify-center bg-[#1c1a17] px-8 py-4 font-['Montserrat'] text-[0.72rem] tracking-[0.24em] text-white uppercase transition-transform duration-300">
						Contáctame
					</span>
				</a>
			</motion.div>
		</WorksPageLayout>
	);
}
