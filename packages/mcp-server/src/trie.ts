class TrieNode {
  children = new Map<string, TrieNode>();
  isEnd = false;
  value: any = undefined;
}

export class Trie<T = boolean> {
  private root = new TrieNode();
  private _size = 0;

  get size(): number { return this._size; }

  set(key: string, value?: T): void {
    let node = this.root;
    for (const ch of key) {
      if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
      node = node.children.get(ch)!;
    }
    if (!node.isEnd) this._size++;
    node.isEnd = true;
    node.value = value ?? true;
  }

  get(key: string): T | undefined {
    const node = this.findNode(key);
    return node?.isEnd ? node.value : undefined;
  }

  has(key: string): boolean {
    const node = this.findNode(key);
    return node?.isEnd === true;
  }

  delete(key: string): boolean {
    const node = this.findNode(key);
    if (!node || !node.isEnd) return false;
    node.isEnd = false;
    node.value = undefined;
    this._size--;
    return true;
  }

  startsWith(prefix: string): string[] {
    const node = this.findNode(prefix);
    if (!node) return [];
    const results: string[] = [];
    this.collect(node, prefix, results);
    return results;
  }

  keys(): string[] {
    const results: string[] = [];
    this.collect(this.root, "", results);
    return results;
  }

  clear(): void {
    this.root = new TrieNode();
    this._size = 0;
  }

  private findNode(key: string): TrieNode | undefined {
    let node: TrieNode | undefined = this.root;
    for (const ch of key) {
      node = node.children.get(ch);
      if (!node) return undefined;
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
