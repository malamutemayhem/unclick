export interface DomTree {
  idom: Map<number, number>;
  children: Map<number, number[]>;
  dominates(a: number, b: number): boolean;
  frontier(id: number): number[];
  allFrontiers(): Map<number, number[]>;
  depth(id: number): number;
  lca(a: number, b: number): number;
}

export function computeDominators(
  entry: number,
  successors: (id: number) => number[],
  predecessors: (id: number) => number[],
  nodes: number[]
): DomTree {
  const rpo = reversePostOrder(entry, successors, nodes);
  const rpoIndex = new Map<number, number>();
  rpo.forEach((n, i) => rpoIndex.set(n, i));

  const idom = new Map<number, number>();
  idom.set(entry, entry);

  const intersect = (b1: number, b2: number): number => {
    let f1 = b1;
    let f2 = b2;
    while (f1 !== f2) {
      while ((rpoIndex.get(f1) ?? 0) > (rpoIndex.get(f2) ?? 0)) {
        f1 = idom.get(f1)!;
      }
      while ((rpoIndex.get(f2) ?? 0) > (rpoIndex.get(f1) ?? 0)) {
        f2 = idom.get(f2)!;
      }
    }
    return f1;
  };

  let changed = true;
  while (changed) {
    changed = false;
    for (const b of rpo) {
      if (b === entry) continue;
      const preds = predecessors(b).filter((p) => idom.has(p));
      if (preds.length === 0) continue;

      let newIdom = preds[0];
      for (let i = 1; i < preds.length; i++) {
        newIdom = intersect(newIdom, preds[i]);
      }

      if (idom.get(b) !== newIdom) {
        idom.set(b, newIdom);
        changed = true;
      }
    }
  }

  const children = new Map<number, number[]>();
  for (const n of nodes) children.set(n, []);
  for (const [n, d] of idom) {
    if (n !== d) {
      children.get(d)!.push(n);
    }
  }
  for (const [, c] of children) c.sort((a, b) => a - b);

  const dominates = (a: number, b: number): boolean => {
    let cur = b;
    while (cur !== entry) {
      if (cur === a) return true;
      const parent = idom.get(cur);
      if (parent === undefined || parent === cur) break;
      cur = parent;
    }
    return cur === a;
  };

  const frontier = (id: number): number[] => {
    const df = new Set<number>();
    const computeDF = (n: number) => {
      for (const succ of successors(n)) {
        if (idom.get(succ) !== n) {
          df.add(succ);
        }
      }
      for (const child of children.get(n) ?? []) {
        computeDF(child);
        for (const succ of frontierOf(child)) {
          if (idom.get(succ) !== n) {
            df.add(succ);
          }
        }
      }
    };

    const frontierOf = (node: number): Set<number> => {
      const result = new Set<number>();
      for (const succ of successors(node)) {
        if (idom.get(succ) !== node) result.add(succ);
      }
      for (const child of children.get(node) ?? []) {
        for (const s of frontierOf(child)) {
          if (idom.get(s) !== node) result.add(s);
        }
      }
      return result;
    };

    return [...frontierOf(id)].sort((a, b) => a - b);
  };

  const allFrontiers = (): Map<number, number[]> => {
    const result = new Map<number, number[]>();
    for (const n of nodes) {
      result.set(n, frontier(n));
    }
    return result;
  };

  const depth = (id: number): number => {
    let d = 0;
    let cur = id;
    while (cur !== entry) {
      const parent = idom.get(cur);
      if (parent === undefined || parent === cur) break;
      cur = parent;
      d++;
    }
    return d;
  };

  const lca = (a: number, b: number): number => {
    let da = depth(a);
    let db = depth(b);
    let na = a;
    let nb = b;
    while (da > db) { na = idom.get(na)!; da--; }
    while (db > da) { nb = idom.get(nb)!; db--; }
    while (na !== nb) {
      na = idom.get(na)!;
      nb = idom.get(nb)!;
    }
    return na;
  };

  return { idom, children, dominates, frontier, allFrontiers, depth, lca };
}

function reversePostOrder(
  entry: number,
  successors: (id: number) => number[],
  nodes: number[]
): number[] {
  const visited = new Set<number>();
  const order: number[] = [];

  const dfs = (n: number) => {
    if (visited.has(n)) return;
    visited.add(n);
    for (const succ of successors(n)) {
      dfs(succ);
    }
    order.push(n);
  };

  dfs(entry);
  return order.reverse();
}
