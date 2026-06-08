interface TrieNode {
  children: Map<string, TrieNode>;
  isEnd: boolean;
  value?: unknown;
}

function createNode(): TrieNode {
  return { children: new Map(), isEnd: false };
}

export class Trie<T = boolean> {
  private root: TrieNode = createNode();
  private _size = 0;

  insert(key: string, value?: T): void {
    let node = this.root;
    for (const ch of key) {
      if (!node.children.has(ch)) node.children.set(ch, createNode());
      node = node.children.get(ch)!;
    }
    if (!node.isEnd) this._size++;
    node.isEnd = true;
    node.value = value;
  }

  has(key: string): boolean {
    const node = this.findNode(key);
    return node !== null && node.isEnd;
  }

  get(key: string): T | undefined {
    const node = this.findNode(key);
    if (node === null || !node.isEnd) return undefined;
    return node.value as T;
  }

  delete(key: string): boolean {
    const path: [TrieNode, string][] = [];
    let node = this.root;
    for (const ch of key) {
      if (!node.children.has(ch)) return false;
      path.push([node, ch]);
      node = node.children.get(ch)!;
    }
    if (!node.isEnd) return false;
    node.isEnd = false;
    node.value = undefined;
    this._size--;
    for (let i = path.length - 1; i >= 0; i--) {
      const [parent, ch] = path[i];
      const child = parent.children.get(ch)!;
      if (child.isEnd || child.children.size > 0) break;
      parent.children.delete(ch);
    }
    return true;
  }

  startsWith(prefix: string): string[] {
    const node = this.findNode(prefix);
    if (node === null) return [];
    const results: string[] = [];
    this.collect(node, prefix, results);
    return results;
  }

  get size(): number {
    return this._size;
  }

  keys(): string[] {
    const results: string[] = [];
    this.collect(this.root, "", results);
    return results;
  }

  private findNode(key: string): TrieNode | null {
    let node = this.root;
    for (const ch of key) {
      if (!node.children.has(ch)) return null;
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
}
