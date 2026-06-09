import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function twoSat(args: Record<string, unknown>) {
  const numVars = args.num_vars as number;
  const clauses = args.clauses as [number, number][];

  if (typeof numVars !== "number" || !Number.isInteger(numVars) || numVars < 1) {
    throw new Error("num_vars must be a positive integer");
  }
  if (numVars > 50_000) {
    throw new Error("num_vars must be at most 50,000");
  }
  if (!Array.isArray(clauses)) {
    throw new Error("clauses must be an array of [lit1, lit2] pairs");
  }
  if (clauses.length > 200_000) {
    throw new Error("at most 200,000 clauses supported");
  }

  const n = 2 * numVars;
  const adj: number[][] = Array.from({ length: n }, () => []);
  const radj: number[][] = Array.from({ length: n }, () => []);

  function litIndex(lit: number): number {
    if (lit > 0) return 2 * (lit - 1);
    return 2 * (-lit - 1) + 1;
  }

  function neg(idx: number): number {
    return idx ^ 1;
  }

  for (const c of clauses) {
    if (!Array.isArray(c) || c.length !== 2) throw new Error("each clause must be [lit1, lit2]");
    const [a, b] = c;
    if (typeof a !== "number" || typeof b !== "number") throw new Error("literals must be numbers");
    if (a === 0 || b === 0) throw new Error("literals must be non-zero");
    if (Math.abs(a) > numVars || Math.abs(b) > numVars) {
      throw new Error("literal variables must be in range [1, num_vars]");
    }
    const ia = litIndex(a);
    const ib = litIndex(b);
    adj[neg(ia)].push(ib);
    adj[neg(ib)].push(ia);
    radj[ib].push(neg(ia));
    radj[ia].push(neg(ib));
  }

  const order: number[] = [];
  const visited = new Uint8Array(n);

  function dfs1(v: number): void {
    const stack: Array<{ v: number; i: number }> = [{ v, i: 0 }];
    visited[v] = 1;
    while (stack.length > 0) {
      const frame = stack[stack.length - 1];
      if (frame.i < adj[frame.v].length) {
        const u = adj[frame.v][frame.i++];
        if (!visited[u]) {
          visited[u] = 1;
          stack.push({ v: u, i: 0 });
        }
      } else {
        order.push(frame.v);
        stack.pop();
      }
    }
  }

  for (let i = 0; i < n; i++) {
    if (!visited[i]) dfs1(i);
  }

  const comp = new Int32Array(n).fill(-1);
  let sccCount = 0;

  function dfs2(v: number, c: number): void {
    const stack: number[] = [v];
    comp[v] = c;
    while (stack.length > 0) {
      const u = stack.pop()!;
      for (const w of radj[u]) {
        if (comp[w] === -1) {
          comp[w] = c;
          stack.push(w);
        }
      }
    }
  }

  for (let i = n - 1; i >= 0; i--) {
    const v = order[i];
    if (comp[v] === -1) {
      dfs2(v, sccCount++);
    }
  }

  let satisfiable = true;
  const assignment: boolean[] = new Array(numVars);
  for (let i = 0; i < numVars; i++) {
    if (comp[2 * i] === comp[2 * i + 1]) {
      satisfiable = false;
      break;
    }
    assignment[i] = comp[2 * i] > comp[2 * i + 1];
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use 2-SAT for boolean satisfiability with at most 2 literals per clause"],
  };

  return stampMeta(
    {
      num_vars: numVars,
      num_clauses: clauses.length,
      satisfiable,
      assignment: satisfiable ? assignment : null,
      scc_count: sccCount,
    },
    meta,
  );
}
