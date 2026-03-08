import { motion, useReducedMotion } from "motion/react";

export default function BiographySection() {
  const shouldReduceMotion = useReducedMotion();
  const leftMotion = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, x: -40 },
        whileInView: { opacity: 1, x: 0 },
        transition: { duration: 0.8 },
        viewport: { once: true },
      };
  const rightMotion = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, x: 40 },
        whileInView: { opacity: 1, x: 0 },
        transition: { duration: 0.8, delay: 0.2 },
        viewport: { once: true },
      };

  return (
    <section className="bg-[#f5f2ed] px-8 py-24 md:min-h-screen md:px-16 md:py-32">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-20">
          <motion.div className="order-2 md:order-1" {...leftMotion}>
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src="/images/real-work/IMG_9757.jpeg"
                alt="NUNA - Makeup Artist"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            className="order-1 flex flex-col justify-center md:order-2"
            {...rightMotion}
          >
            <h2 className="mb-8 font-['Cormorant_Garamond'] text-6xl tracking-wide text-[#2a2a2a] md:text-7xl">
              Biografia
            </h2>
            <div className="space-y-6">
              <p className="font-['Montserrat'] text-base leading-relaxed text-[#2a2a2a]/70">
                Con mas de una decada de experiencia en la industria de la
                belleza, me especializo en crear maquillaje que realza la
                belleza natural y cuenta historias unicas a traves del arte.
              </p>
              <p className="font-['Montserrat'] text-base leading-relaxed text-[#2a2a2a]/70">
                Mi trabajo abarca desde novias que buscan elegancia atemporal
                hasta colaboraciones editoriales de alta moda con las
                principales revistas y marcas de lujo internacionales.
              </p>
              <p className="font-['Montserrat'] text-base leading-relaxed text-[#2a2a2a]/70">
                Formada en las mejores academias de maquillaje profesional, mi
                filosofia se centra en la personalizacion: cada rostro es un
                lienzo unico que merece un enfoque artistico y personalizado.
              </p>
            </div>

            <div className="mt-10 border-t border-[#2a2a2a]/10 pt-8">
              <p className="mb-4 font-['Montserrat'] text-xs tracking-widest text-[#2a2a2a]/50 uppercase">
                Certificaciones
              </p>
              <div className="space-y-2">
                <p className="font-['Montserrat'] text-sm text-[#2a2a2a]/60">
                  • Maquillaje Profesional Avanzado
                </p>
                <p className="font-['Montserrat'] text-sm text-[#2a2a2a]/60">
                  • Especializacion en Novias
                </p>
                <p className="font-['Montserrat'] text-sm text-[#2a2a2a]/60">
                  • Maquillaje Editorial y Alta Moda
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
