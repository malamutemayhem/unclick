import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function bipartiteCheck(args: Record<string, unknown>) {
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

  const color = new Int8Array(vertices).fill(-1);
  let isBipartite = true;
  let oddCycle: number[] | null = null;
  const parent = new Int32Array(vertices).fill(-1);
  let components = 0;

  for (let s = 0; s < vertices && isBipartite; s++) {
    if (color[s] !== -1) continue;
    components++;
    color[s] = 0;
    const queue = [s];
    let head = 0;

    while (head < queue.length && isBipartite) {
      const u = queue[head++];
      for (const v of adj[u]) {
        if (color[v] === -1) {
          color[v] = color[u] === 0 ? 1 : 0;
          parent[v] = u;
          queue.push(v);
        } else if (color[v] === color[u]) {
          isBipartite = false;
          const cycle: number[] = [];
          let a = u;
          let b = v;
          const pathA: number[] = [];
          const pathB: number[] = [];
          while (a !== b) {
            pathA.push(a);
            pathB.push(b);
            a = parent[a];
            b = parent[b];
            if (a === -1 || b === -1) break;
          }
          if (a === b && a !== -1) {
            cycle.push(...pathA, a, ...pathB.reverse());
          }
          if (cycle.length > 0) oddCycle = cycle;
          break;
        }
      }
    }
  }

  const setA: number[] = [];
  const setB: number[] = [];
  if (isBipartite) {
    for (let i = 0; i < vertices; i++) {
      if (color[i] === 0) setA.push(i);
      else if (color[i] === 1) setB.push(i);
      else setA.push(i);
    }
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use bipartite checking for graph coloring and matching problems"],
  };

  return stampMeta(
    {
      is_bipartite: isBipartite,
      vertex_count: vertices,
      edge_count: edges.length,
      connected_components: components,
      ...(isBipartite
        ? { set_a: setA, set_b: setB, set_a_size: setA.length, set_b_size: setB.length }
        : { odd_cycle: oddCycle }),
    },
    meta,
  );
}
