// WriterLane live-catalog picker (free-model availability slice).
//
// The free-model registry (writerlane-free-models.ts) is a hand-maintained
// priority list. Free model ids on OpenRouter churn: some disappear, some flip
// to paid, some rate-limit. This module closes that gap by reconciling the
// configured priority list against the LIVE OpenRouter catalog before picking,
// so the writer does not waste attempts on a model that no longer exists or is
// no longer free, and auto-falls back to the static chain whenever the catalog
// is unavailable.
//
// Design mirrors the rest of the writerlane scaffolding: the reconcile / rank /
// pick logic is PURE and deterministic (no network), and the single network
// touch (fetchOpenRouterCatalog) is a thin, NON-THROWING wrapper with an
// injectable fetch so tests never hit the wire. Free models ONLY: a row is only
// kept live if the catalog confirms it is free (or it is a free meta-route).

import {
  isFreeModelSlug,
  selectDefaultFreeChain,
  WRITERLANE_FREE_MODELS,
  type DefaultChainOptions,
  type WriterLaneFreeModel,
} from "./writerlane-free-models.js";
import type { WriterLaneTaskKind } from "./writerlane-router.js";

// OpenRouter's public catalog endpoint. GET, no auth required (a key is accepted
// but never logged).
export const OPENROUTER_MODELS_URL = "https://openrouter.ai/api/v1/models";

// Default timeout for the catalog fetch. The catalog is an optimisation, never a
// hard dependency, so it fails fast and the caller falls back to the static chain.
const DEFAULT_CATALOG_TIMEOUT_MS = 8000;

// A normalized catalog entry: only what the picker needs.
export interface LiveCatalogModel {
  readonly id: string;
  readonly isFree: boolean;
}

export type LiveCatalog = ReadonlyArray<LiveCatalogModel>;

// A free meta-route (e.g. "openrouter/free") is a router, not a concrete catalog
// id, so it never appears in /models. Such routes are free by definition and are
// always kept regardless of the catalog.
export function isFreeMetaRoute(slug: string): boolean {
  const s = String(slug ?? "")
    .trim()
    .toLowerCase();
  return s.length > 0 && !s.endsWith(":free") && isFreeModelSlug(s);
}

function priceIsZero(value: unknown): boolean {
  if (value == null) return false;
  const n = typeof value === "number" ? value : Number(String(value).trim());
  return Number.isFinite(n) && n === 0;
}

function catalogEntryIsFree(entry: Record<string, unknown>, id: string): boolean {
  if (id.toLowerCase().endsWith(":free")) return true;
  const pricing = entry.pricing;
  if (pricing && typeof pricing === "object") {
    const p = pricing as Record<string, unknown>;
    // Free only when BOTH prompt and completion are explicitly priced at 0.
    if (priceIsZero(p.prompt) && priceIsZero(p.completion)) return true;
  }
  return false;
}

// Parse the raw OpenRouter /models payload into the normalized catalog. Tolerant
// of shape drift: anything unreadable becomes an empty catalog (not a throw) so a
// malformed response simply degrades to static fallback.
export function parseOpenRouterCatalog(raw: unknown): LiveCatalog {
  const data = (raw as { data?: unknown } | null | undefined)?.data;
  if (!Array.isArray(data)) return [];
  const out: LiveCatalogModel[] = [];
  for (const entry of data) {
    if (!entry || typeof entry !== "object") continue;
    const rec = entry as Record<string, unknown>;
    const id = typeof rec.id === "string" ? rec.id.trim() : "";
    if (!id) continue;
    out.push({ id, isFree: catalogEntryIsFree(rec, id) });
  }
  return out;
}

// Drift between the configured registry and the live catalog, for observability.
export interface CatalogDrift {
  readonly missing: string[]; // registry slug not present in the catalog at all
  readonly nowPaid: string[]; // present in the catalog but no longer free
  readonly liveCount: number; // registry rows still confirmed live + free
}

export interface ReconcileResult {
  readonly live: WriterLaneFreeModel[];
  readonly drift: CatalogDrift;
}

// Keep only registry rows the catalog confirms are available AND free (free
// meta-routes are always kept). Reports drift so a caller can log or alert when
// the configured list has rotted.
export function reconcileFreeModelsWithCatalog(
  catalog: LiveCatalog,
  registry: WriterLaneFreeModel[] = WRITERLANE_FREE_MODELS,
): ReconcileResult {
  const allIds = new Set<string>();
  const freeIds = new Set<string>();
  for (const m of catalog) {
    const key = m.id.toLowerCase();
    allIds.add(key);
    if (m.isFree) freeIds.add(key);
  }

  const live: WriterLaneFreeModel[] = [];
  const missing: string[] = [];
  const nowPaid: string[] = [];
  for (const row of registry) {
    if (isFreeMetaRoute(row.openRouterModel)) {
      live.push({ ...row });
      continue;
    }
    const slug = row.openRouterModel.toLowerCase();
    if (!allIds.has(slug)) {
      missing.push(row.openRouterModel);
      continue;
    }
    if (!freeIds.has(slug)) {
      nowPaid.push(row.openRouterModel);
      continue;
    }
    live.push({ ...row });
  }

  return { live, drift: { missing, nowPaid, liveCount: live.length } };
}

