// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { loadEnv } from "vite";

const env = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "");
const remotePatterns = [
  {
    protocol: "https",
    hostname: "images.unsplash.com",
    pathname: "/**",
  },
];

if (env.PAYLOAD_API_URL) {
  try {
    const payloadURL = new URL(env.PAYLOAD_API_URL);

    remotePatterns.push({
      protocol: payloadURL.protocol.replace(":", ""),
      hostname: payloadURL.hostname,
      port: payloadURL.port,
      pathname: "/**",
    });
  } catch {
    // Ignore invalid PAYLOAD_API_URL values in config.
  }
}

export default defineConfig({
  integrations: [react()],
  image: {
    remotePatterns,
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: true,
    },
    preview: {
      allowedHosts: true,
    },
  },
});
