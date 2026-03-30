import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";

function InstagramIcon() {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 24 24"
			className="mt-1 h-5 w-5 transition-transform group-hover:scale-110"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
			<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
			<line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
		</svg>
	);
}

interface ContactSectionProps {
	serviceOptions: string[];
}

export default function ContactSection({
	serviceOptions,
}: ContactSectionProps) {
	const availableServices = serviceOptions.length
		? serviceOptions
		: ["Bridal", "Social", "Editorial", "Brand Work"];
	const titleMotion = {
		initial: { opacity: 0, y: -20 },
		whileInView: { opacity: 1, y: 0 },
		transition: { duration: 0.4 },
		viewport: { once: true },
	};
	const bodyMotion = {
		initial: { opacity: 0, y: 20 },
		whileInView: { opacity: 1, y: 0 },
		transition: { duration: 0.4, delay: 0.2 },
		viewport: { once: true },
	};
	const leftMotion = {
		initial: { opacity: 0, x: -40 },
		whileInView: { opacity: 1, x: 0 },
		transition: { duration: 0.4, delay: 0.3 },
		viewport: { once: true },
	};
	const rightMotion = {
		initial: { opacity: 0, x: 40 },
		whileInView: { opacity: 1, x: 0 },
		transition: { duration: 0.4, delay: 0.4 },
		viewport: { once: true },
	};

	return (
		<section
			id="contacto"
			className="scroll-mt-32 bg-[#faf8f5] px-8 py-24 md:px-16 md:py-32"
		>
			<div className="container mx-auto max-w-6xl">
				<div className="mb-16 text-center flex flex-col">
					<motion.h2
						className="font-['Cormorant_Garamond'] text-6xl tracking-wider text-[#2a2a2a] md:text-8xl"
						{...titleMotion}
					>
						Contacto
					</motion.h2>
					<motion.div className="mx-auto" {...bodyMotion}>
						<p className="mt-2 max-w-2xl font-['Montserrat'] text-base leading-relaxed text-[#2a2a2a]/70">
							¿Lista para transformar tu vision en realidad?
							Contáctame para reservas, colaboraciones o consultas
							sobre servicios personalizados.
						</p>
					</motion.div>
				</div>

				<div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
					<motion.div className="space-y-8" {...leftMotion}>
						<div>
							<h3 className="mb-6 font-['Cormorant_Garamond'] text-3xl text-[#2a2a2a]">
								Información de contacto
							</h3>

							<div className="space-y-6">
								<a
									href="mailto:hola@nunamakeup.com"
									className="group flex items-start gap-4 text-[#2a2a2a] transition-colors duration-300 hover:text-[#c9a96e]"
								>
									<Mail
										size={20}
										className="mt-1 transition-transform group-hover:scale-110"
									/>
									<div>
										<p className="mb-1 font-['Montserrat'] text-xs tracking-widest text-[#2a2a2a]/50 uppercase">
											Email
										</p>
										<p className="font-['Montserrat'] text-sm">
											hola@nunamakeup.com
										</p>
									</div>
								</a>

								<a
									href="tel:+34612345678"
									className="group flex items-start gap-4 text-[#2a2a2a] transition-colors duration-300 hover:text-[#c9a96e]"
								>
									<Phone
										size={20}
										className="mt-1 transition-transform group-hover:scale-110"
									/>
									<div>
										<p className="mb-1 font-['Montserrat'] text-xs tracking-widest text-[#2a2a2a]/50 uppercase">
											Telefono
										</p>
										<p className="font-['Montserrat'] text-sm">
											+34 612 345 678
										</p>
									</div>
								</a>

								<div className="flex items-start gap-4 text-[#2a2a2a]">
									<MapPin size={20} className="mt-1" />
									<div>
										<p className="mb-1 font-['Montserrat'] text-xs tracking-widest text-[#2a2a2a]/50 uppercase">
											Ubicacion
										</p>
										<p className="font-['Montserrat'] text-sm text-[#2a2a2a]/70">
											Madrid, Espana
										</p>
										<p className="mt-1 font-['Montserrat'] text-xs text-[#2a2a2a]/50">
											Disponible para viajar
										</p>
									</div>
								</div>

								<a
									href="https://instagram.com/nunamakeupartist"
									target="_blank"
									rel="noopener noreferrer"
									className="group flex items-start gap-4 text-[#2a2a2a] transition-colors duration-300 hover:text-[#c9a96e]"
								>
									<InstagramIcon />
									<div>
										<p className="mb-1 font-['Montserrat'] text-xs tracking-widest text-[#2a2a2a]/50 uppercase">
											Instagram
										</p>
										<p className="font-['Montserrat'] text-sm">
											@nunamakeupartist
										</p>
									</div>
								</a>
							</div>
						</div>

						<div className="border-t border-[#2a2a2a]/10 pt-8">
							<p className="mb-3 font-['Montserrat'] text-xs tracking-widest text-[#2a2a2a]/50 uppercase">
								Horario
							</p>
							<p className="font-['Montserrat'] text-sm text-[#2a2a2a]/70">
								Lunes - Sabado: 9:00 - 20:00
							</p>
							<p className="font-['Montserrat'] text-sm text-[#2a2a2a]/70">
								Domingo: Consultar disponibilidad
							</p>
						</div>
					</motion.div>

					<motion.div
						className="bg-white p-8 md:p-10"
						{...rightMotion}
					>
						<h3 className="mb-6 font-['Cormorant_Garamond'] text-3xl text-[#2a2a2a]">
							Enviame un mensaje
						</h3>

						<form className="space-y-5">
							<div>
								<label
									htmlFor="name"
									className="mb-2 block font-['Montserrat'] text-xs tracking-wide text-[#2a2a2a]/70 uppercase"
								>
									Nombre
								</label>
								<input
									id="name"
									type="text"
									className="w-full border border-[#2a2a2a]/10 bg-[#faf8f5] px-4 py-3 font-['Montserrat'] text-sm transition-colors focus:border-[#c9a96e] focus:outline-none"
									placeholder="Tu nombre completo"
								/>
							</div>

							<div>
								<label
									htmlFor="email"
									className="mb-2 block font-['Montserrat'] text-xs tracking-wide text-[#2a2a2a]/70 uppercase"
								>
									Email
								</label>
								<input
									id="email"
									type="email"
									className="w-full border border-[#2a2a2a]/10 bg-[#faf8f5] px-4 py-3 font-['Montserrat'] text-sm transition-colors focus:border-[#c9a96e] focus:outline-none"
									placeholder="tu@email.com"
								/>
							</div>

							<div>
								<label
									htmlFor="service"
									className="mb-2 block font-['Montserrat'] text-xs tracking-wide text-[#2a2a2a]/70 uppercase"
								>
									Servicio
								</label>
								<select
									id="service"
									className="w-full border border-[#2a2a2a]/10 bg-[#faf8f5] px-4 py-3 font-['Montserrat'] text-sm transition-colors focus:border-[#c9a96e] focus:outline-none"
									defaultValue="Selecciona un servicio"
								>
									<option>Selecciona un servicio</option>
									{availableServices.map((service) => (
										<option key={service}>{service}</option>
									))}
								</select>
							</div>

							<div>
								<label
									htmlFor="message"
									className="mb-2 block font-['Montserrat'] text-xs tracking-wide text-[#2a2a2a]/70 uppercase"
								>
									Mensaje
								</label>
								<textarea
									id="message"
									rows={5}
									className="w-full resize-none border border-[#2a2a2a]/10 bg-[#faf8f5] px-4 py-3 font-['Montserrat'] text-sm transition-colors focus:border-[#c9a96e] focus:outline-none"
									placeholder="Cuentame sobre tu evento o proyecto..."
								/>
							</div>

							<button
								type="submit"
								className="w-full bg-[#2a2a2a] py-4 font-['Montserrat'] text-sm tracking-wider text-white uppercase transition-colors duration-300 hover:bg-[#c9a96e]"
							>
								Enviar mensaje
							</button>
						</form>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
