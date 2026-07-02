import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function graphColoring(args: Record<string, unknown>) {
  const vertices = Number(args.vertices);
  const edges = args.edges as [number, number][];

  if (!Number.isInteger(vertices) || vertices < 1) {
    throw new Error("vertices must be a positive integer");
  }
  if (vertices > 10_000) {
    throw new Error("vertices must be at most 10,000");
  }
  if (!Array.isArray(edges)) {
    throw new Error("edges must be an array of [u, v] pairs");
  }

  const adj: number[][] = Array.from({ length: vertices }, () => []);
  for (const [u, v] of edges) {
    if (u < 0 || u >= vertices || v < 0 || v >= vertices) {
      throw new Error(`edge [${u},${v}] references vertex out of range`);
    }
    adj[u].push(v);
    adj[v].push(u);
  }

  const color = new Int32Array(vertices).fill(-1);
  let chromaticUpper = 0;

  for (let u = 0; u < vertices; u++) {
    const usedColors = new Set<number>();
    for (const v of adj[u]) {
      if (color[v] !== -1) usedColors.add(color[v]);
    }
    let c = 0;
    while (usedColors.has(c)) c++;
    color[u] = c;
    if (c + 1 > chromaticUpper) chromaticUpper = c + 1;
  }

  const colorGroups: Record<number, number[]> = {};
  for (let i = 0; i < vertices; i++) {
    const c = color[i];
    if (!colorGroups[c]) colorGroups[c] = [];
    colorGroups[c].push(i);
  }

  const maxDegree = adj.reduce((mx, a) => Math.max(mx, a.length), 0);

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Greedy coloring gives an upper bound; optimal coloring is NP-hard"],
  };

  return stampMeta(
    {
      vertex_count: vertices,
      edge_count: edges.length,
      colors_used: chromaticUpper,
      max_degree: maxDegree,
      coloring: Array.from(color),
      color_groups: colorGroups,
    },
    meta,
  );
}
