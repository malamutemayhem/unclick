import { stampMeta, ConnectorMeta } from "./connector-meta.js";

interface AVLNode {
  key: number;
  height: number;
  left: AVLNode | null;
  right: AVLNode | null;
}

function height(n: AVLNode | null): number {
  return n ? n.height : 0;
}

function updateHeight(n: AVLNode): void {
  n.height = 1 + Math.max(height(n.left), height(n.right));
}

function rotateRight(y: AVLNode): AVLNode {
  const x = y.left!;
  y.left = x.right;
  x.right = y;
  updateHeight(y);
  updateHeight(x);
  return x;
}

function rotateLeft(x: AVLNode): AVLNode {
  const y = x.right!;
  x.right = y.left;
  y.left = x;
  updateHeight(x);
  updateHeight(y);
  return y;
}

function balance(n: AVLNode): number {
  return height(n.left) - height(n.right);
}

function insert(root: AVLNode | null, key: number): AVLNode {
  if (!root) return { key, height: 1, left: null, right: null };
  if (key < root.key) root.left = insert(root.left, key);
  else if (key > root.key) root.right = insert(root.right, key);
  else return root;

  updateHeight(root);
  const bal = balance(root);

  if (bal > 1 && root.left && key < root.left.key) return rotateRight(root);
  if (bal < -1 && root.right && key > root.right.key) return rotateLeft(root);
  if (bal > 1 && root.left && key > root.left.key) {
    root.left = rotateLeft(root.left);
    return rotateRight(root);
  }
  if (bal < -1 && root.right && key < root.right.key) {
    root.right = rotateRight(root.right);
    return rotateLeft(root);
  }

  return root;
}

function inorder(n: AVLNode | null, out: number[]): void {
  if (!n) return;
  inorder(n.left, out);
  out.push(n.key);
  inorder(n.right, out);
}

function treeHeight(n: AVLNode | null): number {
  return n ? n.height : 0;
}

function nodeCount(n: AVLNode | null): number {
  if (!n) return 0;
  return 1 + nodeCount(n.left) + nodeCount(n.right);
}

function search(n: AVLNode | null, key: number): boolean {
  if (!n) return false;
  if (key === n.key) return true;
  return key < n.key ? search(n.left, key) : search(n.right, key);
}

export async function avlTree(args: Record<string, unknown>) {
  const keys = args.keys as number[];
  if (!Array.isArray(keys) || keys.length === 0) {
    throw new Error("keys must be a non-empty array of numbers");
  }
  if (keys.length > 50_000) {
    throw new Error("keys length must be at most 50,000");
  }

  const searchKeys = (args.search_keys ?? []) as number[];

  let root: AVLNode | null = null;
  for (const k of keys) {
    root = insert(root, k);
  }

  const sorted: number[] = [];
  inorder(root, sorted);

  const searchResults: Record<string, boolean> = {};
  for (const k of searchKeys) {
    searchResults[String(k)] = search(root, k);
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use AVL trees for balanced BST operations with O(log n) guarantees"],
  };

  return stampMeta(
    {
      node_count: nodeCount(root),
      tree_height: treeHeight(root),
      inorder: sorted,
      root_key: root ? root.key : null,
      search_results: Object.keys(searchResults).length > 0 ? searchResults : undefined,
    },
    meta,
  );
}
