interface TrieNode {
  children: Map<string, TrieNode>;
  isEnd: boolean;
  count: number;
}

export class TrieAutocomplete {
  private root: TrieNode = { children: new Map(), isEnd: false, count: 0 };

  insert(word: string): void {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) {
        node.children.set(ch, { children: new Map(), isEnd: false, count: 0 });
      }
      node = node.children.get(ch)!;
    }
    node.isEnd = true;
    node.count++;
  }

  search(word: string): boolean {
    const node = this.findNode(word);
    return node !== null && node.isEnd;
  }

  startsWith(prefix: string): boolean {
    return this.findNode(prefix) !== null;
  }

  autocomplete(prefix: string, limit: number = 10): string[] {
    const node = this.findNode(prefix);
    if (!node) return [];
    const results: string[] = [];
    this.collect(node, prefix, results, limit);
    return results;
  }

  private collect(node: TrieNode, prefix: string, results: string[], limit: number): void {
    if (results.length >= limit) return;
    if (node.isEnd) results.push(prefix);
    for (const [ch, child] of node.children) {
      if (results.length >= limit) return;
      this.collect(child, prefix + ch, results, limit);
    }
  }

  private findNode(prefix: string): TrieNode | null {
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children.has(ch)) return null;
      node = node.children.get(ch)!;
    }
    return node;
  }

  delete(word: string): boolean {
    return this.deleteHelper(this.root, word, 0);
  }

  private deleteHelper(node: TrieNode, word: string, depth: number): boolean {
    if (depth === word.length) {
      if (!node.isEnd) return false;
      node.isEnd = false;
      node.count = 0;
      return node.children.size === 0;
    }
    const ch = word[depth];
    const child = node.children.get(ch);
    if (!child) return false;
    const shouldDelete = this.deleteHelper(child, word, depth + 1);
    if (shouldDelete) {
      node.children.delete(ch);
      return !node.isEnd && node.children.size === 0;
    }
    return false;
  }

  wordCount(): number {
    let count = 0;
    const traverse = (node: TrieNode): void => {
      if (node.isEnd) count++;
      for (const child of node.children.values()) traverse(child);
    };
    traverse(this.root);
    return count;
  }

  allWords(): string[] {
    const results: string[] = [];
    this.collect(this.root, "", results, Infinity);
    return results;
  }
}
