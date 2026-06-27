interface TrieNode<T> {
  children: Map<string, TrieNode<T>>;
  value?: T;
  isEnd: boolean;
}

function createNode<T>(): TrieNode<T> {
  return { children: new Map(), isEnd: false };
}

export class Trie<T = boolean> {
  private root: TrieNode<T> = createNode();
  private _size = 0;

  get size(): number { return this._size; }

  set(key: string, value: T): void {
    let node = this.root;
    for (const char of key) {
      if (!node.children.has(char)) node.children.set(char, createNode());
      node = node.children.get(char)!;
    }
    if (!node.isEnd) this._size++;
    node.isEnd = true;
    node.value = value;
  }

  get(key: string): T | undefined {
    const node = this.findNode(key);
    return node?.isEnd ? node.value : undefined;
  }

  has(key: string): boolean {
    const node = this.findNode(key);
    return node !== undefined && node.isEnd;
  }

  delete(key: string): boolean {
    const path: [TrieNode<T>, string][] = [];
    let node = this.root;
    for (const char of key) {
      if (!node.children.has(char)) return false;
      path.push([node, char]);
      node = node.children.get(char)!;
    }
    if (!node.isEnd) return false;
    node.isEnd = false;
    node.value = undefined;
    this._size--;

    for (let i = path.length - 1; i >= 0; i--) {
      const [parent, char] = path[i];
      const child = parent.children.get(char)!;
      if (child.isEnd || child.children.size > 0) break;
      parent.children.delete(char);
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

  clear(): void {
    this.root = createNode();
    this._size = 0;
  }

  keys(): string[] {
    const results: string[] = [];
    this.collect(this.root, "", results);
    return results;
  }

  private findNode(key: string): TrieNode<T> | undefined {
    let node = this.root;
    for (const char of key) {
      if (!node.children.has(char)) return undefined;
      node = node.children.get(char)!;
    }
    return node;
  }

  private collect(node: TrieNode<T>, prefix: string, results: string[]): void {
    if (node.isEnd) results.push(prefix);
    for (const [char, child] of node.children) {
      this.collect(child, prefix + char, results);
    }
  }
}
