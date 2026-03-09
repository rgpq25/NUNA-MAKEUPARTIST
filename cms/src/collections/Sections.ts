import type { CollectionConfig } from "payload";

import { slugify } from "../utilities/slugify";

export const Sections: CollectionConfig = {
  slug: "sections",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
    description:
      "Homepage sections. The future photoshoots relationship is intentionally deferred until that collection exists.",
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
      name: "mainDescription",
      type: "textarea",
      required: true,
    },
    {
      name: "mainImages",
      label: "Main images",
      type: "relationship",
      relationTo: "images",
      hasMany: true,
      required: true,
      minRows: 1,
    },
  ],
};
