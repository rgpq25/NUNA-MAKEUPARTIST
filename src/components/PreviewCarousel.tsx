import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CTAButton from "./CTAButton";

interface PreviewCarouselProps {
  title: string;
  description: string;
  images: string[];
  href: string;
  reversed?: boolean;
}

export default function PreviewCarousel({
  title,
  description,
  images,
  href,
  reversed = false,
}: PreviewCarouselProps) {
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const textMotion = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, x: reversed ? 40 : -40 },
        whileInView: { opacity: 1, x: 0 },
        transition: { duration: 0.8 },
        viewport: { once: true },
      };
  const carouselMotion = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.8, delay: 0.2 },
        viewport: { once: true },
      };

  const settings = {
    dots: true,
    infinite: true,
    speed: shouldReduceMotion ? 0 : 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: !shouldReduceMotion,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const staticGallery = (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {images.map((img, index) => (
        <div key={index} className="overflow-hidden">
          <div className="aspect-[3/4] overflow-hidden">
            <img
              src={img}
              alt={`${title} ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="px-8 py-16 md:px-16 md:py-20">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-14">
          <motion.div
            className={`md:col-span-4 ${reversed ? "md:order-2" : ""}`}
            {...textMotion}
          >
            <h3 className="mb-4 font-['Cormorant_Garamond'] text-5xl tracking-wide text-[#2a2a2a] md:text-6xl">
              {title}
            </h3>
            <p className="mb-6 py-2 font-['Montserrat'] text-sm leading-relaxed text-[#2a2a2a]/70">
              {description}
            </p>
            <CTAButton href={href} variant="dark">
              Ver todo
            </CTAButton>
          </motion.div>

          <motion.div
            className={`md:col-span-8 ${reversed ? "md:order-1" : ""}`}
            {...carouselMotion}
          >
            <div className="preview-carousel">
              {mounted ? (
                <Slider {...settings}>
                  {images.map((img, index) => (
                    <div key={index} className="px-2">
                      <div className="aspect-[3/4] overflow-hidden">
                        <img
                          src={img}
                          alt={`${title} ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </Slider>
              ) : (
                staticGallery
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
