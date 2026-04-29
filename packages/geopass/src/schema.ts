import { z } from "zod";

export const GeoPassCheckIdSchema = z.enum([
  "ai-crawler-access",
  "entity-consistency",
  "citation-readiness",
  "source-attribution",
  "structured-facts",
  "answer-engine-prompts",
  "competitor-comparison",
  "content-extractability",
]);

export const GeoPassSurfaceSchema = z.enum([
  "chatgpt",
  "claude",
  "gemini",
  "perplexity",
  "google-ai-overviews",
  "bing-copilot",
]);

export const GeoPassBudgetSchema = z
  .object({
    entity_confidence: z.string().optional(),
    citation_targets: z.string().optional(),
    crawler_blockers: z.string().optional(),
    prompt_coverage: z.string().optional(),
  })
  .catchall(z.string());

export const GeoPassPackSchema = z.object({
  name: z.string().min(1),
  url: z.string().url(),
  checks: z.array(GeoPassCheckIdSchema).min(1),
  ai_surfaces: z.array(GeoPassSurfaceSchema).default(["chatgpt", "claude", "perplexity"]),
  crawl: z
    .object({
      max_pages: z.number().int().positive().max(500).default(25),
      respect_robots: z.boolean().default(true),
      include_sitemap: z.boolean().default(true),
    })
    .default({ max_pages: 25, respect_robots: true, include_sitemap: true }),
  entities: z
    .object({
      brand: z.string().optional(),
      product: z.string().optional(),
      category: z.string().optional(),
      competitors: z.array(z.string()).optional(),
    })
    .default({}),
  prompts: z.array(z.string()).default([]),
  budgets: GeoPassBudgetSchema.default({
    entity_confidence: ">= 80",
    citation_targets: ">= 3",
    crawler_blockers: "0",
  }),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type GeoPassPack = z.infer<typeof GeoPassPackSchema>;
export type GeoPassCheckId = z.infer<typeof GeoPassCheckIdSchema>;
export type GeoPassSurface = z.infer<typeof GeoPassSurfaceSchema>;
