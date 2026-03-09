/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PAYLOAD_API_TOKEN?: string;
  readonly PAYLOAD_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
