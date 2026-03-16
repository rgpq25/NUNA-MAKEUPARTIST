import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState, type WheelEvent } from "react";

import { getPhotoshootHref, type Photoshoot } from "../data/home";

interface SectionPhotoshootCarouselProps {
  sectionDescription: string;
  sectionSlug: string;
  sectionTitle: string;
  photoshoots: Photoshoot[];
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function SectionPhotoshootCarousel({
  sectionDescription,
  sectionSlug,
  sectionTitle,
  photoshoots,
}: SectionPhotoshootCarouselProps) {
  const shouldReduceMotion = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const activeIndexRef = useRef(0);
  const wheelLockRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const activePhotoshoot = photoshoots[activeIndex] ?? photoshoots[0];

  const setCurrentIndex = useCallback((index: number) => {
    activeIndexRef.current = index;
    setActiveIndex(index);
  }, []);

  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = shouldReduceMotion ? "auto" : "smooth") => {
      const scroller = scrollerRef.current;
      const slide = slideRefs.current[index];

      if (!scroller || !slide) {
        return;
      }

      const targetLeft = slide.offsetLeft - (scroller.clientWidth - slide.clientWidth) / 2;
      scroller.scrollTo({ left: targetLeft, behavior });
      setCurrentIndex(index);
    },
    [setCurrentIndex, shouldReduceMotion],
  );

  const syncActiveSlide = useCallback(() => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const viewportCenter = scroller.scrollLeft + scroller.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    slideRefs.current.forEach((slide, index) => {
      if (!slide) {
        return;
      }

      const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
      const distance = Math.abs(slideCenter - viewportCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIndexRef.current) {
      setCurrentIndex(closestIndex);
    }
  }, [setCurrentIndex]);

  const goToIndex = useCallback(
    (index: number) => {
      scrollToIndex(clamp(index, 0, photoshoots.length - 1));
    },
    [photoshoots.length, scrollToIndex],
  );

  useEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const onScroll = () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = window.requestAnimationFrame(syncActiveSlide);
    };

    const onResize = () => {
      scrollToIndex(activeIndexRef.current, "auto");
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    scrollToIndex(0, "auto");

    return () => {
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);

      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [scrollToIndex, syncActiveSlide]);

  useEffect(() => {
    return () => {
      if (wheelLockRef.current) {
        window.clearTimeout(wheelLockRef.current);
      }
    };
  }, []);

  const handleWheel = useCallback(
    (event: WheelEvent<HTMLDivElement>) => {
      const supportsWheelNavigation =
        typeof window !== "undefined" && window.matchMedia("(min-width: 768px) and (pointer: fine)").matches;

      if (!supportsWheelNavigation || photoshoots.length < 2) {
        return;
      }

      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX) || Math.abs(event.deltaY) < 8) {
        return;
      }

      event.preventDefault();

      if (wheelLockRef.current) {
        return;
      }

      const direction = event.deltaY > 0 ? 1 : -1;
      const nextIndex = clamp(activeIndexRef.current + direction, 0, photoshoots.length - 1);

      if (nextIndex === activeIndexRef.current) {
        return;
      }

      goToIndex(nextIndex);

      wheelLockRef.current = window.setTimeout(() => {
        wheelLockRef.current = null;
      }, shouldReduceMotion ? 160 : 650);
    },
    [goToIndex, photoshoots.length, shouldReduceMotion],
  );

  return (
    <section className="section-photoshoot-carousel relative min-h-screen overflow-hidden bg-[#f6f0e8] text-[#2a2a2a]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(201,169,110,0.18),_transparent_42%),linear-gradient(180deg,_rgba(255,255,255,0.75),_rgba(246,240,232,0.94))]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 md:px-10 md:py-10">
        <div className="mb-8 flex items-start justify-between gap-6">
          <div className="max-w-2xl">
            <p className="mb-3 font-['Montserrat'] text-[0.7rem] tracking-[0.34em] text-[#2a2a2a]/45 uppercase">
              Works / {sectionTitle}
            </p>
            <p className="font-['Montserrat'] text-sm leading-relaxed text-[#2a2a2a]/68 md:text-base">
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

        <div className="flex flex-1 flex-col justify-center">
          <div className="mb-8 min-h-[8.5rem] max-w-4xl md:min-h-[10.5rem]">
            <p className="mb-3 font-['Montserrat'] text-[0.68rem] tracking-[0.32em] text-[#2a2a2a]/42 uppercase">
              Photoshoots
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={activePhotoshoot.slug}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -18 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.28 }}
              >
                <h1 className="max-w-4xl font-['Cormorant_Garamond'] text-5xl leading-none tracking-[0.03em] text-[#2a2a2a] md:text-7xl lg:text-8xl">
                  {activePhotoshoot.title}
                </h1>
              </motion.div>
            </AnimatePresence>
          </div>

          <div
            ref={scrollerRef}
            className="section-photoshoot-track -mx-2 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[6vw] py-4 sm:px-[8vw] md:mx-0 md:px-[8vw] lg:px-[10vw] xl:px-[12vw]"
            onWheel={handleWheel}
          >
            {photoshoots.map((photoshoot, index) => {
              const isActive = index === activeIndex;

              return (
                <a
                  key={photoshoot.slug}
                  ref={(node) => {
                    slideRefs.current[index] = node;
                  }}
                  href={getPhotoshootHref(sectionSlug, photoshoot.slug)}
                  className={`section-photoshoot-slide group relative block aspect-[4/5] w-[82vw] shrink-0 snap-center overflow-hidden bg-[#eadfce] transition-[transform,opacity,box-shadow] duration-500 ease-out sm:w-[68vw] md:w-[52vw] lg:w-[40vw] xl:w-[32vw] ${
                    isActive
                      ? "scale-[1.01] opacity-100 shadow-[0_24px_70px_rgba(54,40,24,0.18)]"
                      : "scale-[0.94] opacity-55 hover:opacity-80"
                  }`}
                >
                  <img
                    src={photoshoot.mainImage}
                    alt={photoshoot.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a140d]/38 via-transparent to-[#f6f0e8]/10" />
                  <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-5">
                    <span className="font-['Montserrat'] text-[0.68rem] tracking-[0.28em] text-white/85 uppercase">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-['Montserrat'] text-[0.68rem] tracking-[0.28em] text-white/85 uppercase">
                      Abrir
                    </span>
                  </div>
                </a>
              );
            })}
          </div>

          <div className="mt-8 min-h-[6.5rem] max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activePhotoshoot.slug}-description`}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -18 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.28 }}
              >
                <p className="font-['Montserrat'] text-sm leading-relaxed text-[#2a2a2a]/72 md:text-base">
                  {activePhotoshoot.description || "Abrir photoshoot"}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-between gap-6">
            <p className="font-['Montserrat'] text-[0.68rem] tracking-[0.26em] text-[#2a2a2a]/45 uppercase">
              Desliza en movil o usa el scroll para navegar
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => goToIndex(activeIndex - 1)}
                className="inline-flex h-11 w-11 items-center justify-center border border-[#2a2a2a]/12 text-[#2a2a2a]/70 transition-colors duration-300 hover:border-[#c9a96e]/45 hover:text-[#c9a96e]"
                aria-label="Previous photoshoot"
              >
                ←
              </button>
              <span className="min-w-16 text-center font-['Montserrat'] text-[0.68rem] tracking-[0.26em] text-[#2a2a2a]/55 uppercase">
                {String(activeIndex + 1).padStart(2, "0")} / {String(photoshoots.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() => goToIndex(activeIndex + 1)}
                className="inline-flex h-11 w-11 items-center justify-center border border-[#2a2a2a]/12 text-[#2a2a2a]/70 transition-colors duration-300 hover:border-[#c9a96e]/45 hover:text-[#c9a96e]"
                aria-label="Next photoshoot"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
