interface TrieNode {
  children: Map<string, TrieNode>;
  isEnd: boolean;
}

function createNode(): TrieNode {
  return { children: new Map(), isEnd: false };
}

export class Trie {
  private root = createNode();
  private count = 0;

  insert(word: string): this {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) node.children.set(ch, createNode());
      node = node.children.get(ch)!;
    }
    if (!node.isEnd) {
      node.isEnd = true;
      this.count++;
    }
    return this;
  }

  has(word: string): boolean {
    const node = this.findNode(word);
    return node !== null && node.isEnd;
  }

  hasPrefix(prefix: string): boolean {
    return this.findNode(prefix) !== null;
  }

  remove(word: string): boolean {
    const path: Array<{ node: TrieNode; char: string }> = [];
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) return false;
      path.push({ node, char: ch });
      node = node.children.get(ch)!;
    }
    if (!node.isEnd) return false;
    node.isEnd = false;
    this.count--;
    for (let i = path.length - 1; i >= 0; i--) {
      const { node: parent, char } = path[i];
      const child = parent.children.get(char)!;
      if (child.children.size === 0 && !child.isEnd) {
        parent.children.delete(char);
      } else {
        break;
      }
    }
    return true;
  }

  autocomplete(prefix: string, limit: number = 10): string[] {
    const node = this.findNode(prefix);
    if (!node) return [];
    const results: string[] = [];
    const collect = (n: TrieNode, path: string): void => {
      if (results.length >= limit) return;
      if (n.isEnd) results.push(path);
      for (const [ch, child] of n.children) {
        if (results.length >= limit) return;
        collect(child, path + ch);
      }
    };
    collect(node, prefix);
    return results;
  }

  get size(): number {
    return this.count;
  }

  clear(): void {
    this.root = createNode();
    this.count = 0;
  }

  private findNode(prefix: string): TrieNode | null {
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children.has(ch)) return null;
      node = node.children.get(ch)!;
    }
    return node;
  }
}
