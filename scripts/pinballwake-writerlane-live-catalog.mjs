// WriterLane live-catalog picker (runner mirror of api/lib/writerlane/
// writerlane-live-catalog.ts). Kept in sync with the TS source; the runner is
// .mjs so it cannot import the TS module directly.
//
// Reconciles the configured free-model priority list against the LIVE OpenRouter
// catalog so the writer skips models that no longer exist or are no longer free,
// and auto-falls back to the static chain whenever the catalog is unavailable.
// The reconcile / rank / pick logic is pure; the single network touch
// (fetchOpenRouterCatalog) is a thin, non-throwing wrapper with an injectable
// fetch so tests never hit the wire.

import {
  isFreeModelSlug,
  selectDefaultFreeChain,
  WRITERLANE_FREE_MODELS,
} from "./pinballwake-writerlane-free-models.mjs";

export const OPENROUTER_MODELS_URL = "https://openrouter.ai/api/v1/models";
const DEFAULT_CATALOG_TIMEOUT_MS = 8000;

export function isFreeMetaRoute(slug) {
  const s = String(slug ?? "")
    .trim()
    .toLowerCase();
  return s.length > 0 && !s.endsWith(":free") && isFreeModelSlug(s);
}

function priceIsZero(value) {
  if (value == null) return false;
  const n = typeof value === "number" ? value : Number(String(value).trim());
  return Number.isFinite(n) && n === 0;
}

function catalogEntryIsFree(entry, id) {
  if (id.toLowerCase().endsWith(":free")) return true;
  const pricing = entry.pricing;
  if (pricing && typeof pricing === "object") {
    if (priceIsZero(pricing.prompt) && priceIsZero(pricing.completion)) return true;
  }
  return false;
}

export function parseOpenRouterCatalog(raw) {
  const data = raw?.data;
  if (!Array.isArray(data)) return [];
  const out = [];
  for (const entry of data) {
    if (!entry || typeof entry !== "object") continue;
    const id = typeof entry.id === "string" ? entry.id.trim() : "";
    if (!id) continue;
    out.push({ id, isFree: catalogEntryIsFree(entry, id) });
  }
  return out;
}

export function reconcileFreeModelsWithCatalog(catalog, registry = WRITERLANE_FREE_MODELS) {
  const allIds = new Set();
  const freeIds = new Set();
  for (const m of catalog) {
    const key = m.id.toLowerCase();
    allIds.add(key);
    if (m.isFree) freeIds.add(key);
  }
  const live = [];
  const missing = [];
  const nowPaid = [];
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

function staticFallback(taskKind, registry, opts, reason, drift) {
  const chain = selectDefaultFreeChain(taskKind, registry, opts);
  return { model: chain[0] ?? null, chain, source: "static-fallback", reason, drift };
}

export function selectAvailableFreeModel(
  taskKind,
  catalog,
  registry = WRITERLANE_FREE_MODELS,
  opts = {},
) {
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
    return staticFallback(taskKind, registry, opts, "live catalog empty; using static priority chain", null);
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

export async function fetchOpenRouterCatalog(fetchImpl = globalThis.fetch, opts = {}) {
  const doFetch = fetchImpl;
  if (typeof doFetch !== "function") return null;
  const url = opts.url || OPENROUTER_MODELS_URL;
  const headers = { Accept: "application/json" };
  if (opts.apiKey) headers.Authorization = `Bearer ${opts.apiKey}`;

  let controller = null;
  let timer = null;
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
    const json = await res.json();
    const catalog = parseOpenRouterCatalog(json);
    return catalog.length > 0 ? catalog : null;
  } catch {
    return null;
  } finally {
    if (timer) clearTimeout(timer);
  }
}

// True when the operator has opted the runner into live-catalog verification.
// Default OFF so the live cron runner's behaviour is unchanged until enabled.
export function isLiveCatalogEnabled(env = process.env) {
  const v = String(env?.WRITERLANE_USE_LIVE_CATALOG ?? "").trim().toLowerCase();
  return v === "1" || v === "true" || v === "yes";
}
