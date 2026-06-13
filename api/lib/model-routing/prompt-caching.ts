// Anthropic prompt-caching helpers (cost lever slice).
//
// Prompt caching reuses a stable PREFIX (system instructions, tool definitions,
// large fixed context) across calls so it is billed at a fraction of the input
// rate. The discipline is: structure every repeated call as a stable cacheable
// prefix + a small variable suffix, and put a cache breakpoint at the end of the
// stable part. See docs/model-routing-cost-lever.md for the call-site plan.
//
// Pure functions only: they SHAPE an Anthropic Messages request (add
// cache_control breakpoints); they never call the API and never mutate inputs.

// Anthropic accepts an ephemeral cache breakpoint, optionally with a 1h TTL
// (default is 5 minutes).
export type CacheTtl = "5m" | "1h";

export interface CacheControl {
  readonly type: "ephemeral";
  readonly ttl?: "1h";
}

export const EPHEMERAL_CACHE_CONTROL: CacheControl = { type: "ephemeral" };

export interface TextBlock {
  type: "text";
  text: string;
  cache_control?: CacheControl;
}

// Build the cache_control marker for a TTL. 5m is the default ephemeral cache;
// 1h is the extended cache for prefixes reused over a longer window.
export function cacheControl(ttl: CacheTtl = "5m"): CacheControl {
  return ttl === "1h" ? { type: "ephemeral", ttl: "1h" } : { type: "ephemeral" };
}

// Turn a stable system prefix into a cacheable system field: one text block with
// a cache breakpoint, so Anthropic reuses it across calls.
export function cacheableSystem(stablePrefix: string, ttl: CacheTtl = "5m"): TextBlock[] {
  return [{ type: "text", text: stablePrefix, cache_control: cacheControl(ttl) }];
}

export interface PrefixSplit {
  readonly stablePrefix: string;
  readonly variableSuffix: string;
}

// Split a prompt that concatenates a stable prefix and a per-call variable suffix
// on the FIRST occurrence of a delimiter, so the prefix can be cached and only
// the suffix changes per call. If the delimiter is absent the whole string is
// treated as variable (nothing is cached) - the safe default.
export function splitStablePrefix(full: string, delimiter: string): PrefixSplit {
  const text = String(full ?? "");
  if (!delimiter) return { stablePrefix: "", variableSuffix: text };
  const idx = text.indexOf(delimiter);
  if (idx < 0) return { stablePrefix: "", variableSuffix: text };
  return {
    stablePrefix: text.slice(0, idx),
    variableSuffix: text.slice(idx + delimiter.length),
  };
}

// Add a cache breakpoint to the LAST tool definition. A breakpoint caches every
// block before it too, so one marker on the final tool caches the whole tools
// prefix. Returns a new array; inputs are not mutated.
export function withCachedTools<T extends object>(
  tools: T[],
  ttl: CacheTtl = "5m",
): Array<T & { cache_control?: CacheControl }> {
  if (!Array.isArray(tools) || tools.length === 0) return [];
  const last = tools.length - 1;
  return tools.map((tool, i) =>
    i === last ? { ...tool, cache_control: cacheControl(ttl) } : { ...tool },
  );
}

export interface CacheableRequest {
  system?: string | TextBlock[];
  tools?: object[];
  [key: string]: unknown;
}

export interface ApplyPromptCachingOptions {
  // Also cache the tool definitions (a stable, often-large prefix).
  readonly cacheTools?: boolean;
  readonly ttl?: CacheTtl;
}

// Apply prompt caching to an Anthropic Messages request: put a cache breakpoint
// at the end of the system prefix (normalizing a string system to a text block),
// and optionally on the tools. Returns a shallow-cloned request; the original is
// never mutated. A request with no system and no tools comes back unchanged.
export function applyPromptCaching<R extends CacheableRequest>(
  request: R,
  opts: ApplyPromptCachingOptions = {},
): R {
  const ttl = opts.ttl ?? "5m";
  const next: R = { ...request };

  if (typeof request.system === "string" && request.system.trim() !== "") {
    next.system = cacheableSystem(request.system, ttl);
  } else if (Array.isArray(request.system) && request.system.length > 0) {
    const blocks = request.system;
    const last = blocks.length - 1;
    next.system = blocks.map((b, i) =>
      i === last ? { ...b, cache_control: cacheControl(ttl) } : b,
    );
  }

  if (opts.cacheTools && Array.isArray(request.tools) && request.tools.length > 0) {
    next.tools = withCachedTools(request.tools, ttl);
  }

  return next;
}
