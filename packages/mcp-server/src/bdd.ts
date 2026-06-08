export type BDDNode =
  | { kind: "leaf"; value: boolean }
  | { kind: "decision"; variable: number; low: BDDNode; high: BDDNode };

export const TRUE: BDDNode = { kind: "leaf", value: true };
export const FALSE: BDDNode = { kind: "leaf", value: false };

export function variable(index: number): BDDNode {
  return { kind: "decision", variable: index, low: FALSE, high: TRUE };
}

export function evaluate(node: BDDNode, assignment: Map<number, boolean>): boolean {
  if (node.kind === "leaf") return node.value;
  const val = assignment.get(node.variable);
  if (val === undefined) throw new Error(`Variable ${node.variable} not assigned`);
  return evaluate(val ? node.high : node.low, assignment);
}

export function apply(op: "and" | "or" | "xor" | "implies", a: BDDNode, b: BDDNode): BDDNode {
  if (a.kind === "leaf" && b.kind === "leaf") {
    let result: boolean;
    switch (op) {
      case "and": result = a.value && b.value; break;
      case "or": result = a.value || b.value; break;
      case "xor": result = a.value !== b.value; break;
      case "implies": result = !a.value || b.value; break;
    }
    return result ? TRUE : FALSE;
  }

  if (a.kind === "leaf") {
    if (op === "and" && !a.value) return FALSE;
    if (op === "and" && a.value) return b;
    if (op === "or" && a.value) return TRUE;
    if (op === "or" && !a.value) return b;
  }

  if (b.kind === "leaf") {
    if (op === "and" && !b.value) return FALSE;
    if (op === "and" && b.value) return a;
    if (op === "or" && b.value) return TRUE;
    if (op === "or" && !b.value) return a;
  }

  const aVar = a.kind === "decision" ? a.variable : Infinity;
  const bVar = b.kind === "decision" ? b.variable : Infinity;
  const topVar = Math.min(aVar, bVar);

  const aLow = aVar === topVar && a.kind === "decision" ? a.low : a;
  const aHigh = aVar === topVar && a.kind === "decision" ? a.high : a;
  const bLow = bVar === topVar && b.kind === "decision" ? b.low : b;
  const bHigh = bVar === topVar && b.kind === "decision" ? b.high : b;

  const low = apply(op, aLow, bLow);
  const high = apply(op, aHigh, bHigh);

  if (low === high) return low;
  return { kind: "decision", variable: topVar, low, high };
}

export function not(node: BDDNode): BDDNode {
  if (node.kind === "leaf") return node.value ? FALSE : TRUE;
  return {
    kind: "decision",
    variable: node.variable,
    low: not(node.low),
    high: not(node.high),
  };
}

export function and(a: BDDNode, b: BDDNode): BDDNode {
  return apply("and", a, b);
}

export function or(a: BDDNode, b: BDDNode): BDDNode {
  return apply("or", a, b);
}

export function xor(a: BDDNode, b: BDDNode): BDDNode {
  return apply("xor", a, b);
}

export function implies(a: BDDNode, b: BDDNode): BDDNode {
  return apply("implies", a, b);
}

export function restrict(node: BDDNode, varIndex: number, value: boolean): BDDNode {
  if (node.kind === "leaf") return node;
  if (node.variable === varIndex) return value ? node.high : node.low;
  return {
    kind: "decision",
    variable: node.variable,
    low: restrict(node.low, varIndex, value),
    high: restrict(node.high, varIndex, value),
  };
}

export function satCount(node: BDDNode, numVars: number): number {
  function count(n: BDDNode, level: number): number {
    if (n.kind === "leaf") return n.value ? Math.pow(2, numVars - level) : 0;
    const gap = n.variable - level;
    const factor = Math.pow(2, gap > 0 ? gap - 1 : 0);
    return factor * (count(n.low, n.variable + 1) + count(n.high, n.variable + 1));
  }
  return count(node, 0);
}

export function nodeCount(node: BDDNode): number {
  const visited = new Set<BDDNode>();
  function walk(n: BDDNode): void {
    if (visited.has(n)) return;
    visited.add(n);
    if (n.kind === "decision") {
      walk(n.low);
      walk(n.high);
    }
  }
  walk(node);
  return visited.size;
}

export function isEquivalent(a: BDDNode, b: BDDNode, numVars: number): boolean {
  for (let i = 0; i < Math.pow(2, numVars); i++) {
    const assignment = new Map<number, boolean>();
    for (let v = 0; v < numVars; v++) {
      assignment.set(v, (i & (1 << v)) !== 0);
    }
    if (evaluate(a, assignment) !== evaluate(b, assignment)) return false;
  }
  return true;
}
