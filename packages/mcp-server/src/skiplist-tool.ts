import { stampMeta, ConnectorMeta } from "./connector-meta.js";

interface SkipNode {
  value: number;
  forward: (number | null)[];
}

export async function skipListSim(args: Record<string, unknown>) {
  const values = args.values as number[];
  if (!Array.isArray(values) || values.length === 0) {
    throw new Error("values must be a non-empty array of numbers");
  }
  if (values.length > 10_000) {
    throw new Error("values must have at most 10,000 elements");
  }

  const maxLevel = Math.min(16, Math.ceil(Math.log2(values.length + 1)));
  const nodes: SkipNode[] = [{ value: -Infinity, forward: new Array(maxLevel).fill(null) }];
  let level = 0;

  function randomLevel(): number {
    let lvl = 0;
    while (lvl < maxLevel - 1 && Math.random() < 0.5) lvl++;
    return lvl;
  }

  function insert(val: number) {
    const update: number[] = new Array(maxLevel).fill(0);
    let cur = 0;
    for (let i = level; i >= 0; i--) {
      while (nodes[cur].forward[i] !== null && nodes[nodes[cur].forward[i]!].value < val) {
        cur = nodes[cur].forward[i]!;
      }
      update[i] = cur;
    }

    const newLvl = randomLevel();
    if (newLvl > level) {
      for (let i = level + 1; i <= newLvl; i++) update[i] = 0;
      level = newLvl;
    }

    const newIdx = nodes.length;
    nodes.push({ value: val, forward: new Array(newLvl + 1).fill(null) });

    for (let i = 0; i <= newLvl; i++) {
      nodes[newIdx].forward[i] = nodes[update[i]].forward[i];
      nodes[update[i]].forward[i] = newIdx;
    }
  }

  function search(val: number): boolean {
    let cur = 0;
    for (let i = level; i >= 0; i--) {
      while (nodes[cur].forward[i] !== null && nodes[nodes[cur].forward[i]!].value < val) {
        cur = nodes[cur].forward[i]!;
      }
    }
    cur = nodes[cur].forward[0] !== null ? nodes[cur].forward[0]! : -1;
    return cur !== -1 && nodes[cur].value === val;
  }

  for (const v of values) insert(v);

  const sorted: number[] = [];
  let cur = nodes[0].forward[0];
  while (cur !== null) {
    sorted.push(nodes[cur].value);
    cur = nodes[cur].forward[0];
  }

  const queries = (args.search as number[]) ?? [];
  const searchResults = queries.map((q) => ({ value: q, found: search(q) }));

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use skip list for probabilistic sorted data structure operations"],
  };

  return stampMeta(
    {
      element_count: values.length,
      levels: level + 1,
      sorted: sorted.length <= 200 ? sorted : sorted.slice(0, 200),
      truncated: sorted.length > 200,
      search_results: searchResults,
    },
    meta,
  );
}
