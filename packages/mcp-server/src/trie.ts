interface TrieNode {
  children: Map<string, TrieNode>;
  isEnd: boolean;
  value?: unknown;
}

function createNode(): TrieNode {
  return { children: new Map(), isEnd: false };
}

export class Trie<T = unknown> {
  private root: TrieNode = createNode();
  private count = 0;

  insert(key: string, value?: T): void {
    let node = this.root;
    for (const char of key) {
      if (!node.children.has(char)) node.children.set(char, createNode());
      node = node.children.get(char)!;
    }
    if (!node.isEnd) this.count++;
    node.isEnd = true;
    node.value = value;
  }

  search(key: string): T | undefined {
    const node = this.findNode(key);
    if (!node || !node.isEnd) return undefined;
    return node.value as T;
  }

  has(key: string): boolean {
    const node = this.findNode(key);
    return node !== undefined && node.isEnd;
  }

  startsWith(prefix: string): string[] {
    const node = this.findNode(prefix);
    if (!node) return [];
    const results: string[] = [];
    this.collectKeys(node, prefix, results);
    return results;
  }

  delete(key: string): boolean {
    const deleted = this.deleteHelper(this.root, key, 0);
    if (deleted) this.count--;
    return deleted;
  }

  get size(): number {
    return this.count;
  }

  keys(): string[] {
    const result: string[] = [];
    this.collectKeys(this.root, "", result);
    return result;
  }

  clear(): void {
    this.root = createNode();
    this.count = 0;
  }

  longestPrefix(text: string): string {
    let node = this.root;
    let longest = "";
    let current = "";
    for (const char of text) {
      if (!node.children.has(char)) break;
      node = node.children.get(char)!;
      current += char;
      if (node.isEnd) longest = current;
    }
    return longest;
  }

  private findNode(key: string): TrieNode | undefined {
    let node = this.root;
    for (const char of key) {
      if (!node.children.has(char)) return undefined;
      node = node.children.get(char)!;
    }
    return node;
  }

  private collectKeys(node: TrieNode, prefix: string, results: string[]): void {
    if (node.isEnd) results.push(prefix);
    for (const [char, child] of node.children) {
      this.collectKeys(child, prefix + char, results);
    }
  }

  private deleteHelper(node: TrieNode, key: string, depth: number): boolean {
    if (depth === key.length) {
      if (!node.isEnd) return false;
      node.isEnd = false;
      return true;
    }
    const child = node.children.get(key[depth]);
    if (!child) return false;
    const deleted = this.deleteHelper(child, key, depth + 1);
    if (deleted && !child.isEnd && child.children.size === 0) {
      node.children.delete(key[depth]);
    }
    return deleted;
  }
}
