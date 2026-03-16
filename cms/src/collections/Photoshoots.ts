import type { CollectionConfig } from "payload";

import { slugify } from "../utilities/slugify";

export const Photoshoots: CollectionConfig = {
  slug: "photoshoots",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
  },
  fields: [
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [
          ({
            value,
            siblingData,
          }: {
            value?: unknown;
            siblingData?: { title?: unknown };
          }) => {
            if (typeof value === "string" && value.trim()) {
              return slugify(value);
            }

            return slugify(siblingData?.title);
          },
        ],
      },
      validate: (value: unknown) => {
        if (typeof value !== "string" || !value.trim()) {
          return "Slug is required.";
        }

        return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
          ? true
          : "Use lowercase letters, numbers, and hyphens only.";
      },
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "mainImage",
      label: "Main image",
      type: "relationship",
      relationTo: "images",
      required: true,
    },
    {
      name: "images",
      type: "relationship",
      relationTo: "images",
      hasMany: true,
    },
  ],
};
