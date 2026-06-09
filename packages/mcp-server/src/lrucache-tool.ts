import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function lruSimulate(args: Record<string, unknown>) {
  const accesses = args.accesses as (string | number)[];
  if (!Array.isArray(accesses) || accesses.length === 0) {
    throw new Error("accesses must be a non-empty array of keys.");
  }
  if (accesses.length > 100000) throw new Error("accesses must have 100000 entries or fewer.");

  const capacity = typeof args.capacity === "number" ? args.capacity : 4;
  if (capacity < 1) throw new Error("capacity must be at least 1.");
  if (capacity > 10000) throw new Error("capacity must be 10000 or fewer.");

  const cache: string[] = [];
  let hits = 0;
  let misses = 0;
  const evictions: string[] = [];
  const log: { key: string; result: "hit" | "miss"; evicted: string | null }[] = [];

  for (const raw of accesses) {
    const key = String(raw);
    const idx = cache.indexOf(key);

    if (idx !== -1) {
      hits++;
      cache.splice(idx, 1);
      cache.push(key);
      log.push({ key, result: "hit", evicted: null });
    } else {
      misses++;
      let evicted: string | null = null;
      if (cache.length >= capacity) {
        evicted = cache.shift()!;
        evictions.push(evicted);
      }
      cache.push(key);
      log.push({ key, result: "miss", evicted });
    }
  }

  const hitRate = accesses.length > 0 ? Math.round((hits / accesses.length) * 1e6) / 1e6 : 0;
  const uniqueKeys = new Set(accesses.map(String)).size;

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Hit rate depends on access pattern and cache capacity",
      "Try different capacities to find the optimal size for your workload",
    ],
  };
  return stampMeta({
    capacity,
    total_accesses: accesses.length,
    unique_keys: uniqueKeys,
    hits,
    misses,
    hit_rate: hitRate,
    total_evictions: evictions.length,
    final_cache_state: [...cache],
    log: log.length <= 100 ? log : undefined,
  }, meta);
}
