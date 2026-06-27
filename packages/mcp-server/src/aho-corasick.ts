interface ACNode {
  children: Map<string, ACNode>;
  fail: ACNode | null;
  output: string[];
  depth: number;
}

export interface ACMatch {
  pattern: string;
  position: number;
}

export class AhoCorasick {
  private root: ACNode;
  private built = false;

  constructor() {
    this.root = { children: new Map(), fail: null, output: [], depth: 0 };
  }

  addPattern(pattern: string): void {
    this.built = false;
    let node = this.root;
    for (const ch of pattern) {
      if (!node.children.has(ch)) {
        node.children.set(ch, { children: new Map(), fail: null, output: [], depth: node.depth + 1 });
      }
      node = node.children.get(ch)!;
    }
    node.output.push(pattern);
  }

  addPatterns(patterns: string[]): void {
    for (const p of patterns) this.addPattern(p);
  }

  build(): void {
    const queue: ACNode[] = [];
    for (const child of this.root.children.values()) {
      child.fail = this.root;
      queue.push(child);
    }

    while (queue.length > 0) {
      const current = queue.shift()!;
      for (const [ch, child] of current.children) {
        let failNode = current.fail;
        while (failNode && !failNode.children.has(ch)) {
          failNode = failNode.fail;
        }
        child.fail = failNode ? failNode.children.get(ch)! : this.root;
        if (child.fail === child) child.fail = this.root;
        child.output = [...child.output, ...child.fail.output];
        queue.push(child);
      }
    }
    this.built = true;
  }

  search(text: string): ACMatch[] {
    if (!this.built) this.build();
    const matches: ACMatch[] = [];
    let node = this.root;

    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      while (node !== this.root && !node.children.has(ch)) {
        node = node.fail!;
      }
      node = node.children.get(ch) || this.root;
      for (const pattern of node.output) {
        matches.push({ pattern, position: i - pattern.length + 1 });
      }
    }
    return matches;
  }

  hasMatch(text: string): boolean {
    if (!this.built) this.build();
    let node = this.root;
    for (const ch of text) {
      while (node !== this.root && !node.children.has(ch)) {
        node = node.fail!;
      }
      node = node.children.get(ch) || this.root;
      if (node.output.length > 0) return true;
    }
    return false;
  }
}
