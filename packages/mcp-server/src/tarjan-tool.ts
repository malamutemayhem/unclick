import { stampMeta, ConnectorMeta } from "./connector-meta.js";

interface Edge {
  from: string;
  to: string;
}

export async function tarjanScc(args: Record<string, unknown>) {
  const edges = args.edges as Edge[];
  if (!Array.isArray(edges) || edges.length === 0) {
    throw new Error("edges must be a non-empty array of {from, to} directed edges.");
  }
  if (edges.length > 10000) throw new Error("edges must have 10000 entries or fewer.");

  const adj = new Map<string, string[]>();
  const allNodes = new Set<string>();

  for (const e of edges) {
    const from = String(e.from);
    const to = String(e.to);
    allNodes.add(from);
    allNodes.add(to);
    if (!adj.has(from)) adj.set(from, []);
    adj.get(from)!.push(to);
  }

  let index = 0;
  const indices = new Map<string, number>();
  const lowlinks = new Map<string, number>();
  const onStack = new Set<string>();
  const stack: string[] = [];
  const sccs: string[][] = [];

  const strongconnect = (v: string) => {
    indices.set(v, index);
    lowlinks.set(v, index);
    index++;
    stack.push(v);
    onStack.add(v);

    for (const w of adj.get(v) ?? []) {
      if (!indices.has(w)) {
        strongconnect(w);
        lowlinks.set(v, Math.min(lowlinks.get(v)!, lowlinks.get(w)!));
      } else if (onStack.has(w)) {
        lowlinks.set(v, Math.min(lowlinks.get(v)!, indices.get(w)!));
      }
    }

    if (lowlinks.get(v) === indices.get(v)) {
      const scc: string[] = [];
      let w: string;
      do {
        w = stack.pop()!;
        onStack.delete(w);
        scc.push(w);
      } while (w !== v);
      sccs.push(scc);
    }
  };

  for (const node of allNodes) {
    if (!indices.has(node)) strongconnect(node);
  }

  const nonTrivial = sccs.filter(s => s.length > 1);
  const isDAG = nonTrivial.length === 0;

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Each SCC is a maximal set of mutually reachable nodes",
      "If no non-trivial SCCs exist, the graph is a DAG",
    ],
  };
  return stampMeta({
    node_count: allNodes.size,
    edge_count: edges.length,
    scc_count: sccs.length,
    non_trivial_sccs: nonTrivial.length,
    is_dag: isDAG,
    largest_scc_size: sccs.reduce((m, s) => Math.max(m, s.length), 0),
    sccs: sccs.map(s => s.sort()),
  }, meta);
}
