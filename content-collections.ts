import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMarkdown } from "@content-collections/markdown";
import { z } from "zod";

// for more information on configuration, visit:
// https://www.content-collections.dev/docs/configuration

const docs = defineCollection({
  name: "docs",
  directory: "./src/app/content/docs",
  include: "*.md",
  schema: z.object({
    title: z.string(),
    slug: z.string(),
  }),
  transform: async (document, context) => {
    const html = await compileMarkdown(context, document);
    return {
      ...document,
      html,
    };
  },
});

const faqs = defineCollection({
  name: "faqs",
  directory: "./src/app/content/faqs",
  include: "*.md",
  schema: z.object({
    question: z.string(),
  }),
  transform: async (document, context) => {
    const html = await compileMarkdown(context, document);
    return {
      ...document,
      html,
    };
  },
});

const legal = defineCollection({
  name: "legal",
  directory: "./src/app/content/legal",
  include: "*.md",
  schema: z.object({
    title: z.string(),
    slug: z.string(),
  }),
  transform: async (document, context) => {
    const html = await compileMarkdown(context, document);
    return {
      ...document,
      html,
    };
  },
});

export default defineConfig({
  collections: [docs, faqs, legal],
});
