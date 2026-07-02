import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function gabowScc(args: Record<string, unknown>) {
  const vertexCount = args.vertex_count as number;
  const edges = args.edges as [number, number][];

  if (typeof vertexCount !== "number" || !Number.isInteger(vertexCount) || vertexCount < 1) {
    throw new Error("vertex_count must be a positive integer");
  }
  if (vertexCount > 50_000) {
    throw new Error("vertex_count must be at most 50,000");
  }
  if (!Array.isArray(edges)) {
    throw new Error("edges must be an array of [u, v] pairs");
  }
  if (edges.length > 200_000) {
    throw new Error("at most 200,000 edges supported");
  }

  const adj: number[][] = Array.from({ length: vertexCount }, () => []);
  for (const e of edges) {
    if (!Array.isArray(e) || e.length !== 2) throw new Error("each edge must be [u, v]");
    const [u, v] = e;
    if (typeof u !== "number" || typeof v !== "number") throw new Error("vertices must be numbers");
    if (!Number.isInteger(u) || !Number.isInteger(v)) throw new Error("vertices must be integers");
    if (u < 0 || u >= vertexCount || v < 0 || v >= vertexCount) {
      throw new Error("vertices must be in range [0, vertex_count)");
    }
    adj[u].push(v);
  }

  const sccId = new Int32Array(vertexCount).fill(-1);
  const preorder = new Int32Array(vertexCount).fill(-1);
  const stack: number[] = [];
  const boundary: number[] = [];
  let counter = 0;
  let sccCount = 0;
  const components: number[][] = [];

  function dfs(v: number): void {
    const callStack: Array<{ v: number; i: number }> = [{ v, i: 0 }];
    preorder[v] = counter++;
    stack.push(v);
    boundary.push(v);

    while (callStack.length > 0) {
      const frame = callStack[callStack.length - 1];
      const u = frame.v;

      if (frame.i < adj[u].length) {
        const w = adj[u][frame.i++];
        if (preorder[w] === -1) {
          preorder[w] = counter++;
          stack.push(w);
          boundary.push(w);
          callStack.push({ v: w, i: 0 });
        } else if (sccId[w] === -1) {
          while (preorder[boundary[boundary.length - 1]] > preorder[w]) {
            boundary.pop();
          }
        }
      } else {
        if (boundary[boundary.length - 1] === u) {
          boundary.pop();
          const comp: number[] = [];
          let top: number;
          do {
            top = stack.pop()!;
            sccId[top] = sccCount;
            comp.push(top);
          } while (top !== u);
          components.push(comp.sort((a, b) => a - b));
          sccCount++;
        }
        callStack.pop();
      }
    }
  }

  for (let v = 0; v < vertexCount; v++) {
    if (preorder[v] === -1) dfs(v);
  }

  components.sort((a, b) => a[0] - b[0]);

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use Gabow SCC for directed graph analysis and condensation"],
  };

  return stampMeta(
    {
      vertex_count: vertexCount,
      edge_count: edges.length,
      scc_count: sccCount,
      components,
    },
    meta,
  );
}
