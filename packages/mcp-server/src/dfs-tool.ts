import { stampMeta, ConnectorMeta } from "./connector-meta.js";

interface Edge {
  from: string;
  to: string;
}

export async function dfsSearch(args: Record<string, unknown>) {
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
  const order: string[] = [];
  let foundPath: string[] | null = null;

  const dfs = (node: string, path: string[]): boolean => {
    visited.add(node);
    order.push(node);
    const currentPath = [...path, node];

    if (target && node === target) {
      foundPath = currentPath;
      return true;
    }

    for (const neighbor of adj.get(node) ?? []) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor, currentPath)) return true;
      }
    }
    return false;
  };

  dfs(start, []);

  const hasCycle = (() => {
    const white = new Set(allNodes);
    const gray = new Set<string>();

    const detect = (node: string): boolean => {
      white.delete(node);
      gray.add(node);
      for (const neighbor of adj.get(node) ?? []) {
        if (gray.has(neighbor)) return true;
        if (white.has(neighbor) && detect(neighbor)) return true;
      }
      gray.delete(node);
      return false;
    };

    for (const node of allNodes) {
      if (white.has(node) && detect(node)) return true;
    }
    return false;
  })();

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "DFS finds a path but not necessarily the shortest",
      "Use bfs_search for shortest unweighted path",
    ],
  };
  const resultPath = foundPath as unknown as string[] | null;
  return stampMeta({
    start,
    target: target ?? "none",
    directed,
    nodes_visited: order.length,
    visit_order: order,
    path: resultPath,
    path_length: resultPath ? resultPath.length - 1 : null,
    reachable_count: visited.size,
    has_cycle: hasCycle,
  }, meta);
}
