import { stampMeta, ConnectorMeta } from "./connector-meta.js";

interface Edge {
  from: string;
  to: string;
  weight?: number;
}

export async function graphAnalyze(args: Record<string, unknown>) {
  const edges = args.edges as Edge[];
  if (!Array.isArray(edges) || edges.length === 0) {
    throw new Error("edges must be a non-empty array of {from, to, weight?} objects.");
  }
  if (edges.length > 10000) throw new Error("edges must have 10000 entries or fewer.");

  const directed = args.directed !== false;

  const adj = new Map<string, Map<string, number>>();
  const allNodes = new Set<string>();

  for (const e of edges) {
    const from = String(e.from);
    const to = String(e.to);
    const w = Number(e.weight ?? 1);
    allNodes.add(from);
    allNodes.add(to);

    if (!adj.has(from)) adj.set(from, new Map());
    adj.get(from)!.set(to, w);

    if (!directed) {
      if (!adj.has(to)) adj.set(to, new Map());
      adj.get(to)!.set(from, w);
    }
  }

  const nodeCount = allNodes.size;
  const edgeCount = edges.length;

  const degrees: Record<string, number> = {};
  for (const node of allNodes) {
    degrees[node] = adj.get(node)?.size ?? 0;
  }

  const visited = new Set<string>();
  const components: string[][] = [];
  const undirAdj = new Map<string, Set<string>>();
  for (const node of allNodes) {
    if (!undirAdj.has(node)) undirAdj.set(node, new Set());
  }
  for (const e of edges) {
    const from = String(e.from);
    const to = String(e.to);
    undirAdj.get(from)!.add(to);
    undirAdj.get(to)!.add(from);
  }

  for (const node of allNodes) {
    if (visited.has(node)) continue;
    const comp: string[] = [];
    const stack = [node];
    while (stack.length > 0) {
      const curr = stack.pop()!;
      if (visited.has(curr)) continue;
      visited.add(curr);
      comp.push(curr);
      for (const neighbor of undirAdj.get(curr) ?? []) {
        if (!visited.has(neighbor)) stack.push(neighbor);
      }
    }
    components.push(comp.sort());
  }

  const density = directed
    ? edgeCount / (nodeCount * (nodeCount - 1) || 1)
    : (2 * edgeCount) / (nodeCount * (nodeCount - 1) || 1);

  const hasSelfLoop = edges.some((e) => String(e.from) === String(e.to));

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Use dijkstra_path for shortest path between specific nodes",
      "Use topo_sort for DAG ordering",
    ],
  };
  return stampMeta({
    node_count: nodeCount,
    edge_count: edgeCount,
    directed,
    connected_components: components.length,
    is_connected: components.length === 1,
    density: Math.round(density * 1e6) / 1e6,
    has_self_loop: hasSelfLoop,
    degrees,
    components: components.length <= 20 ? components : components.slice(0, 20),
  }, meta);
}
