export type DecisionNode<T = unknown> =
  | { type: "leaf"; value: T; label?: string }
  | { type: "branch"; feature: string; threshold: number; left: DecisionNode<T>; right: DecisionNode<T>; label?: string };

export function createLeaf<T>(value: T, label?: string): DecisionNode<T> {
  return { type: "leaf", value, label };
}

export function createBranch<T>(
  feature: string,
  threshold: number,
  left: DecisionNode<T>,
  right: DecisionNode<T>,
  label?: string,
): DecisionNode<T> {
  return { type: "branch", feature, threshold, left, right, label };
}

export function predict<T>(tree: DecisionNode<T>, features: Record<string, number>): T {
  if (tree.type === "leaf") return tree.value;
  const val = features[tree.feature] ?? 0;
  return val <= tree.threshold ? predict(tree.left, features) : predict(tree.right, features);
}

export function depth(tree: DecisionNode): number {
  if (tree.type === "leaf") return 0;
  return 1 + Math.max(depth(tree.left), depth(tree.right));
}

export function nodeCount(tree: DecisionNode): number {
  if (tree.type === "leaf") return 1;
  return 1 + nodeCount(tree.left) + nodeCount(tree.right);
}

export function leafCount(tree: DecisionNode): number {
  if (tree.type === "leaf") return 1;
  return leafCount(tree.left) + leafCount(tree.right);
}

export function getPath<T>(tree: DecisionNode<T>, features: Record<string, number>): string[] {
  if (tree.type === "leaf") return [tree.label ?? String(tree.value)];
  const val = features[tree.feature] ?? 0;
  const label = tree.label ?? `${tree.feature} <= ${tree.threshold}`;
  if (val <= tree.threshold) {
    return [label + " (yes)", ...getPath(tree.left, features)];
  }
  return [label + " (no)", ...getPath(tree.right, features)];
}

export function collectLeaves<T>(tree: DecisionNode<T>): T[] {
  if (tree.type === "leaf") return [tree.value];
  return [...collectLeaves(tree.left), ...collectLeaves(tree.right)];
}
