import { stampMeta, ConnectorMeta } from "./connector-meta.js";

interface Edge {
  from: string;
  to: string;
  weight: number;
}

export async function mstFind(args: Record<string, unknown>) {
  const edges = args.edges as Edge[];
  if (!Array.isArray(edges) || edges.length === 0) {
    throw new Error("edges must be a non-empty array of {from, to, weight} objects.");
  }
  if (edges.length > 10000) throw new Error("edges must have 10000 entries or fewer.");

  const allNodes = new Set<string>();
  for (const e of edges) {
    allNodes.add(String(e.from));
    allNodes.add(String(e.to));
  }

  const parent = new Map<string, string>();
  const rank = new Map<string, number>();
  for (const node of allNodes) {
    parent.set(node, node);
    rank.set(node, 0);
  }

  const find = (x: string): string => {
    if (parent.get(x) !== x) parent.set(x, find(parent.get(x)!));
    return parent.get(x)!;
  };

  const union = (a: string, b: string): boolean => {
    const ra = find(a);
    const rb = find(b);
    if (ra === rb) return false;
    const rankA = rank.get(ra)!;
    const rankB = rank.get(rb)!;
    if (rankA < rankB) parent.set(ra, rb);
    else if (rankA > rankB) parent.set(rb, ra);
    else { parent.set(rb, ra); rank.set(ra, rankA + 1); }
    return true;
  };

  const sorted = [...edges]
    .map((e) => ({ from: String(e.from), to: String(e.to), weight: Number(e.weight) }))
    .sort((a, b) => a.weight - b.weight);

  const mstEdges: { from: string; to: string; weight: number }[] = [];
  let totalWeight = 0;

  for (const e of sorted) {
    if (union(e.from, e.to)) {
      mstEdges.push(e);
      totalWeight += e.weight;
    }
  }

  const roots = new Set<string>();
  for (const node of allNodes) roots.add(find(node));
  const isConnected = roots.size === 1;

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "MST connects all nodes with minimum total edge weight",
      "If graph is disconnected, result is a minimum spanning forest",
    ],
  };
  return stampMeta({
    node_count: allNodes.size,
    input_edges: edges.length,
    mst_edges: mstEdges.length,
    total_weight: Math.round(totalWeight * 1e8) / 1e8,
    is_connected: isConnected,
    edges: mstEdges,
  }, meta);
}
