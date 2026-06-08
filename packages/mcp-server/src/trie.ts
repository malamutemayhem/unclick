interface TrieNode {
  children: Map<string, TrieNode>;
  isEnd: boolean;
  value?: unknown;
}

function createTrieNode(): TrieNode {
  return { children: new Map(), isEnd: false };
}

export class Trie<V = boolean> {
  private root: TrieNode = createTrieNode();
  private count = 0;

  insert(key: string, value?: V): void {
    let node = this.root;
    for (const ch of key) {
      if (!node.children.has(ch)) {
        node.children.set(ch, createTrieNode());
      }
      node = node.children.get(ch)!;
    }
    if (!node.isEnd) this.count++;
    node.isEnd = true;
    node.value = value ?? true;
  }

  has(key: string): boolean {
    const node = this.findNode(key);
    return node !== null && node.isEnd;
  }

  get(key: string): V | undefined {
    const node = this.findNode(key);
    if (!node || !node.isEnd) return undefined;
    return node.value as V;
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
    this.count--;

    for (let i = path.length - 1; i >= 0; i--) {
      const [parent, ch] = path[i];
      const child = parent.children.get(ch)!;
      if (!child.isEnd && child.children.size === 0) {
        parent.children.delete(ch);
      } else {
        break;
      }
    }
    return true;
  }

  startsWith(prefix: string): string[] {
    const node = this.findNode(prefix);
    if (!node) return [];
    const results: string[] = [];
    this.collect(node, prefix, results);
    return results;
  }

  get size(): number {
    return this.count;
  }

  keys(): string[] {
    const results: string[] = [];
    this.collect(this.root, "", results);
    return results;
  }

  clear(): void {
    this.root = createTrieNode();
    this.count = 0;
  }

  longestPrefix(text: string): string {
    let node = this.root;
    let longest = "";
    let current = "";
    for (const ch of text) {
      if (!node.children.has(ch)) break;
      node = node.children.get(ch)!;
      current += ch;
      if (node.isEnd) longest = current;
    }
    return longest;
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
