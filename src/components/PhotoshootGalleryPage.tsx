import { motion, useReducedMotion } from "motion/react";

import type { Photoshoot } from "../data/home";
import { getGalleryImageAspectRatio } from "../lib/imagePresentation";

const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

interface PhotoshootGalleryPageProps {
  sectionSlug: string;
  sectionTitle: string;
  photoshoot: Photoshoot;
}

export default function PhotoshootGalleryPage({
  sectionSlug,
  sectionTitle,
  photoshoot,
}: PhotoshootGalleryPageProps) {
  const shouldReduceMotion = useReducedMotion();

  const buildRevealMotion = (delay: number, y = 24) =>
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
        };

  const buildGalleryItemMotion = (index: number) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 34, scale: 0.985 },
          whileInView: { opacity: 1, y: 0, scale: 1 },
          transition: {
            duration: 0.86,
            delay: Math.min(index, 5) * 0.08,
            ease: REVEAL_EASE,
          },
          viewport: { once: true, amount: 0.2 },
        };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#faf8f5] px-6 py-16 md:px-12 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(201,169,110,0.14),_transparent_38%),linear-gradient(180deg,_rgba(255,255,255,0.84),_rgba(250,248,245,0.98))]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.a
          href={`/works/${sectionSlug}`}
          className="mb-10 inline-flex border border-[#2a2a2a]/15 px-4 py-3 font-['Montserrat'] text-[0.68rem] tracking-[0.24em] text-[#2a2a2a]/75 uppercase transition-colors duration-300 hover:border-[#c9a96e]/45 hover:text-[#c9a96e]"
          {...buildRevealMotion(0.08, 14)}
        >
          Volver a {sectionTitle}
        </motion.a>

        <motion.header className="mb-12 max-w-4xl md:mb-14" {...buildRevealMotion(0.16, 26)}>
          <p className="mb-3 font-['Montserrat'] text-[0.68rem] tracking-[0.32em] text-[#2a2a2a]/42 uppercase">
            {sectionTitle}
          </p>
          <h1 className="font-['Cormorant_Garamond'] text-5xl leading-none text-[#2a2a2a] md:text-7xl">
            {photoshoot.title}
          </h1>
          {photoshoot.description ? (
            <p className="mt-5 max-w-3xl font-['Montserrat'] text-sm leading-relaxed text-[#2a2a2a]/72 md:text-base">
              {photoshoot.description}
            </p>
          ) : null}
        </motion.header>

        <div className="columns-1 gap-4 sm:columns-2 md:gap-5 xl:columns-3 xl:gap-6">
          {photoshoot.images.map((image, index) => (
            <motion.figure
              key={`${image}-${index}`}
              className="group relative mb-4 block break-inside-avoid overflow-hidden bg-[#efe6da] md:mb-5 xl:mb-6"
              style={{ aspectRatio: getGalleryImageAspectRatio(image, index) }}
              {...buildGalleryItemMotion(index)}
            >
              <img
                src={image}
                alt={`${photoshoot.title} ${index + 1}`}
                loading={index < 3 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />

              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,_rgba(250,248,245,0.06),_rgba(18,13,9,0.14))]" />

              <div className="pointer-events-none absolute left-4 top-4 border border-white/45 bg-white/12 px-3 py-2 font-['Montserrat'] text-[0.62rem] tracking-[0.24em] text-white uppercase backdrop-blur-sm">
                {String(index + 1).padStart(2, "0")}
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
