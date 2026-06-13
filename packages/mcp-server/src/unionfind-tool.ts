import { stampMeta, ConnectorMeta } from "./connector-meta.js";

interface UfEdge {
  a: string;
  b: string;
}

export async function unionFindOps(args: Record<string, unknown>) {
  const unions = args.unions as UfEdge[];
  if (!Array.isArray(unions) || unions.length === 0) {
    throw new Error("unions must be a non-empty array of {a, b} pairs to merge.");
  }
  if (unions.length > 10000) throw new Error("unions must have 10000 entries or fewer.");

  const queries = (args.queries ?? []) as UfEdge[];

  const parent = new Map<string, string>();
  const rank = new Map<string, number>();

  const find = (x: string): string => {
    if (!parent.has(x)) { parent.set(x, x); rank.set(x, 0); }
    let root = x;
    while (parent.get(root) !== root) root = parent.get(root)!;
    let cur = x;
    while (cur !== root) {
      const next = parent.get(cur)!;
      parent.set(cur, root);
      cur = next;
    }
    return root;
  };

  const unite = (a: string, b: string): boolean => {
    const ra = find(a);
    const rb = find(b);
    if (ra === rb) return false;
    const rankA = rank.get(ra)!;
    const rankB = rank.get(rb)!;
    if (rankA < rankB) { parent.set(ra, rb); }
    else if (rankA > rankB) { parent.set(rb, ra); }
    else { parent.set(rb, ra); rank.set(ra, rankA + 1); }
    return true;
  };

  let merges = 0;
  let redundant = 0;
  for (const u of unions) {
    const a = String(u.a);
    const b = String(u.b);
    if (unite(a, b)) merges++;
    else redundant++;
  }

  const components = new Map<string, string[]>();
  for (const node of parent.keys()) {
    const root = find(node);
    if (!components.has(root)) components.set(root, []);
    components.get(root)!.push(node);
  }

  const queryResults: { a: string; b: string; connected: boolean }[] = [];
  for (const q of queries) {
    const a = String(q.a);
    const b = String(q.b);
    queryResults.push({ a, b, connected: find(a) === find(b) });
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Union-Find uses path compression and union by rank for near-constant time",
      "Redundant unions indicate edges within the same component",
    ],
  };
  return stampMeta({
    total_nodes: parent.size,
    merges_performed: merges,
    redundant_unions: redundant,
    component_count: components.size,
    component_sizes: Array.from(components.values()).map(c => c.length).sort((a, b) => b - a),
    components: Object.fromEntries(components),
    query_results: queryResults.length > 0 ? queryResults : undefined,
  }, meta);
}
