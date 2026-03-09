import { motion, useReducedMotion } from "motion/react";

interface HeroSectionProps {
  brandTitle: string;
  brandSubtitle: string;
  headline: string;
  description: string;
  location: string;
  image: string;
  imageAlt: string;
}

export default function HeroSection({
  brandTitle,
  brandSubtitle,
  headline,
  description,
  location,
  image,
  imageAlt,
}: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const leftMotion = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, x: -40 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 1, delay: 0.5 },
      };
  const rightMotion = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, x: 40 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 1, delay: 0.3 },
      };

  return (
    <section className="min-h-screen bg-[#faf8f5] px-8 py-24 pt-40 md:px-16 md:pt-48">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-20">
          <motion.div className="order-2 md:order-1" {...leftMotion}>
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={image}
                alt={imageAlt}
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            className="order-1 flex flex-col justify-center md:order-2"
            {...rightMotion}
          >
            <div className="mb-12">
              <h1 className="font-['Cormorant_Garamond'] text-7xl leading-none tracking-wider text-[#2a2a2a] md:text-8xl">
                {brandTitle}
              </h1>
              <p className="font-['Montserrat'] text-sm tracking-widest text-[#2a2a2a]/60 uppercase">
                {brandSubtitle}
              </p>
            </div>

            <h2 className="mb-8 font-['Cormorant_Garamond'] text-4xl leading-tight text-[#2a2a2a] italic md:text-5xl">
              {headline}
            </h2>

            <p className="mb-6 font-['Montserrat'] text-base leading-relaxed text-[#2a2a2a]/70">
              {description}
            </p>

            <p className="font-['Montserrat'] text-sm leading-relaxed text-[#2a2a2a]/60">
              {location}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
