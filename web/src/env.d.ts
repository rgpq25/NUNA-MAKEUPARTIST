/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PAYLOAD_API_TOKEN?: string;
  readonly PAYLOAD_API_URL?: string;
  readonly PUBLIC_CONTACT_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
