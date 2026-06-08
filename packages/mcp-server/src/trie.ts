interface TrieNode {
  children: Map<string, TrieNode>;
  isEnd: boolean;
  data?: unknown;
}

function createNode(): TrieNode {
  return { children: new Map(), isEnd: false };
}

export class Trie {
  private root = createNode();
  private count = 0;

  insert(word: string, data?: unknown): void {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) node.children.set(ch, createNode());
      node = node.children.get(ch)!;
    }
    if (!node.isEnd) this.count++;
    node.isEnd = true;
    node.data = data;
  }

  has(word: string): boolean {
    const node = this.traverse(word);
    return node !== null && node.isEnd;
  }

  get(word: string): unknown | undefined {
    const node = this.traverse(word);
    return node?.isEnd ? node.data : undefined;
  }

  startsWith(prefix: string): boolean {
    return this.traverse(prefix) !== null;
  }

  autocomplete(prefix: string, limit = 10): string[] {
    const node = this.traverse(prefix);
    if (!node) return [];
    const results: string[] = [];
    this.collect(node, prefix, results, limit);
    return results;
  }

  delete(word: string): boolean {
    const path: { node: TrieNode; char: string }[] = [];
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) return false;
      path.push({ node, char: ch });
      node = node.children.get(ch)!;
    }
    if (!node.isEnd) return false;
    node.isEnd = false;
    node.data = undefined;
    this.count--;
    for (let i = path.length - 1; i >= 0; i--) {
      const child = path[i].node.children.get(path[i].char)!;
      if (child.children.size === 0 && !child.isEnd) {
        path[i].node.children.delete(path[i].char);
      } else {
        break;
      }
    }
    return true;
  }

  private traverse(word: string): TrieNode | null {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) return null;
      node = node.children.get(ch)!;
    }
    return node;
  }

  private collect(node: TrieNode, prefix: string, results: string[], limit: number): void {
    if (results.length >= limit) return;
    if (node.isEnd) results.push(prefix);
    for (const [ch, child] of node.children) {
      this.collect(child, prefix + ch, results, limit);
    }
  }

  get size(): number {
    return this.count;
  }

  clear(): void {
    this.root = createNode();
    this.count = 0;
  }
}
