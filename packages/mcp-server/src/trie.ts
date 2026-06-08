interface TrieNode {
  children: Map<string, TrieNode>;
  isEnd: boolean;
  value?: unknown;
}

function createNode(): TrieNode {
  return { children: new Map(), isEnd: false };
}

export class Trie<V = boolean> {
  private root = createNode();
  private count = 0;

  insert(key: string, value?: V): void {
    let node = this.root;
    for (const ch of key) {
      if (!node.children.has(ch)) {
        node.children.set(ch, createNode());
      }
      node = node.children.get(ch)!;
    }
    if (!node.isEnd) this.count++;
    node.isEnd = true;
    node.value = value ?? true;
  }

  has(key: string): boolean {
    const node = this.findNode(key);
    return node !== undefined && node.isEnd;
  }

  get(key: string): V | undefined {
    const node = this.findNode(key);
    if (!node || !node.isEnd) return undefined;
    return node.value as V;
  }

  startsWith(prefix: string): string[] {
    const node = this.findNode(prefix);
    if (!node) return [];
    const results: string[] = [];
    this.collect(node, prefix, results);
    return results;
  }

  delete(key: string): boolean {
    const deleted = this.deleteRecurse(this.root, key, 0);
    if (deleted) this.count--;
    return deleted;
  }

  get size(): number {
    return this.count;
  }

  private findNode(prefix: string): TrieNode | undefined {
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children.has(ch)) return undefined;
      node = node.children.get(ch)!;
    }
    return node;
  }

  private collect(node: TrieNode, prefix: string, results: string[]): void {
    if (node.isEnd) results.push(prefix);
    for (const [ch, child] of node.children) {
      this.collect(child, prefix + ch, results);
    }
  }

  private deleteRecurse(node: TrieNode, key: string, depth: number): boolean {
    if (depth === key.length) {
      if (!node.isEnd) return false;
      node.isEnd = false;
      node.value = undefined;
      return true;
    }
    const ch = key[depth];
    const child = node.children.get(ch);
    if (!child) return false;
    const deleted = this.deleteRecurse(child, key, depth + 1);
    if (deleted && !child.isEnd && child.children.size === 0) {
      node.children.delete(ch);
    }
    return deleted;
  }
}
