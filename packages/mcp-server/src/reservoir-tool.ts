import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function reservoirSample(args: Record<string, unknown>) {
  const items = args.items as unknown[];
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("items must be a non-empty array.");
  }
  if (items.length > 100000) throw new Error("items must have 100000 entries or fewer.");

  const k = typeof args.k === "number" ? args.k : 1;
  if (k < 1) throw new Error("k must be at least 1.");
  if (k > items.length) throw new Error("k must not exceed the number of items.");

  const seed = typeof args.seed === "number" ? args.seed : null;

  let rng: () => number;
  if (seed !== null) {
    let s = seed | 0;
    rng = () => {
      s = (s * 1664525 + 1013904223) & 0x7fffffff;
      return s / 0x7fffffff;
    };
  } else {
    rng = Math.random;
  }

  const reservoir: { item: unknown; original_index: number }[] = [];
  for (let i = 0; i < k; i++) {
    reservoir.push({ item: items[i], original_index: i });
  }

  let replacements = 0;
  for (let i = k; i < items.length; i++) {
    const j = Math.floor(rng() * (i + 1));
    if (j < k) {
      reservoir[j] = { item: items[i], original_index: i };
      replacements++;
    }
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Each item has equal probability k/n of being in the sample",
      "Use a fixed seed for reproducible results",
    ],
  };
  return stampMeta({
    total_items: items.length,
    sample_size: k,
    seeded: seed !== null,
    replacements_made: replacements,
    sample: reservoir,
  }, meta);
}
