import { stampMeta, ConnectorMeta } from "./connector-meta.js";

interface WeightedEdge {
  from: string;
  to: string;
  weight: number;
}

export async function bellmanFord(args: Record<string, unknown>) {
  const edges = args.edges as WeightedEdge[];
  if (!Array.isArray(edges) || edges.length === 0) {
    throw new Error("edges must be a non-empty array of {from, to, weight} objects.");
  }
  if (edges.length > 10000) throw new Error("edges must have 10000 entries or fewer.");

  const start = String(args.start ?? "");
  if (!start) throw new Error("start node is required.");

  const target = args.target !== undefined ? String(args.target) : null;

  const allNodes = new Set<string>();
  for (const e of edges) {
    allNodes.add(String(e.from));
    allNodes.add(String(e.to));
  }

  if (!allNodes.has(start)) throw new Error(`start node '${start}' not found in graph.`);
  if (target && !allNodes.has(target)) throw new Error(`target node '${target}' not found in graph.`);

  const dist = new Map<string, number>();
  const prev = new Map<string, string | null>();
  for (const n of allNodes) {
    dist.set(n, Infinity);
    prev.set(n, null);
  }
  dist.set(start, 0);

  const n = allNodes.size;

  for (let i = 0; i < n - 1; i++) {
    let updated = false;
    for (const e of edges) {
      const from = String(e.from);
      const to = String(e.to);
      const w = Number(e.weight);
      const d = dist.get(from)!;
      if (d < Infinity && d + w < dist.get(to)!) {
        dist.set(to, d + w);
        prev.set(to, from);
        updated = true;
      }
    }
    if (!updated) break;
  }

  let hasNegativeCycle = false;
  for (const e of edges) {
    const from = String(e.from);
    const to = String(e.to);
    const w = Number(e.weight);
    if (dist.get(from)! < Infinity && dist.get(from)! + w < dist.get(to)!) {
      hasNegativeCycle = true;
      break;
    }
  }

  let path: string[] | null = null;
  let pathWeight: number | null = null;
  if (target && !hasNegativeCycle && dist.get(target)! < Infinity) {
    path = [];
    let cur: string | null = target;
    while (cur !== null) {
      path.unshift(cur);
      cur = prev.get(cur) ?? null;
    }
    pathWeight = dist.get(target)!;
  }

  const distances: Record<string, number | null> = {};
  for (const [node, d] of dist) {
    distances[node] = d === Infinity ? null : Math.round(d * 1e8) / 1e8;
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Bellman-Ford handles negative edge weights (unlike Dijkstra)",
      "If has_negative_cycle is true, shortest distances are unreliable",
    ],
  };
  return stampMeta({
    start,
    target: target ?? "none",
    node_count: n,
    edge_count: edges.length,
    has_negative_cycle: hasNegativeCycle,
    distances,
    path,
    path_weight: pathWeight !== null ? Math.round(pathWeight * 1e8) / 1e8 : null,
  }, meta);
}
