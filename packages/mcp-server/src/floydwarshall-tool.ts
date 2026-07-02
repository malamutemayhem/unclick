import { stampMeta, ConnectorMeta } from "./connector-meta.js";

interface WeightedEdge {
  from: string;
  to: string;
  weight: number;
}

export async function floydWarshall(args: Record<string, unknown>) {
  const edges = args.edges as WeightedEdge[];
  if (!Array.isArray(edges) || edges.length === 0) {
    throw new Error("edges must be a non-empty array of {from, to, weight} objects.");
  }
  if (edges.length > 10000) throw new Error("edges must have 10000 entries or fewer.");

  const directed = args.directed !== false;

  const allNodes = new Set<string>();
  for (const e of edges) {
    allNodes.add(String(e.from));
    allNodes.add(String(e.to));
  }

  const nodes = Array.from(allNodes).sort();
  const n = nodes.length;
  if (n > 500) throw new Error("graph must have 500 or fewer nodes for Floyd-Warshall.");

  const idx = new Map<string, number>();
  nodes.forEach((node, i) => idx.set(node, i));

  const dist: number[][] = Array.from({ length: n }, () => new Array(n).fill(Infinity));
  const next: (number | null)[][] = Array.from({ length: n }, () => new Array(n).fill(null));

  for (let i = 0; i < n; i++) {
    dist[i][i] = 0;
    next[i][i] = i;
  }

  for (const e of edges) {
    const u = idx.get(String(e.from))!;
    const v = idx.get(String(e.to))!;
    const w = Number(e.weight);
    if (w < dist[u][v]) {
      dist[u][v] = w;
      next[u][v] = v;
    }
    if (!directed && w < dist[v][u]) {
      dist[v][u] = w;
      next[v][u] = u;
    }
  }

  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
          next[i][j] = next[i][k];
        }
      }
    }
  }

  let hasNegativeCycle = false;
  for (let i = 0; i < n; i++) {
    if (dist[i][i] < 0) { hasNegativeCycle = true; break; }
  }

  const distanceMatrix: Record<string, Record<string, number | null>> = {};
  for (let i = 0; i < n; i++) {
    const row: Record<string, number | null> = {};
    for (let j = 0; j < n; j++) {
      row[nodes[j]] = dist[i][j] === Infinity ? null : Math.round(dist[i][j] * 1e8) / 1e8;
    }
    distanceMatrix[nodes[i]] = row;
  }

  const reconstructPath = (from: string, to: string): string[] | null => {
    const u = idx.get(from)!;
    const v = idx.get(to)!;
    if (next[u][v] === null) return null;
    const path = [from];
    let cur = u;
    while (cur !== v) {
      cur = next[cur][v]!;
      if (cur === null) return null;
      path.push(nodes[cur]);
      if (path.length > n) return null;
    }
    return path;
  };

  let samplePath: { from: string; to: string; path: string[]; weight: number } | null = null;
  if (n >= 2) {
    let bestFrom = 0;
    let bestTo = 1;
    let bestDist = Infinity;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (i !== j && dist[i][j] < bestDist && dist[i][j] > 0) {
          bestDist = dist[i][j];
          bestFrom = i;
          bestTo = j;
        }
      }
    }
    if (bestDist < Infinity) {
      const p = reconstructPath(nodes[bestFrom], nodes[bestTo]);
      if (p) {
        samplePath = {
          from: nodes[bestFrom],
          to: nodes[bestTo],
          path: p,
          weight: Math.round(bestDist * 1e8) / 1e8,
        };
      }
    }
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Floyd-Warshall computes ALL pairs shortest paths in O(V^3)",
      "Use Dijkstra or Bellman-Ford for single-source queries on large graphs",
    ],
  };
  return stampMeta({
    node_count: n,
    edge_count: edges.length,
    directed,
    has_negative_cycle: hasNegativeCycle,
    distance_matrix: distanceMatrix,
    shortest_path_sample: samplePath,
  }, meta);
}
