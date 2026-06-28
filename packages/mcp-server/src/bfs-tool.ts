import { stampMeta, ConnectorMeta } from "./connector-meta.js";

interface Edge {
  from: string;
  to: string;
}

export async function bfsSearch(args: Record<string, unknown>) {
  const edges = args.edges as Edge[];
  if (!Array.isArray(edges) || edges.length === 0) {
    throw new Error("edges must be a non-empty array of {from, to} objects.");
  }
  if (edges.length > 10000) throw new Error("edges must have 10000 entries or fewer.");

  const start = String(args.start ?? "");
  if (!start) throw new Error("start node is required.");

  const target = args.target !== undefined ? String(args.target) : null;
  const directed = args.directed !== false;

  const adj = new Map<string, string[]>();
  const allNodes = new Set<string>();

  for (const e of edges) {
    const from = String(e.from);
    const to = String(e.to);
    allNodes.add(from);
    allNodes.add(to);
    if (!adj.has(from)) adj.set(from, []);
    adj.get(from)!.push(to);
    if (!directed) {
      if (!adj.has(to)) adj.set(to, []);
      adj.get(to)!.push(from);
    }
  }

  if (!allNodes.has(start)) throw new Error(`start node '${start}' not found in graph.`);
  if (target && !allNodes.has(target)) throw new Error(`target node '${target}' not found in graph.`);

  const visited = new Set<string>();
  const parent = new Map<string, string | null>();
  const distance = new Map<string, number>();
  const order: string[] = [];

  const queue: string[] = [start];
  visited.add(start);
  parent.set(start, null);
  distance.set(start, 0);

  let found = false;

  while (queue.length > 0) {
    const curr = queue.shift()!;
    order.push(curr);

    if (target && curr === target) {
      found = true;
      break;
    }

    for (const neighbor of adj.get(curr) ?? []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        parent.set(neighbor, curr);
        distance.set(neighbor, (distance.get(curr) ?? 0) + 1);
        queue.push(neighbor);
      }
    }
  }

  let path: string[] | null = null;
  if (target && found) {
    path = [];
    let node: string | null = target;
    while (node !== null) {
      path.unshift(node);
      node = parent.get(node) ?? null;
    }
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "BFS finds shortest path in unweighted graphs",
      "Use dijkstra_path for weighted shortest paths",
    ],
  };
  return stampMeta({
    start,
    target: target ?? "none",
    directed,
    nodes_visited: order.length,
    visit_order: order,
    path,
    path_length: path ? path.length - 1 : null,
    reachable_count: visited.size,
  }, meta);
}