export type PickSource = "live" | "static-fallback";

export interface FreeModelPick {
  // First-available model, or null if even the static chain is empty.
  readonly model: WriterLaneFreeModel | null;
  // The full ordered fallback chain the writer should try in turn.
  readonly chain: WriterLaneFreeModel[];
  // Where the chain came from: catalog-verified ("live") or static fallback.
  readonly source: PickSource;
  // Human-readable reason for the choice (for logs / attempt records).
  readonly reason: string;
  // Drift report when a live catalog was used, else null.
  readonly drift: CatalogDrift | null;
}

function staticFallback(
  taskKind: WriterLaneTaskKind,
  registry: WriterLaneFreeModel[],
  opts: DefaultChainOptions,
  reason: string,
  drift: CatalogDrift | null,
): FreeModelPick {
  const chain = selectDefaultFreeChain(taskKind, registry, opts);
  return { model: chain[0] ?? null, chain, source: "static-fallback", reason, drift };
}

// THE picker. Rank the configured free models for the task, prefer those the live
// catalog confirms are available and free, and return the first-available model
// WITH a reason plus the ordered fallback chain. When the catalog is null/empty
// (fetch failed or skipped), or no configured model survives reconciliation, it
// auto-falls back to the static priority chain so the writer never stalls.
export function selectAvailableFreeModel(
  taskKind: WriterLaneTaskKind,
  catalog: LiveCatalog | null,
  registry: WriterLaneFreeModel[] = WRITERLANE_FREE_MODELS,
  opts: DefaultChainOptions = {},
): FreeModelPick {
  if (!catalog) {
    return staticFallback(
      taskKind,
      registry,
      opts,
      "no live catalog (fetch failed or skipped); using static priority chain",
      null,
    );
  }
  if (catalog.length === 0) {
    return staticFallback(
      taskKind,
      registry,
      opts,
      "live catalog empty; using static priority chain",
      null,
    );
  }

  const { live, drift } = reconcileFreeModelsWithCatalog(catalog, registry);
  if (live.length === 0) {
    return staticFallback(
      taskKind,
      registry,
      opts,
      `no configured model is live + free in the catalog (missing ${drift.missing.length}, now-paid ${drift.nowPaid.length}); using static priority chain`,
      drift,
    );
  }

  const chain = selectDefaultFreeChain(taskKind, live, opts);
  if (chain.length === 0) {
    // Live models existed but every one was filtered out by chain options (e.g.
    // a minContextTokens floor). Fall back so we still have hands.
    return staticFallback(
      taskKind,
      registry,
      opts,
      "all live models filtered out by chain options; using static priority chain",
      drift,
    );
  }

  const top = chain[0];
  return {
    model: top,
    chain,
    source: "live",
    reason: `top live free model for ${taskKind}: ${top.openRouterModel} (ranked over ${chain.length} live; ${drift.missing.length} missing, ${drift.nowPaid.length} now-paid)`,
    drift,
  };
}

export interface FetchCatalogOptions {
  readonly url?: string;
  readonly apiKey?: string;
  readonly timeoutMs?: number;
  readonly signal?: AbortSignal;
}

// Thin, NON-THROWING fetch of the live catalog. Returns the normalized catalog,
// or null on any failure (no fetch, non-200, network error, abort, malformed or
// empty body) so the caller auto-falls back. fetchImpl is injectable so tests
// never hit the network. Never logs the api key.
export async function fetchOpenRouterCatalog(
  fetchImpl: typeof fetch | undefined = globalThis.fetch,
  opts: FetchCatalogOptions = {},
): Promise<LiveCatalog | null> {
  const doFetch = fetchImpl;
  if (typeof doFetch !== "function") return null;

  const url = opts.url || OPENROUTER_MODELS_URL;
  const headers: Record<string, string> = { Accept: "application/json" };
  if (opts.apiKey) headers.Authorization = `Bearer ${opts.apiKey}`;

  // Local timeout so a hung catalog call never blocks the writer. Skipped when the
  // caller supplies its own signal.
  let controller: AbortController | null = null;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let signal = opts.signal;
  if (!signal) {
    const timeoutMs =
      typeof opts.timeoutMs === "number" && opts.timeoutMs > 0
        ? opts.timeoutMs
        : DEFAULT_CATALOG_TIMEOUT_MS;
    controller = new AbortController();
    signal = controller.signal;
    timer = setTimeout(() => controller?.abort(), timeoutMs);
  }

  try {
    const res = await doFetch(url, { method: "GET", headers, signal });
    if (!res || !res.ok) return null;
    const json = (await res.json()) as unknown;
    const catalog = parseOpenRouterCatalog(json);
    return catalog.length > 0 ? catalog : null;
  } catch {
    return null;
  } finally {
    if (timer) clearTimeout(timer);
  }
}
