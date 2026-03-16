# Payload CMS

This folder contains the standalone Payload app for managing homepage content used by the Astro frontend.

## Setup

1. Install dependencies inside `cms`.
2. Copy `cms/.env.example` to `cms/.env`.
3. Start the CMS with `npm run dev`.
4. Open `http://localhost:3000/admin` to create the first user.
5. Point the Astro app to the CMS with `PAYLOAD_API_URL=http://localhost:3000`.

## Content model

- `images`: upload collection used by the homepage hero, biography, and section galleries.
- `photoshoots`: reusable photoshoot entries with `slug`, `title`, `description`, `mainImage`, and gallery images.
- `sections`: editable homepage sections with `slug`, `title`, `mainDescription`, `mainImages`, and one-or-more related `photoshoots`.
- `homepage`: global for SEO, branding, hero content, biography content, and a max-4 navigation selector that can point to sections plus `Contact`.

## Notes

- The Astro site keeps a fallback dataset until the CMS is populated.
- The frontend creates `/works/[slug]` pages from the section entries, and each page now lists that section's related photoshoots.
