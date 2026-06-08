import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function topoSort(args: Record<string, unknown>) {
  const edges = args.edges as [string, string][] | undefined;
  if (!Array.isArray(edges) || edges.length === 0) {
    throw new Error("edges must be a non-empty array of [from, to] pairs.");
  }
  if (edges.length > 10000) {
    throw new Error("Maximum 10000 edges supported.");
  }

  const adj = new Map<string, string[]>();
  const inDeg = new Map<string, number>();
  const nodes = new Set<string>();

  for (const edge of edges) {
    if (!Array.isArray(edge) || edge.length !== 2) {
      throw new Error("Each edge must be a [from, to] pair.");
    }
    const [from, to] = [String(edge[0]), String(edge[1])];
    nodes.add(from);
    nodes.add(to);
    if (!adj.has(from)) adj.set(from, []);
    adj.get(from)!.push(to);
    inDeg.set(to, (inDeg.get(to) ?? 0) + 1);
    if (!inDeg.has(from)) inDeg.set(from, 0);
  }

  const queue: string[] = [];
  for (const node of nodes) {
    if ((inDeg.get(node) ?? 0) === 0) queue.push(node);
  }
  queue.sort();

  const sorted: string[] = [];
  while (queue.length > 0) {
    const node = queue.shift()!;
    sorted.push(node);
    for (const neighbor of adj.get(node) ?? []) {
      const deg = inDeg.get(neighbor)! - 1;
      inDeg.set(neighbor, deg);
      if (deg === 0) {
        const idx = queue.findIndex((n) => n > neighbor);
        if (idx === -1) queue.push(neighbor);
        else queue.splice(idx, 0, neighbor);
      }
    }
  }

  const hasCycle = sorted.length < nodes.size;
  const cycleNodes = hasCycle
    ? [...nodes].filter((n) => !sorted.includes(n)).sort()
    : [];

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: hasCycle
      ? ["Remove edges causing cycles to get a valid ordering"]
      : ["Use sorted order for scheduling or dependency resolution"],
  };
  return stampMeta(
    {
      sorted,
      node_count: nodes.size,
      edge_count: edges.length,
      has_cycle: hasCycle,
      cycle_nodes: cycleNodes,
    },
    meta,
  );
}
