import { Globe, Mail, Phone } from "lucide-react";
import { motion } from "motion/react";
import type { FormEvent } from "react";
import type { ContactContent, ContactItem } from "../types/content";

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

function TikTokIcon() {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 24 24"
			className="mt-1 h-5 w-5 transition-transform group-hover:scale-110"
			fill="currentColor"
		>
			<path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.12v13.17a2.78 2.78 0 1 1-2.78-2.78c.23 0 .45.03.66.08V9.3a5.9 5.9 0 0 0-.66-.04A5.9 5.9 0 1 0 15.82 15V8.33a7.9 7.9 0 0 0 4.62 1.49V6.69h-.85Z" />
		</svg>
	);
}

function FacebookIcon() {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 24 24"
			className="mt-1 h-5 w-5 transition-transform group-hover:scale-110"
			fill="currentColor"
		>
			<path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.6 1.6-1.6H16.7V4.8c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2V11H7.7v3h2.6v8h3.2Z" />
		</svg>
	);
}

interface ContactSectionProps {
	contact: ContactContent;
	serviceOptions: string[];
}

const contactEmail =
	import.meta.env.PUBLIC_CONTACT_EMAIL || "hola@nunamakeup.com";

function getContactItemIcon(type: ContactItem["type"]) {
	switch (type) {
		case "email":
			return (
				<Mail
					size={20}
					className="mt-1 transition-transform group-hover:scale-110"
				/>
			);
		case "telephone":
			return (
				<Phone
					size={20}
					className="mt-1 transition-transform group-hover:scale-110"
				/>
			);
		case "instagram":
			return <InstagramIcon />;
		case "tiktok":
			return <TikTokIcon />;
		case "facebook":
			return <FacebookIcon />;
		case "other":
			return (
				<Globe
					size={20}
					className="mt-1 transition-transform group-hover:scale-110"
				/>
			);
		default:
			return (
				<Globe
					size={20}
					className="mt-1 transition-transform group-hover:scale-110"
				/>
			);
	}
}

function getContactItemLabel(type: ContactItem["type"]) {
	switch (type) {
		case "email":
			return "Email";
		case "telephone":
			return "Télefono";
		case "instagram":
			return "Instagram";
		case "tiktok":
			return "TikTok";
		case "facebook":
			return "Facebook";
		case "other":
			return "Link";
		default:
			return "Link";
	}
}

function getContactItemHref(item: ContactItem) {
	if (!item.url) {
		return undefined;
	}

	switch (item.type) {
		case "email":
			return item.url.startsWith("mailto:")
				? item.url
				: `mailto:${item.url}`;
		case "telephone":
			return item.url.startsWith("tel:")
				? item.url
				: `tel:${item.url.replace(/\s+/g, "")}`;
		default:
			return item.url;
	}
}

function shouldOpenInNewTab(type: ContactItem["type"]) {
	return !["email", "telephone"].includes(type);
}

export default function ContactSection({
	contact,
	serviceOptions,
}: ContactSectionProps) {
	const availableServices = serviceOptions.length
		? serviceOptions
		: [];
	const horarioLines = contact.horario
		.split("\n")
		.map((line) => line.trim())
		.filter((line) => line.length > 0);
	const defaultServiceOption = "Selecciona un servicio";
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

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const name = String(formData.get("name") ?? "").trim();
		const service = String(formData.get("service") ?? "").trim();
		const message = String(formData.get("message") ?? "").trim();
		const selectedService =
			service && service !== defaultServiceOption
				? service
				: "Consulta general";
		const subject = `Consulta desde la web - ${selectedService}`;
		const body = [
			"Hola NUNA,",
			"",
			`Nombre: ${name || "No indicado"}`,
			`Servicio: ${selectedService}`,
			"",
			"Mensaje:",
			message || "Sin mensaje.",
		].join("\n");

		window.location.href = `mailto:${encodeURIComponent(contactEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
	}

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
						{contact.title}
					</motion.h2>
					<motion.div className="mx-auto" {...bodyMotion}>
						<p className="mt-2 max-w-2xl font-['Montserrat'] text-base leading-relaxed text-[#2a2a2a]/70">
							{contact.description}
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
								{contact.socials.map((item) => {
									const href = getContactItemHref(item);
									const displayText =
										item.label?.trim() || item.url;
									const title = getContactItemLabel(
										item.type,
									);
									const content = (
										<>
											{getContactItemIcon(item.type)}
											<div>
												<p className="mb-1 font-['Montserrat'] text-xs tracking-widest text-[#2a2a2a]/50 uppercase">
													{title}
												</p>
												<p className="font-['Montserrat'] text-sm">
													{displayText}
												</p>
											</div>
										</>
									);

									if (!href) {
										return (
											<div
												key={`${item.type}-${item.url}`}
												className="flex items-start gap-4 text-[#2a2a2a]"
											>
												{content}
											</div>
										);
									}

									return (
										<a
											key={`${item.type}-${item.url}`}
											href={href}
											target={
												shouldOpenInNewTab(item.type)
													? "_blank"
													: undefined
											}
											rel={
												shouldOpenInNewTab(item.type)
													? "noopener noreferrer"
													: undefined
											}
											className="group flex items-start gap-4 text-[#2a2a2a] transition-colors duration-300 hover:text-[#c9a96e]"
										>
											{content}
										</a>
									);
								})}
							</div>
						</div>

						<div className="border-t border-[#2a2a2a]/10 pt-8">
							<p className="mb-3 font-['Montserrat'] text-xs tracking-widest text-[#2a2a2a]/50 uppercase">
								Horario
							</p>
							{horarioLines.map((line) => (
								<p
									key={line}
									className="font-['Montserrat'] text-sm text-[#2a2a2a]/70"
								>
									{line}
								</p>
							))}
						</div>
					</motion.div>

					<motion.div
						className="bg-white p-8 md:p-10"
						{...rightMotion}
					>
						<h3 className="mb-6 font-['Cormorant_Garamond'] text-3xl text-[#2a2a2a]">
							Envíame un mensaje
						</h3>

						<form className="space-y-5" onSubmit={handleSubmit}>
							<div>
								<label
									htmlFor="name"
									className="mb-2 block font-['Montserrat'] text-xs tracking-wide text-[#2a2a2a]/70 uppercase"
								>
									Nombre
								</label>
								<input
									id="name"
									name="name"
									type="text"
									className="w-full border border-[#2a2a2a]/10 bg-[#faf8f5] px-4 py-3 font-['Montserrat'] text-sm transition-colors focus:border-[#c9a96e] focus:outline-none"
									placeholder="Tu nombre completo"
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
									name="service"
									className="w-full border border-[#2a2a2a]/10 bg-[#faf8f5] px-4 py-3 font-['Montserrat'] text-sm transition-colors focus:border-[#c9a96e] focus:outline-none"
									defaultValue={defaultServiceOption}
								>
									<option>{defaultServiceOption}</option>
									{availableServices.map((service) => (
										<option key={service} value={service}>
											{service}
										</option>
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
									name="message"
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
