export interface TrieNode {
  children: Map<string, TrieNode>;
  isEnd: boolean;
  value: string | null;
  count: number;
}

function createNode(): TrieNode {
  return { children: new Map(), isEnd: false, value: null, count: 0 };
}

export class Trie {
  root: TrieNode;
  size: number;

  constructor() {
    this.root = createNode();
    this.size = 0;
  }

  insert(word: string): void {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) {
        node.children.set(ch, createNode());
      }
      node = node.children.get(ch)!;
    }
    if (!node.isEnd) {
      node.isEnd = true;
      node.value = word;
      this.size++;
    }
    node.count++;
  }

  search(word: string): boolean {
    const node = this.findNode(word);
    return node !== null && node.isEnd;
  }

  startsWith(prefix: string): boolean {
    return this.findNode(prefix) !== null;
  }

  findNode(prefix: string): TrieNode | null {
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children.has(ch)) return null;
      node = node.children.get(ch)!;
    }
    return node;
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
    node.value = null;
    node.count = 0;
    this.size--;

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

  autocomplete(prefix: string, maxResults = 10): string[] {
    const node = this.findNode(prefix);
    if (!node) return [];
    const results: string[] = [];
    this.collectWords(node, prefix, results, maxResults);
    return results;
  }

  private collectWords(node: TrieNode, prefix: string, results: string[], max: number): void {
    if (results.length >= max) return;
    if (node.isEnd) results.push(prefix);
    const entries = Array.from(node.children.entries()).sort((a, b) => a[0].localeCompare(b[0]));
    for (const [ch, child] of entries) {
      this.collectWords(child, prefix + ch, results, max);
      if (results.length >= max) return;
    }
  }

  countPrefix(prefix: string): number {
    const node = this.findNode(prefix);
    if (!node) return 0;
    let count = 0;
    const stack: TrieNode[] = [node];
    while (stack.length > 0) {
      const n = stack.pop()!;
      if (n.isEnd) count++;
      for (const child of n.children.values()) {
        stack.push(child);
      }
    }
    return count;
  }

  longestCommonPrefix(): string {
    let prefix = "";
    let node = this.root;
    while (node.children.size === 1 && !node.isEnd) {
      const [ch, child] = Array.from(node.children.entries())[0];
      prefix += ch;
      node = child;
    }
    return prefix;
  }

  allWords(): string[] {
    const results: string[] = [];
    this.collectWords(this.root, "", results, Infinity);
    return results;
  }

  fuzzySearch(word: string, maxDistance: number): string[] {
    const results: string[] = [];
    this.fuzzyHelper(this.root, "", word, maxDistance, results);
    return results;
  }

  private fuzzyHelper(node: TrieNode, current: string, target: string, maxDist: number, results: string[]): void {
    if (node.isEnd) {
      const d = editDistance(current, target);
      if (d <= maxDist) results.push(current);
    }
    if (current.length > target.length + maxDist) return;

    for (const [ch, child] of node.children) {
      this.fuzzyHelper(child, current + ch, target, maxDist, results);
    }
  }
}

function editDistance(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp: number[][] = [];
  for (let i = 0; i <= m; i++) {
    dp[i] = new Array(n + 1);
    dp[i][0] = i;
  }
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }
  return dp[m][n];
}

export function createFromWords(words: string[]): Trie {
  const trie = new Trie();
  for (const w of words) trie.insert(w);
  return trie;
}
