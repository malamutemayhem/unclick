import { stampMeta, ConnectorMeta } from "./connector-meta.js";

interface TreapNode {
  key: number;
  priority: number;
  left: number | null;
  right: number | null;
  size: number;
}

export async function treapSim(args: Record<string, unknown>) {
  const values = args.values as number[];
  if (!Array.isArray(values) || values.length === 0) {
    throw new Error("values must be a non-empty array of numbers");
  }
  if (values.length > 10_000) {
    throw new Error("values must have at most 10,000 elements");
  }

  const nodes: TreapNode[] = [];
  let root: number | null = null;

  function newNode(key: number): number {
    const idx = nodes.length;
    nodes.push({ key, priority: Math.random(), left: null, right: null, size: 1 });
    return idx;
  }

  function updateSize(idx: number | null) {
    if (idx === null) return;
    const n = nodes[idx];
    n.size = 1;
    if (n.left !== null) n.size += nodes[n.left].size;
    if (n.right !== null) n.size += nodes[n.right].size;
  }

  function rotateRight(idx: number): number {
    const l = nodes[idx].left!;
    nodes[idx].left = nodes[l].right;
    nodes[l].right = idx;
    updateSize(idx);
    updateSize(l);
    return l;
  }

  function rotateLeft(idx: number): number {
    const r = nodes[idx].right!;
    nodes[idx].right = nodes[r].left;
    nodes[r].left = idx;
    updateSize(idx);
    updateSize(r);
    return r;
  }

  function insert(cur: number | null, key: number): number {
    if (cur === null) return newNode(key);
    if (key < nodes[cur].key) {
      nodes[cur].left = insert(nodes[cur].left, key);
      if (nodes[nodes[cur].left!].priority > nodes[cur].priority) {
        cur = rotateRight(cur);
      }
    } else {
      nodes[cur].right = insert(nodes[cur].right, key);
      if (nodes[nodes[cur].right!].priority > nodes[cur].priority) {
        cur = rotateLeft(cur);
      }
    }
    updateSize(cur);
    return cur;
  }

  function inorder(idx: number | null, result: number[]) {
    if (idx === null) return;
    inorder(nodes[idx].left, result);
    result.push(nodes[idx].key);
    inorder(nodes[idx].right, result);
  }

  function height(idx: number | null): number {
    if (idx === null) return 0;
    return 1 + Math.max(height(nodes[idx].left), height(nodes[idx].right));
  }

  for (const v of values) root = insert(root, v);

  const sorted: number[] = [];
  inorder(root, sorted);

  const queries = (args.search as number[]) ?? [];
  const searchResults = queries.map((q) => {
    let cur = root;
    while (cur !== null) {
      if (q === nodes[cur].key) return { value: q, found: true };
      cur = q < nodes[cur].key ? nodes[cur].left : nodes[cur].right;
    }
    return { value: q, found: false };
  });

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use treap for balanced BST operations with randomized priorities"],
  };

  return stampMeta(
    {
      element_count: values.length,
      tree_height: height(root),
      sorted: sorted.length <= 200 ? sorted : sorted.slice(0, 200),
      truncated: sorted.length > 200,
      search_results: searchResults,
    },
    meta,
  );
}
