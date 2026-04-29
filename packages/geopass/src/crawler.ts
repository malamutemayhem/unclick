import type { GeoPassPack } from "./schema.js";

export interface GeoPassCrawlerPlan {
  runner: "geopass-crawler";
  target_url: string;
  max_pages: number;
  respect_robots: boolean;
  include_sitemap: boolean;
  extractors: string[];
  notes: string[];
}

export function buildCrawlerPlan(pack: GeoPassPack): GeoPassCrawlerPlan {
  return {
    runner: "geopass-crawler",
    target_url: pack.url,
    max_pages: pack.crawl.max_pages,
    respect_robots: pack.crawl.respect_robots,
    include_sitemap: pack.crawl.include_sitemap,
    extractors: [
      "robots-policy",
      "sitemap-urls",
      "canonical-url",
      "metadata",
      "schema-json-ld",
      "heading-facts",
      "citation-targets",
    ],
    notes: [
      "Chunk 1 scaffold only: this builds the crawl and extraction plan.",
      "A later chip will execute crawls, persist runs, and compare answer-engine visibility.",
    ],
  };
}
