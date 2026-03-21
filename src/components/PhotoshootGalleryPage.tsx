import { motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState, type SyntheticEvent } from "react";

import { getSectionHref, type Photoshoot } from "../data/home";
import WorksPageHeader from "./WorksPageHeader";
import WorksPageLayout from "./WorksPageLayout";

const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;
const DEFAULT_IMAGE_RATIO = 4 / 5;

function getColumnCount(width: number) {
  if (width >= 1280) {
    return 3;
  }

  if (width >= 640) {
    return 2;
  }

  return 1;
}

function getColumnGap(width: number) {
  if (width >= 1280) {
    return 24;
  }

  if (width >= 768) {
    return 20;
  }

  return 16;
}

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
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const [galleryWidth, setGalleryWidth] = useState(0);
  const [imageRatios, setImageRatios] = useState<number[]>(() =>
    photoshoot.images.map(() => DEFAULT_IMAGE_RATIO),
  );

  useEffect(() => {
    setImageRatios(photoshoot.images.map(() => DEFAULT_IMAGE_RATIO));
  }, [photoshoot.images]);

  useEffect(() => {
    const galleryElement = galleryRef.current;

    if (!galleryElement) {
      return;
    }

    const updateGalleryWidth = () => {
      setGalleryWidth(galleryElement.getBoundingClientRect().width);
    };

    const resizeObserver = new ResizeObserver(updateGalleryWidth);

    resizeObserver.observe(galleryElement);
    updateGalleryWidth();

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

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

  const masonryColumns = useMemo(() => {
    const columnCount = getColumnCount(galleryWidth);
    const gap = getColumnGap(galleryWidth);
    const safeWidth = galleryWidth || 1;
    const columnWidth = (safeWidth - gap * (columnCount - 1)) / columnCount;
    const columnHeights = Array.from({ length: columnCount }, () => 0);
    const columns = Array.from({ length: columnCount }, () => [] as number[]);

    photoshoot.images.forEach((_, index) => {
      const imageRatio = imageRatios[index] ?? DEFAULT_IMAGE_RATIO;
      const estimatedHeight = columnWidth * imageRatio;
      const shortestColumnHeight = Math.min(...columnHeights);
      const columnIndex = columnHeights.findIndex((value) => value === shortestColumnHeight);

      columns[columnIndex].push(index);
      columnHeights[columnIndex] += estimatedHeight + gap;
    });

    return columns;
  }, [galleryWidth, imageRatios, photoshoot.images]);

  const handleImageLoad = (index: number, event: SyntheticEvent<HTMLImageElement>) => {
    const { naturalHeight, naturalWidth } = event.currentTarget;

    if (!naturalHeight || !naturalWidth) {
      return;
    }

    const nextRatio = naturalHeight / naturalWidth;

    setImageRatios((currentRatios) => {
      if (currentRatios[index] === nextRatio) {
        return currentRatios;
      }

      const updatedRatios = [...currentRatios];

      updatedRatios[index] = nextRatio;

      return updatedRatios;
    });
  };

  return (
    <WorksPageLayout
      header={
        <WorksPageHeader
          className="mb-6 md:mb-8"
          contentClassName="space-y-2"
          backHref={getSectionHref(sectionSlug)}
          breadcrumbs={[
            { label: "Works" },
            { label: sectionTitle, href: getSectionHref(sectionSlug) },
            { label: photoshoot.title },
          ]}
          title={photoshoot.title}
          description={photoshoot.description}
          titleWrapperClassName="max-w-4xl"
          titleClassName="font-['Cormorant_Garamond'] text-5xl leading-none text-[#2a2a2a] md:text-7xl"
          descriptionClassName="max-w-3xl pt-2 font-['Montserrat'] text-sm leading-relaxed text-[#2a2a2a]/72 md:text-base"
        />
      }
    >
      <div
        ref={galleryRef}
        className="grid items-start gap-4 sm:grid-cols-2 md:gap-5 xl:grid-cols-3 xl:gap-6"
      >
        {masonryColumns.map((column, columnIndex) => (
          <div key={`column-${columnIndex}`} className="flex flex-col gap-4 md:gap-5 xl:gap-6">
            {column.map((imageIndex) => {
              const image = photoshoot.images[imageIndex];
              const ratio = imageRatios[imageIndex] ?? DEFAULT_IMAGE_RATIO;

              return (
                <motion.figure
                  key={`${image}-${imageIndex}`}
                  className="group relative overflow-hidden bg-[#efe6da]"
                  style={{ aspectRatio: 1 / ratio }}
                  {...buildGalleryItemMotion(imageIndex)}
                >
                  <img
                    src={image}
                    alt={`${photoshoot.title} ${imageIndex + 1}`}
                    loading={imageIndex < 3 ? "eager" : "lazy"}
                    fetchPriority={imageIndex === 0 ? "high" : "auto"}
                    decoding="async"
                    onLoad={(event) => handleImageLoad(imageIndex, event)}
                    className="block h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,_rgba(250,248,245,0.06),_rgba(18,13,9,0.14))]" />

                  <div className="pointer-events-none absolute left-4 top-4 border border-white/45 bg-white/12 px-3 py-2 font-['Montserrat'] text-[0.62rem] tracking-[0.24em] text-white uppercase backdrop-blur-sm">
                    {String(imageIndex + 1).padStart(2, "0")}
                  </div>
                </motion.figure>
              );
            })}
          </div>
        ))}
      </div>
    </WorksPageLayout>
  );
}
