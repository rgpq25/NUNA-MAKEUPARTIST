// @ts-check
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

function getHostname(url) {
	if (!url) {
		return null;
	}

	try {
		return new URL(url).hostname;
	} catch {
		return null;
	}
}

const payloadImageDomain = getHostname(process.env.PAYLOAD_API_URL) ?? "localhost";

export default defineConfig({
	image: {
		domains: [payloadImageDomain],
	},
	integrations: [react()],
	vite: {
		plugins: [tailwindcss()],
	},
});
