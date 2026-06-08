import { stampMeta, ConnectorMeta } from "./connector-meta.js";

interface Edge {
  to: string;
  weight: number;
}

export async function dijkstraPath(args: Record<string, unknown>) {
  const edges = args.edges as [string, string, number][] | undefined;
  if (!Array.isArray(edges) || edges.length === 0) {
    throw new Error("edges must be a non-empty array of [from, to, weight] triples.");
  }
  if (edges.length > 50000) {
    throw new Error("Maximum 50000 edges supported.");
  }

  const source = String(args.source ?? "");
  const target = String(args.target ?? "");
  if (!source) throw new Error("source node is required.");
  if (!target) throw new Error("target node is required.");

  const adj = new Map<string, Edge[]>();
  const nodes = new Set<string>();

  for (const edge of edges) {
    if (!Array.isArray(edge) || edge.length < 3) {
      throw new Error("Each edge must be [from, to, weight].");
    }
    const [from, to, w] = [String(edge[0]), String(edge[1]), Number(edge[2])];
    if (w < 0) throw new Error("Negative weights are not supported.");
    nodes.add(from);
    nodes.add(to);
    if (!adj.has(from)) adj.set(from, []);
    adj.get(from)!.push({ to, weight: w });
    if (!args.directed) {
      if (!adj.has(to)) adj.set(to, []);
      adj.get(to)!.push({ to: from, weight: w });
    }
  }

  if (!nodes.has(source)) throw new Error(`Source node "${source}" not in graph.`);
  if (!nodes.has(target)) throw new Error(`Target node "${target}" not in graph.`);

  const dist = new Map<string, number>();
  const prev = new Map<string, string | null>();
  const visited = new Set<string>();

  for (const node of nodes) {
    dist.set(node, Infinity);
    prev.set(node, null);
  }
  dist.set(source, 0);

  while (true) {
    let u: string | null = null;
    let minDist = Infinity;
    for (const node of nodes) {
      if (!visited.has(node) && dist.get(node)! < minDist) {
        minDist = dist.get(node)!;
        u = node;
      }
    }
    if (u === null || u === target) break;
    visited.add(u);

    for (const edge of adj.get(u) ?? []) {
      const alt = dist.get(u)! + edge.weight;
      if (alt < dist.get(edge.to)!) {
        dist.set(edge.to, alt);
        prev.set(edge.to, u);
      }
    }
  }

  const distance = dist.get(target)!;
  const reachable = distance !== Infinity;

  let path: string[] = [];
  if (reachable) {
    let node: string | null = target;
    while (node !== null) {
      path.unshift(node);
      node = prev.get(node) ?? null;
    }
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: reachable
      ? ["Use topo_sort for DAG ordering", "Use convex_hull for spatial analysis"]
      : ["Check graph connectivity or add missing edges"],
  };
  return stampMeta(
    {
      source: source,
      target,
      distance: reachable ? Math.round(distance * 1e8) / 1e8 : null,
      reachable,
      path,
      path_length: path.length,
      node_count: nodes.size,
      edge_count: edges.length,
      directed: !!args.directed,
    },
    meta,
  );
}
