import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function cartesianTree(args: Record<string, unknown>) {
  const arr = args.array as number[];

  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error("array must be a non-empty array of numbers");
  }
  if (arr.length > 100_000) {
    throw new Error("array length must be at most 100,000");
  }
  for (const v of arr) {
    if (typeof v !== "number" || !Number.isFinite(v)) {
      throw new Error("all array values must be finite numbers");
    }
  }

  const n = arr.length;
  const parent = new Int32Array(n).fill(-1);
  const left = new Int32Array(n).fill(-1);
  const right = new Int32Array(n).fill(-1);
  const stack: number[] = [];

  for (let i = 0; i < n; i++) {
    let last = -1;
    while (stack.length > 0 && arr[stack[stack.length - 1]] > arr[i]) {
      last = stack.pop()!;
    }
    if (last !== -1) {
      left[i] = last;
      parent[last] = i;
    }
    if (stack.length > 0) {
      right[stack[stack.length - 1]] = i;
      parent[i] = stack[stack.length - 1];
    }
    stack.push(i);
  }

  const root = stack[0];

  let height = 0;
  function computeHeight(idx: number, depth: number): void {
    if (idx === -1) return;
    if (depth > height) height = depth;
    computeHeight(left[idx], depth + 1);
    computeHeight(right[idx], depth + 1);
  }
  computeHeight(root, 0);

  const inorder: number[] = [];
  function inorderTraversal(idx: number): void {
    if (idx === -1) return;
    inorderTraversal(left[idx]);
    inorder.push(idx);
    inorderTraversal(right[idx]);
  }
  inorderTraversal(root);

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use Cartesian tree for range minimum queries and treap-like structures"],
  };

  return stampMeta(
    {
      array_length: n,
      root,
      root_value: arr[root],
      height,
      parent: Array.from(parent),
      left_child: Array.from(left),
      right_child: Array.from(right),
      inorder_indices: inorder,
    },
    meta,
  );
}
