import { stampMeta, ConnectorMeta } from "./connector-meta.js";

const RED = 0;
const BLACK = 1;

interface RBNode {
  key: number;
  color: number;
  left: RBNode | null;
  right: RBNode | null;
  parent: RBNode | null;
}

function newNode(key: number): RBNode {
  return { key, color: RED, left: null, right: null, parent: null };
}

function rotateLeft(root: RBNode | null, x: RBNode): RBNode | null {
  const y = x.right!;
  x.right = y.left;
  if (y.left) y.left.parent = x;
  y.parent = x.parent;
  if (!x.parent) root = y;
  else if (x === x.parent.left) x.parent.left = y;
  else x.parent.right = y;
  y.left = x;
  x.parent = y;
  return root;
}

function rotateRight(root: RBNode | null, y: RBNode): RBNode | null {
  const x = y.left!;
  y.left = x.right;
  if (x.right) x.right.parent = y;
  x.parent = y.parent;
  if (!y.parent) root = x;
  else if (y === y.parent.left) y.parent.left = x;
  else y.parent.right = x;
  x.right = y;
  y.parent = x;
  return root;
}

function insertFixup(root: RBNode | null, z: RBNode): RBNode | null {
  while (z.parent && z.parent.color === RED) {
    if (z.parent === z.parent.parent?.left) {
      const uncle = z.parent.parent.right;
      if (uncle && uncle.color === RED) {
        z.parent.color = BLACK;
        uncle.color = BLACK;
        z.parent.parent.color = RED;
        z = z.parent.parent;
      } else {
        if (z === z.parent.right) {
          z = z.parent;
          root = rotateLeft(root, z);
        }
        z.parent!.color = BLACK;
        z.parent!.parent!.color = RED;
        root = rotateRight(root, z.parent!.parent!);
      }
    } else {
      const uncle = z.parent.parent?.left;
      if (uncle && uncle.color === RED) {
        z.parent.color = BLACK;
        uncle.color = BLACK;
        z.parent.parent!.color = RED;
        z = z.parent.parent!;
      } else {
        if (z === z.parent.left) {
          z = z.parent;
          root = rotateRight(root, z);
        }
        z.parent!.color = BLACK;
        z.parent!.parent!.color = RED;
        root = rotateLeft(root, z.parent!.parent!);
      }
    }
  }
  if (root) root.color = BLACK;
  return root;
}

function rbInsert(root: RBNode | null, key: number): RBNode {
  const z = newNode(key);
  let y: RBNode | null = null;
  let x = root;
  while (x) {
    y = x;
    if (key < x.key) x = x.left;
    else if (key > x.key) x = x.right;
    else return root!;
  }
  z.parent = y;
  if (!y) return insertFixup(z, z)!;
  if (key < y.key) y.left = z;
  else y.right = z;
  return insertFixup(root, z)!;
}

function inorder(n: RBNode | null, out: number[]): void {
  if (!n) return;
  inorder(n.left, out);
  out.push(n.key);
  inorder(n.right, out);
}

function treeHeight(n: RBNode | null): number {
  if (!n) return 0;
  return 1 + Math.max(treeHeight(n.left), treeHeight(n.right));
}

function blackHeight(n: RBNode | null): number {
  if (!n) return 1;
  const left = blackHeight(n.left);
  const right = blackHeight(n.right);
  if (left !== right) return -1;
  return left + (n.color === BLACK ? 1 : 0);
}

function nodeCount(n: RBNode | null): number {
  if (!n) return 0;
  return 1 + nodeCount(n.left) + nodeCount(n.right);
}

export async function rbTreeSim(args: Record<string, unknown>) {
  const keys = args.keys as number[];
  if (!Array.isArray(keys) || keys.length === 0) {
    throw new Error("keys must be a non-empty array of numbers");
  }
  if (keys.length > 50_000) {
    throw new Error("keys length must be at most 50,000");
  }

  let root: RBNode | null = null;
  for (const k of keys) {
    root = rbInsert(root, k);
  }

  const sorted: number[] = [];
  inorder(root, sorted);

  const bh = blackHeight(root);

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use red-black trees for balanced BST with guaranteed O(log n) operations"],
  };

  return stampMeta(
    {
      node_count: nodeCount(root),
      tree_height: treeHeight(root),
      black_height: bh,
      root_key: root ? root.key : null,
      root_color: root ? (root.color === BLACK ? "black" : "red") : null,
      inorder: sorted,
      is_valid_rb: bh !== -1 && (root ? root.color === BLACK : true),
    },
    meta,
  );
}
