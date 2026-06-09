import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function chromaticNumber(args: Record<string, unknown>) {
  const vertexCount = args.vertex_count as number;
  const edges = args.edges as number[][];

  if (typeof vertexCount !== "number" || vertexCount < 1 || vertexCount > 20) {
    throw new Error("vertex_count must be between 1 and 20");
  }
  if (!Array.isArray(edges)) {
    throw new Error("edges must be an array of [u, v] pairs");
  }

  const n = vertexCount;
  const adj = new Uint32Array(n);
  for (const [u, v] of edges) {
    if (u < 0 || u >= n || v < 0 || v >= n) throw new Error("edge vertex out of range");
    if (u === v) continue;
    adj[u] |= 1 << v;
    adj[v] |= 1 << u;
  }

  const full = (1 << n) - 1;
  const isIndep = new Uint8Array(1 << n);
  isIndep[0] = 1;
  for (let mask = 1; mask <= full; mask++) {
    const lowest = mask & -mask;
    const v = Math.log2(lowest);
    const rest = mask ^ lowest;
    if (isIndep[rest] && (adj[v] & rest) === 0) {
      isIndep[mask] = 1;
    }
  }

  const indepCount = new Int32Array(1 << n);
  for (let mask = 0; mask <= full; mask++) {
    if (isIndep[mask]) indepCount[mask] = 1;
  }
  for (let i = 0; i < n; i++) {
    for (let mask = 0; mask <= full; mask++) {
      if (mask & (1 << i)) {
        indepCount[mask] += indepCount[mask ^ (1 << i)];
      }
    }
  }

  function canColor(k: number): boolean {
    const dp = new Int32Array(1 << n);
    dp[0] = 1;
    for (let mask = 1; mask <= full; mask++) {
      dp[mask] = 0;
      for (let sub = mask; sub > 0; sub = (sub - 1) & mask) {
        if (isIndep[sub] && dp[mask ^ sub]) {
          dp[mask] = 1;
          break;
        }
      }
    }
    if (k === 1) return isIndep[full] === 1;

    const cover = new Int32Array(1 << n);
    cover[0] = 1;
    for (let mask = 1; mask <= full; mask++) {
      cover[mask] = 0;
      for (let sub = mask; sub > 0; sub = (sub - 1) & mask) {
        if (isIndep[sub]) {
          cover[mask] = 1;
          break;
        }
      }
    }

    const f = new Float64Array(1 << n);
    for (let mask = 0; mask <= full; mask++) {
      f[mask] = indepCount[mask];
    }

    let result = 0;
    for (let mask = 0; mask <= full; mask++) {
      const bits = popcount(full ^ mask);
      const sign = (bits & 1) ? -1 : 1;
      const val = Math.pow(indepCount[mask], k);
      result += sign * val;
    }
    return Math.round(result) > 0;
  }

  let chi = n;
  for (let k = 1; k <= n; k++) {
    if (canColor(k)) {
      chi = k;
      break;
    }
  }

  const coloring = greedyColor(n, adj, chi);

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use chromatic number for graph coloring and scheduling problems"],
  };

  return stampMeta(
    {
      vertex_count: n,
      edge_count: edges.length,
      chromatic_number: chi,
      coloring,
    },
    meta,
  );
}

function popcount(x: number): number {
  x = x - ((x >> 1) & 0x55555555);
  x = (x & 0x33333333) + ((x >> 2) & 0x33333333);
  return (((x + (x >> 4)) & 0x0f0f0f0f) * 0x01010101) >> 24;
}

function greedyColor(n: number, adj: Uint32Array, chi: number): number[] {
  const color = new Array(n).fill(-1);
  for (let v = 0; v < n; v++) {
    const used = new Set<number>();
    for (let u = 0; u < n; u++) {
      if ((adj[v] & (1 << u)) && color[u] !== -1) {
        used.add(color[u]);
      }
    }
    for (let c = 0; c < chi; c++) {
      if (!used.has(c)) {
        color[v] = c;
        break;
      }
    }
  }
  return color;
}
