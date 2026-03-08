import { motion, useReducedMotion } from "motion/react";

export default function HeroSection() {
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
                src="https://images.unsplash.com/photo-1762068863020-4ca97ec60cb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlkYWwlMjBtYWtldXAlMjBlbGVnYW50JTIwYnJpZGV8ZW58MXx8fHwxNzcyNjczMjE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="NUNA Makeup Artist"
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
                NUNA
              </h1>
              <p className="font-['Montserrat'] text-sm tracking-widest text-[#2a2a2a]/60 uppercase">
                Makeup Artist
              </p>
            </div>

            <h2 className="mb-8 font-['Cormorant_Garamond'] text-4xl leading-tight text-[#2a2a2a] italic md:text-5xl">
              Maquillaje editorial y novias con un enfoque atemporal
            </h2>

            <p className="mb-6 font-['Montserrat'] text-base leading-relaxed text-[#2a2a2a]/70">
              Especializada en crear belleza que trasciende tendencias. Desde
              bodas intimas hasta campanas de alta moda, cada trabajo refleja
              sofisticacion, tecnica impecable y una vision artistica unica.
            </p>

            <p className="font-['Montserrat'] text-sm leading-relaxed text-[#2a2a2a]/60">
              Basada en Madrid · Disponible internacionalmente
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
