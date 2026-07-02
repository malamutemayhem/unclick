import { stampMeta, ConnectorMeta } from "./connector-meta.js";

interface LCTNode {
  ch: [number, number];
  fa: number;
  rev: boolean;
  size: number;
  val: number;
  sum: number;
}

export async function linkCutTree(args: Record<string, unknown>) {
  const vertexCount = args.vertex_count as number;
  const operations = args.operations as Array<{
    type: string;
    u?: number;
    v?: number;
    value?: number;
  }>;

  if (typeof vertexCount !== "number" || vertexCount < 1 || vertexCount > 50_000) {
    throw new Error("vertex_count must be between 1 and 50,000");
  }
  if (!Array.isArray(operations) || operations.length > 100_000) {
    throw new Error("operations must be an array with at most 100,000 entries");
  }

  const n = vertexCount;
  const nodes: LCTNode[] = [];
  for (let i = 0; i <= n; i++) {
    nodes.push({ ch: [0, 0], fa: 0, rev: false, size: 1, val: 0, sum: 0 });
  }
  nodes[0].size = 0;

  function isRoot(x: number): boolean {
    const f = nodes[x].fa;
    return f === 0 || (nodes[f].ch[0] !== x && nodes[f].ch[1] !== x);
  }

  function pushUp(x: number): void {
    const l = nodes[x].ch[0];
    const r = nodes[x].ch[1];
    nodes[x].size = nodes[l].size + nodes[r].size + 1;
    nodes[x].sum = nodes[l].sum + nodes[r].sum + nodes[x].val;
  }

  function pushDown(x: number): void {
    if (nodes[x].rev) {
      const l = nodes[x].ch[0];
      const r = nodes[x].ch[1];
      if (l) nodes[l].rev = !nodes[l].rev;
      if (r) nodes[r].rev = !nodes[r].rev;
      const tmp = nodes[x].ch[0];
      nodes[x].ch[0] = nodes[x].ch[1];
      nodes[x].ch[1] = tmp;
      nodes[x].rev = false;
    }
  }

  function rotate(x: number): void {
    const y = nodes[x].fa;
    const z = nodes[y].fa;
    const k = nodes[y].ch[1] === x ? 1 : 0;
    const w = nodes[x].ch[k ^ 1];
    if (!isRoot(y)) {
      nodes[z].ch[nodes[z].ch[1] === y ? 1 : 0] = x;
    }
    nodes[x].ch[k ^ 1] = y;
    nodes[y].ch[k] = w;
    if (w) nodes[w].fa = y;
    nodes[y].fa = x;
    nodes[x].fa = z;
    pushUp(y);
    pushUp(x);
  }

  function splay(x: number): void {
    const stk: number[] = [];
    let u = x;
    stk.push(u);
    while (!isRoot(u)) {
      u = nodes[u].fa;
      stk.push(u);
    }
    for (let i = stk.length - 1; i >= 0; i--) pushDown(stk[i]);

    while (!isRoot(x)) {
      const y = nodes[x].fa;
      if (!isRoot(y)) {
        const z = nodes[y].fa;
        if ((nodes[z].ch[0] === y) !== (nodes[y].ch[0] === x)) {
          rotate(x);
        } else {
          rotate(y);
        }
      }
      rotate(x);
    }
    pushUp(x);
  }

  function access(x: number): void {
    let last = 0;
    for (let u = x; u !== 0; u = nodes[u].fa) {
      splay(u);
      nodes[u].ch[1] = last;
      pushUp(u);
      last = u;
    }
    splay(x);
  }

  function makeRoot(x: number): void {
    access(x);
    nodes[x].rev = !nodes[x].rev;
    pushDown(x);
  }

  function findRoot(x: number): number {
    access(x);
    let u = x;
    pushDown(u);
    while (nodes[u].ch[0]) {
      u = nodes[u].ch[0];
      pushDown(u);
    }
    splay(u);
    return u;
  }

  function link(u: number, v: number): boolean {
    makeRoot(u);
    if (findRoot(v) === u) return false;
    nodes[u].fa = v;
    return true;
  }

  function cut(u: number, v: number): boolean {
    makeRoot(u);
    access(v);
    if (nodes[v].ch[0] !== u || nodes[u].ch[1] !== 0) return false;
    nodes[v].ch[0] = 0;
    nodes[u].fa = 0;
    pushUp(v);
    return true;
  }

  function connected(u: number, v: number): boolean {
    return findRoot(u) === findRoot(v);
  }

  function pathQuery(u: number, v: number): number {
    makeRoot(u);
    access(v);
    return nodes[v].sum;
  }

  const results: Array<Record<string, unknown>> = [];

  for (const op of operations) {
    switch (op.type) {
      case "link": {
        const ok = link(op.u!, op.v!);
        results.push({ type: "link", u: op.u, v: op.v, success: ok });
        break;
      }
      case "cut": {
        const ok = cut(op.u!, op.v!);
        results.push({ type: "cut", u: op.u, v: op.v, success: ok });
        break;
      }
      case "connected": {
        const conn = connected(op.u!, op.v!);
        results.push({ type: "connected", u: op.u, v: op.v, result: conn });
        break;
      }
      case "set_value": {
        const u = op.u!;
        const val = op.value!;
        access(u);
        nodes[u].val = val;
        pushUp(u);
        results.push({ type: "set_value", u, value: val });
        break;
      }
      case "path_sum": {
        const s = pathQuery(op.u!, op.v!);
        results.push({ type: "path_sum", u: op.u, v: op.v, result: s });
        break;
      }
    }
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use link-cut tree for dynamic connectivity and path queries on forests"],
  };

  return stampMeta(
    {
      vertex_count: n,
      operation_count: results.length,
      results,
    },
    meta,
  );
}
