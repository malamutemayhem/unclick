class LCTNode {
  left: LCTNode | null = null;
  right: LCTNode | null = null;
  parent: LCTNode | null = null;
  rev = false;
  size = 1;
  id: number;
  value: number;
  aggregate: number;

  constructor(id: number, value: number) {
    this.id = id;
    this.value = value;
    this.aggregate = value;
  }
}

export class LinkCutTree {
  private nodes: Map<number, LCTNode> = new Map();

  makeTree(id: number, value = 0): void {
    if (!this.nodes.has(id)) {
      this.nodes.set(id, new LCTNode(id, value));
    }
  }

  link(u: number, v: number): boolean {
    const nu = this.nodes.get(u);
    const nv = this.nodes.get(v);
    if (!nu || !nv) return false;
    if (this.connected(u, v)) return false;
    this.makeRoot(nu);
    nu.parent = nv;
    return true;
  }

  cut(u: number, v: number): boolean {
    const nu = this.nodes.get(u);
    const nv = this.nodes.get(v);
    if (!nu || !nv) return false;
    this.makeRoot(nu);
    this.access(nv);
    if (nv.left !== nu || nu.right !== null) return false;
    nv.left = null;
    nu.parent = null;
    this.pull(nv);
    return true;
  }

  connected(u: number, v: number): boolean {
    const nu = this.nodes.get(u);
    const nv = this.nodes.get(v);
    if (!nu || !nv) return false;
    if (nu === nv) return true;
    this.access(nu);
    this.access(nv);
    return nu.parent !== null;
  }

  pathAggregate(u: number, v: number): number {
    const nu = this.nodes.get(u);
    const nv = this.nodes.get(v);
    if (!nu || !nv) return 0;
    this.makeRoot(nu);
    this.access(nv);
    return nv.aggregate;
  }

  nodeCount(): number {
    return this.nodes.size;
  }

  private isRoot(x: LCTNode): boolean {
    const p = x.parent;
    if (!p) return true;
    return p.left !== x && p.right !== x;
  }

  private push(x: LCTNode): void {
    if (x.rev) {
      const tmp = x.left;
      x.left = x.right;
      x.right = tmp;
      if (x.left) x.left.rev = !x.left.rev;
      if (x.right) x.right.rev = !x.right.rev;
      x.rev = false;
    }
  }

  private pull(x: LCTNode): void {
    x.size = 1;
    x.aggregate = x.value;
    if (x.left) {
      x.size += x.left.size;
      x.aggregate += x.left.aggregate;
    }
    if (x.right) {
      x.size += x.right.size;
      x.aggregate += x.right.aggregate;
    }
  }

  private rotate(x: LCTNode): void {
    const y = x.parent!;
    const z = y.parent;
    if (z && !this.isRoot(y)) {
      if (z.left === y) z.left = x;
      else z.right = x;
    }
    x.parent = z;
    y.parent = x;
    if (y.left === x) {
      y.left = x.right;
      if (x.right) x.right.parent = y;
      x.right = y;
    } else {
      y.right = x.left;
      if (x.left) x.left.parent = y;
      x.left = y;
    }
    this.pull(y);
    this.pull(x);
  }

  private splay(x: LCTNode): void {
    const stack: LCTNode[] = [];
    let u: LCTNode = x;
    while (!this.isRoot(u)) {
      stack.push(u.parent!);
      u = u.parent!;
    }
    stack.reverse();
    for (const node of stack) this.push(node);
    this.push(x);

    while (!this.isRoot(x)) {
      const y = x.parent!;
      if (!this.isRoot(y)) {
        const z = y.parent!;
        if ((z.left === y) === (y.left === x)) {
          this.rotate(y);
        } else {
          this.rotate(x);
        }
      }
      this.rotate(x);
    }
  }

  private access(x: LCTNode): void {
    let last: LCTNode | null = null;
    let u: LCTNode | null = x;
    while (u) {
      this.splay(u);
      u.right = last;
      this.pull(u);
      last = u;
      u = u.parent;
    }
    this.splay(x);
  }

  private makeRoot(x: LCTNode): void {
    this.access(x);
    x.rev = !x.rev;
    this.push(x);
  }
}
