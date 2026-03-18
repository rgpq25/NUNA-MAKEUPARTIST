import type { CSSProperties } from "react";

import { useReducedMotion } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { getPhotoshootHref, type Photoshoot } from "../data/home";

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
  const [selectedIndex, setSelectedIndex] = useState(0);
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

    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevDisabled(!emblaApi.canScrollPrev());
    setNextDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    updateEmblaState();
    emblaApi.on("reInit", updateEmblaState).on("select", updateEmblaState);
    emblaApi.scrollTo(0, true);

    return () => {
      emblaApi.off("reInit", updateEmblaState).off("select", updateEmblaState);
    };
  }, [emblaApi, photoshoots, updateEmblaState]);

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

      const viewportInset = width >= 1024 ? 144 : width >= 768 ? 104 : width >= 640 ? 72 : 48;
      const maxWidthFromHeight = height * (4 / 5);
      const maxWidthFromViewport = Math.max(width - viewportInset, 0);
      const nextSlideWidth = Math.floor(Math.min(maxWidthFromHeight, maxWidthFromViewport));

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
  }, [emblaApi, slideWidth, updateEmblaState]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const viewportStyle = slideWidth
    ? ({ "--section-photoshoot-slide-width": `${slideWidth}px` } as CSSProperties)
    : undefined;

  return (
    <section className="section-photoshoot-carousel relative h-dvh overflow-hidden bg-[#f7f1e9] text-[#2a2a2a]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(201,169,110,0.16),_transparent_40%),linear-gradient(180deg,_rgba(255,255,255,0.8),_rgba(247,241,233,0.96))]" />

      <div className="relative mx-auto grid h-full w-full max-w-7xl grid-rows-[auto_minmax(0,1fr)_auto] gap-6 px-6 py-8 md:px-10 md:py-10">
        <div className="flex items-start justify-between gap-6">
          <div className="max-w-2xl">
            <p className="mb-3 font-['Montserrat'] text-[0.68rem] tracking-[0.34em] text-[#2a2a2a]/44 uppercase">
              Works / {sectionTitle}
            </p>
            <h1 className="font-['Cormorant_Garamond'] text-5xl leading-none text-[#2a2a2a] md:text-7xl lg:text-8xl">
              {sectionTitle}
            </h1>
            <p className="mt-5 max-w-xl font-['Montserrat'] text-sm leading-relaxed text-[#2a2a2a]/68 md:text-base">
              {sectionDescription}
            </p>
          </div>

          <a
            href={`/#${sectionSlug}`}
            className="inline-flex shrink-0 border border-[#2a2a2a]/15 px-4 py-3 font-['Montserrat'] text-[0.68rem] tracking-[0.24em] text-[#2a2a2a]/75 uppercase transition-colors duration-300 hover:border-[#c9a96e]/45 hover:text-[#c9a96e]"
          >
            Volver
          </a>
        </div>

        <div ref={carouselAreaRef} className="relative min-h-0">
          <div
            ref={emblaRef}
            className="section-photoshoot-viewport h-full min-h-0 overflow-hidden"
            style={viewportStyle}
          >
            <div className="section-photoshoot-track flex h-full items-center gap-4 sm:gap-5 lg:gap-6">
              {photoshoots.map((photoshoot, index) => {
                const isActive = index === selectedIndex;

                return (
                  <a
                    key={photoshoot.slug}
                    href={getPhotoshootHref(sectionSlug, photoshoot.slug)}
                    className={`section-photoshoot-slide group relative shrink-0 overflow-hidden bg-[#eadfce] transition-[transform,opacity,box-shadow] duration-500 ease-out ${
                      isActive
                        ? "z-10 scale-100 opacity-100 shadow-[0_24px_70px_rgba(54,40,24,0.18)]"
                        : "scale-[0.92] opacity-72"
                    }`}
                  >
                    <img
                      src={photoshoot.mainImage}
                      alt={photoshoot.title}
                      draggable={false}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#120d09]/70 via-[#120d09]/8 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-6">
                      <p className="mb-3 font-['Montserrat'] text-[0.66rem] tracking-[0.28em] text-white/78 uppercase">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h2 className="max-w-[16rem] font-['Cormorant_Garamond'] text-3xl leading-[0.96] md:text-4xl">
                        {photoshoot.title}
                      </h2>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={scrollPrev}
            disabled={prevDisabled}
            className="absolute left-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#2a2a2a]/10 bg-[#f7f1e9]/90 text-[#2a2a2a]/70 backdrop-blur transition-opacity disabled:cursor-not-allowed disabled:opacity-35 md:inline-flex"
            aria-label="Previous photoshoot"
          >
            ←
          </button>

          <button
            type="button"
            onClick={scrollNext}
            disabled={nextDisabled}
            className="absolute right-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#2a2a2a]/10 bg-[#f7f1e9]/90 text-[#2a2a2a]/70 backdrop-blur transition-opacity disabled:cursor-not-allowed disabled:opacity-35 md:inline-flex"
            aria-label="Next photoshoot"
          >
            →
          </button>
        </div>

        <div className="flex justify-center pt-2">
          <a
            href="/#contact"
            className="inline-flex min-h-12 items-center justify-center bg-[#1c1a17] px-8 py-4 font-['Montserrat'] text-[0.72rem] tracking-[0.24em] text-[#f7f1e9] uppercase transition-transform duration-300 hover:scale-[1.02]"
          >
            Contactame
          </a>
        </div>
      </div>
    </section>
  );
}
