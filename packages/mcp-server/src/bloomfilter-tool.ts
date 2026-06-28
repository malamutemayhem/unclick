import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function bloomFilter(args: Record<string, unknown>) {
  const items = args.items as string[];
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("items must be a non-empty array of strings to insert.");
  }
  if (items.length > 100000) throw new Error("items must have 100000 entries or fewer.");

  const query = args.query as string[];
  if (!Array.isArray(query) || query.length === 0) {
    throw new Error("query must be a non-empty array of strings to check.");
  }

  const fpRate = typeof args.fp_rate === "number" ? args.fp_rate : 0.01;
  if (fpRate <= 0 || fpRate >= 1) throw new Error("fp_rate must be between 0 and 1 (exclusive).");

  const n = items.length;
  const m = Math.ceil(-n * Math.log(fpRate) / (Math.log(2) ** 2));
  const k = Math.max(1, Math.round((m / n) * Math.log(2)));

  const bits = new Uint8Array(Math.ceil(m / 8));

  const hash = (str: string, seed: number): number => {
    let h = seed;
    for (let i = 0; i < str.length; i++) {
      h = (h * 31 + str.charCodeAt(i)) & 0x7fffffff;
    }
    return h % m;
  };

  const setBit = (pos: number) => { bits[pos >> 3] |= 1 << (pos & 7); };
  const getBit = (pos: number) => (bits[pos >> 3] >> (pos & 7)) & 1;

  for (const item of items) {
    for (let i = 0; i < k; i++) {
      setBit(hash(String(item), i * 0x9e3779b9));
    }
  }

  const results: { item: string; probably_in_set: boolean }[] = [];
  let positives = 0;
  for (const q of query) {
    let found = true;
    for (let i = 0; i < k; i++) {
      if (!getBit(hash(String(q), i * 0x9e3779b9))) {
        found = false;
        break;
      }
    }
    results.push({ item: String(q), probably_in_set: found });
    if (found) positives++;
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "False negatives never occur; false positives are possible at the configured rate",
      "Lower fp_rate increases memory usage but reduces false positives",
    ],
  };
  return stampMeta({
    items_inserted: n,
    queries_checked: query.length,
    bit_array_size: m,
    hash_functions: k,
    target_fp_rate: fpRate,
    positives,
    negatives: query.length - positives,
    results,
  }, meta);
}
