import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function heavyLightDecomp(args: Record<string, unknown>) {
  const vertexCount = args.vertex_count as number;
  const edges = args.edges as [number, number][];
  const root = (args.root as number) ?? 0;

  if (typeof vertexCount !== "number" || !Number.isInteger(vertexCount) || vertexCount < 1) {
    throw new Error("vertex_count must be a positive integer");
  }
  if (vertexCount > 50_000) {
    throw new Error("vertex_count must be at most 50,000");
  }
  if (!Array.isArray(edges) || edges.length !== vertexCount - 1) {
    throw new Error("a tree with N vertices must have exactly N-1 edges");
  }
  if (root < 0 || root >= vertexCount) {
    throw new Error("root must be in range [0, vertex_count)");
  }

  const adj: number[][] = Array.from({ length: vertexCount }, () => []);
  for (const e of edges) {
    if (!Array.isArray(e) || e.length !== 2) throw new Error("each edge must be [u, v]");
    const [u, v] = e;
    if (typeof u !== "number" || typeof v !== "number") throw new Error("vertices must be numbers");
    if (u < 0 || u >= vertexCount || v < 0 || v >= vertexCount) {
      throw new Error("vertices must be in range [0, vertex_count)");
    }
    adj[u].push(v);
    adj[v].push(u);
  }

  const parent = new Int32Array(vertexCount).fill(-1);
  const depth = new Int32Array(vertexCount);
  const subtreeSize = new Int32Array(vertexCount).fill(1);
  const heavyChild = new Int32Array(vertexCount).fill(-1);
  const chainHead = new Int32Array(vertexCount);
  const position = new Int32Array(vertexCount);

  const stack: Array<{ v: number; p: number; phase: number; i: number }> = [
    { v: root, p: -1, phase: 0, i: 0 },
  ];
  parent[root] = -1;
  depth[root] = 0;

  while (stack.length > 0) {
    const frame = stack[stack.length - 1];
    if (frame.phase === 0) {
      if (frame.i < adj[frame.v].length) {
        const u = adj[frame.v][frame.i++];
        if (u !== frame.p) {
          parent[u] = frame.v;
          depth[u] = depth[frame.v] + 1;
          stack.push({ v: u, p: frame.v, phase: 0, i: 0 });
        }
      } else {
        frame.phase = 1;
        frame.i = 0;
      }
    } else {
      if (frame.i < adj[frame.v].length) {
        const u = adj[frame.v][frame.i++];
        if (u !== frame.p) {
          subtreeSize[frame.v] += subtreeSize[u];
          if (heavyChild[frame.v] === -1 || subtreeSize[u] > subtreeSize[heavyChild[frame.v]]) {
            heavyChild[frame.v] = u;
          }
        }
      } else {
        stack.pop();
      }
    }
  }

  let pos = 0;
  const dfsStack: Array<{ v: number; head: number }> = [{ v: root, head: root }];
  while (dfsStack.length > 0) {
    const { v, head } = dfsStack.pop()!;
    chainHead[v] = head;
    position[v] = pos++;
    const light: number[] = [];
    for (const u of adj[v]) {
      if (u === parent[v]) continue;
      if (u !== heavyChild[v]) light.push(u);
    }
    for (let i = light.length - 1; i >= 0; i--) {
      dfsStack.push({ v: light[i], head: light[i] });
    }
    if (heavyChild[v] !== -1) {
      dfsStack.push({ v: heavyChild[v], head });
    }
  }

  let chainCount = 0;
  for (let i = 0; i < vertexCount; i++) {
    if (chainHead[i] === i) chainCount++;
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use HLD for efficient path queries on trees with segment trees"],
  };

  return stampMeta(
    {
      vertex_count: vertexCount,
      root,
      chain_count: chainCount,
      chain_head: Array.from(chainHead),
      position: Array.from(position),
      depth: Array.from(depth),
    },
    meta,
  );
}
