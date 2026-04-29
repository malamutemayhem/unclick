import * as crypto from "node:crypto";
import * as fs from "node:fs";
import * as path from "node:path";
import yaml from "js-yaml";

const PACKS_DIR = path.resolve(
  process.env.GEOPASS_PACKS_DIR ??
    path.join(process.cwd(), "packages", "geopass", "packs", "registered"),
);

const REQUIRED_PACK_KEYS = ["name", "url", "checks", "ai_surfaces", "crawl", "entities", "budgets"] as const;

function ensurePacksDir(): void {
  fs.mkdirSync(PACKS_DIR, { recursive: true });
}

function safeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]+/g, "-").slice(0, 120);
}

function loadRegisteredPack(name: string): Record<string, unknown> | null {
  ensurePacksDir();
  const candidate = fs.readdirSync(PACKS_DIR).find((file) => file.startsWith(`${safeFilename(name)}-`));
  if (!candidate) return null;
  return yaml.load(fs.readFileSync(path.join(PACKS_DIR, candidate), "utf8")) as Record<string, unknown>;
}

function normaliseCrawl(crawl: unknown): Record<string, unknown> {
  return crawl && typeof crawl === "object" && !Array.isArray(crawl) ? (crawl as Record<string, unknown>) : {};
}

function crawlerPlan(pack: Record<string, unknown>): Record<string, unknown> {
  const crawl = normaliseCrawl(pack.crawl);
  return {
    runner: "geopass-crawler",
    target_url: pack.url,
    max_pages: typeof crawl.max_pages === "number" ? crawl.max_pages : 25,
    respect_robots: typeof crawl.respect_robots === "boolean" ? crawl.respect_robots : true,
    include_sitemap: typeof crawl.include_sitemap === "boolean" ? crawl.include_sitemap : true,
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

export async function geopassRun(args: Record<string, unknown>): Promise<unknown> {
  const url = typeof args.url === "string" ? args.url : undefined;
  const packName = typeof args.pack_name === "string" ? args.pack_name : undefined;
  if (!url && !packName) return { error: "Either url or pack_name is required" };

  const pack = packName ? loadRegisteredPack(packName) : null;
  const targetUrl = url ?? (typeof pack?.url === "string" ? pack.url : undefined);
  if (!targetUrl) return { error: `No registered GEOPass pack found for '${packName}'` };

  const plannedPack = { ...(pack ?? {}), url: targetUrl };
  return {
    status: "planned",
    pass: "geopass",
    target_url: targetUrl,
    checks: pack?.checks ?? [
      "ai-crawler-access",
      "entity-consistency",
      "citation-readiness",
      "source-attribution",
      "structured-facts",
      "answer-engine-prompts",
    ],
    ai_surfaces: pack?.ai_surfaces ?? ["chatgpt", "claude", "perplexity"],
    crawler_plan: crawlerPlan(plannedPack),
    note: "GEOPass Chunk 1 is scaffold-only. Execution and persistence land in a later chip.",
  };
}

export async function geopassStatus(args: Record<string, unknown>): Promise<unknown> {
  const runId = typeof args.run_id === "string" ? args.run_id : "";
  if (!runId) return { error: "run_id is required" };
  return {
    run_id: runId,
    status: "not_implemented",
    note: "GEOPass run persistence lands in a later chip.",
  };
}

export async function geopassRegisterPack(args: Record<string, unknown>): Promise<unknown> {
  const packYaml = typeof args.pack_yaml === "string" ? args.pack_yaml : "";
  if (!packYaml) return { error: "pack_yaml is required" };

  let parsed: unknown;
  try {
    parsed = yaml.load(packYaml);
  } catch (err) {
    return { error: `pack_yaml is not valid YAML: ${(err as Error).message}` };
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    return { error: "pack_yaml must be a YAML object at the top level" };
  }

  const pack = parsed as Record<string, unknown>;
  const missing = REQUIRED_PACK_KEYS.filter((key) => pack[key] === undefined);
  if (missing.length > 0) return { error: "pack is missing required keys", missing };

  const name = typeof pack.name === "string" ? pack.name : "";
  if (!name) return { error: "pack name must be a non-empty string" };

  ensurePacksDir();
  const packId = `${safeFilename(name)}-${crypto.randomBytes(4).toString("hex")}`;
  const filePath = path.join(PACKS_DIR, `${packId}.yaml`);
  fs.writeFileSync(filePath, packYaml, "utf8");
  return { pack_id: packId, name, file: filePath };
}

export async function geopassCrawlPlan(args: Record<string, unknown>): Promise<unknown> {
  const url = typeof args.url === "string" ? args.url : "";
  if (!url) return { error: "url is required" };
  return crawlerPlan({
    url,
    crawl: {
      max_pages: typeof args.max_pages === "number" ? args.max_pages : 25,
      respect_robots: args.respect_robots !== false,
      include_sitemap: args.include_sitemap !== false,
    },
  });
}
