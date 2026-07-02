import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function sosDp(args: Record<string, unknown>) {
  const values = args.values as number[];
  const direction = (args.direction as string) || "superset_sum";

  if (!Array.isArray(values) || values.length === 0) {
    throw new Error("values must be a non-empty array");
  }

  let n = 1;
  let bits = 0;
  while (n < values.length) {
    n <<= 1;
    bits++;
  }

  if (values.length > n || bits > 20) {
    throw new Error("values length must be a power of 2 (max 2^20)");
  }

  if (values.length !== n) {
    throw new Error("values length must be a power of 2; got " + values.length);
  }

  const f = values.slice();

  if (direction === "subset_sum") {
    for (let i = 0; i < bits; i++) {
      for (let mask = 0; mask < n; mask++) {
        if (mask & (1 << i)) {
          f[mask] += f[mask ^ (1 << i)];
        }
      }
    }
  } else if (direction === "superset_sum") {
    for (let i = 0; i < bits; i++) {
      for (let mask = 0; mask < n; mask++) {
        if (!(mask & (1 << i))) {
          f[mask] += f[mask | (1 << i)];
        }
      }
    }
  } else {
    throw new Error("direction must be 'subset_sum' or 'superset_sum'");
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "subset_sum: f[mask] = sum of values[s] for all s that are subsets of mask",
      "superset_sum: f[mask] = sum of values[s] for all s that are supersets of mask",
    ],
  };

  return stampMeta(
    {
      result: f,
      bits,
      size: n,
      direction,
    },
    meta,
  );
}
