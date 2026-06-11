import { stampMeta, ConnectorMeta } from "./connector-meta.js";

interface AcNode {
  children: Map<string, number>;
  fail: number;
  output: number[];
}

export async function ahoCorasickSearch(args: Record<string, unknown>) {
  const text = String(args.text ?? "");
  const patterns = args.patterns as string[];
  if (!Array.isArray(patterns) || patterns.length === 0) {
    throw new Error("patterns must be a non-empty array of strings");
  }
  if (patterns.some((p) => typeof p !== "string" || p.length === 0)) {
    throw new Error("each pattern must be a non-empty string");
  }

  const nodes: AcNode[] = [{ children: new Map(), fail: 0, output: [] }];

  for (let pi = 0; pi < patterns.length; pi++) {
    let cur = 0;
    for (const ch of patterns[pi]) {
      if (!nodes[cur].children.has(ch)) {
        nodes[cur].children.set(ch, nodes.length);
        nodes.push({ children: new Map(), fail: 0, output: [] });
      }
      cur = nodes[cur].children.get(ch)!;
    }
    nodes[cur].output.push(pi);
  }

  const queue: number[] = [];
  for (const [, child] of nodes[0].children) {
    nodes[child].fail = 0;
    queue.push(child);
  }

  let head = 0;
  while (head < queue.length) {
    const u = queue[head++];
    for (const [ch, v] of nodes[u].children) {
      let f = nodes[u].fail;
      while (f !== 0 && !nodes[f].children.has(ch)) f = nodes[f].fail;
      nodes[v].fail = nodes[f].children.has(ch) ? nodes[f].children.get(ch)! : 0;
      if (nodes[v].fail === v) nodes[v].fail = 0;
      nodes[v].output = nodes[v].output.concat(nodes[nodes[v].fail].output);
      queue.push(v);
    }
  }

  const results: { pattern_index: number; pattern: string; position: number }[] = [];
  let cur = 0;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    while (cur !== 0 && !nodes[cur].children.has(ch)) cur = nodes[cur].fail;
    cur = nodes[cur].children.has(ch) ? nodes[cur].children.get(ch)! : 0;
    for (const pi of nodes[cur].output) {
      results.push({
        pattern_index: pi,
        pattern: patterns[pi],
        position: i - patterns[pi].length + 1,
      });
    }
  }

  results.sort((a, b) => a.position - b.position || a.pattern_index - b.pattern_index);

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use Aho-Corasick for efficient multi-pattern string matching"],
  };

  return stampMeta(
    {
      text_length: text.length,
      pattern_count: patterns.length,
      total_matches: results.length,
      matches: results.slice(0, 500),
      truncated: results.length > 500,
    },
    meta,
  );
}
