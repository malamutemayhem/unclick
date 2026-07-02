import { stampMeta, ConnectorMeta } from "./connector-meta.js";

interface Edge {
  from: string;
  to: string;
}

export async function pageRank(args: Record<string, unknown>) {
  const edges = args.edges as Edge[];
  if (!Array.isArray(edges) || edges.length === 0) {
    throw new Error("edges must be a non-empty array of {from, to} objects.");
  }
  if (edges.length > 10000) throw new Error("edges must have 10000 entries or fewer.");

  const damping = typeof args.damping === "number" ? args.damping : 0.85;
  const iterations = typeof args.iterations === "number" ? args.iterations : 100;
  const tolerance = typeof args.tolerance === "number" ? args.tolerance : 1e-6;

  if (damping < 0 || damping > 1) throw new Error("damping must be between 0 and 1.");
  if (iterations < 1 || iterations > 10000) throw new Error("iterations must be between 1 and 10000.");

  const outLinks = new Map<string, string[]>();
  const allNodes = new Set<string>();

  for (const e of edges) {
    const from = String(e.from);
    const to = String(e.to);
    allNodes.add(from);
    allNodes.add(to);
    if (!outLinks.has(from)) outLinks.set(from, []);
    outLinks.get(from)!.push(to);
  }

  const nodes = Array.from(allNodes);
  const n = nodes.length;
  const nodeIndex = new Map<string, number>();
  nodes.forEach((node, i) => nodeIndex.set(node, i));

  let ranks = new Array(n).fill(1 / n);
  let convergedAt = iterations;

  for (let iter = 0; iter < iterations; iter++) {
    const newRanks = new Array(n).fill((1 - damping) / n);

    for (let i = 0; i < n; i++) {
      const node = nodes[i];
      const out = outLinks.get(node);
      if (out && out.length > 0) {
        const share = ranks[i] / out.length;
        for (const target of out) {
          newRanks[nodeIndex.get(target)!] += damping * share;
        }
      } else {
        const share = ranks[i] / n;
        for (let j = 0; j < n; j++) {
          newRanks[j] += damping * share;
        }
      }
    }

    let diff = 0;
    for (let i = 0; i < n; i++) diff += Math.abs(newRanks[i] - ranks[i]);
    ranks = newRanks;

    if (diff < tolerance) {
      convergedAt = iter + 1;
      break;
    }
  }

  const ranked = nodes
    .map((node, i) => ({ node, rank: Math.round(ranks[i] * 1e8) / 1e8 }))
    .sort((a, b) => b.rank - a.rank);

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Higher rank means more important in the link graph",
      "Adjust damping factor (default 0.85) to change random-walk behavior",
    ],
  };
  return stampMeta({
    node_count: n,
    edge_count: edges.length,
    damping,
    iterations_run: convergedAt,
    rankings: ranked,
    top_node: ranked[0].node,
    top_rank: ranked[0].rank,
  }, meta);
}
