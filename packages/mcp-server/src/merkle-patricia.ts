export interface TrieNode {
  key: string;
  value: unknown | undefined;
  children: Map<string, TrieNode>;
  hash: string;
}

function simpleHash(data: string): string {
  let h = 0;
  for (let i = 0; i < data.length; i++) {
    h = ((h << 5) - h + data.charCodeAt(i)) | 0;
  }
  return Math.abs(h).toString(16).padStart(8, "0");
}

export class MerklePatriciaTrie {
  private root: TrieNode;
  private count = 0;

  constructor() {
    this.root = this.createNode("");
  }

  private createNode(key: string): TrieNode {
    return { key, value: undefined, children: new Map(), hash: simpleHash("") };
  }

  put(key: string, value: unknown): void {
    let node = this.root;
    for (const ch of key) {
      if (!node.children.has(ch)) {
        node.children.set(ch, this.createNode(ch));
      }
      node = node.children.get(ch)!;
    }
    if (node.value === undefined) this.count++;
    node.value = value;
    this.rehash(key);
  }

  get(key: string): unknown | undefined {
    const node = this.findNode(key);
    return node?.value;
  }

  has(key: string): boolean {
    const node = this.findNode(key);
    return node !== undefined && node.value !== undefined;
  }

  delete(key: string): boolean {
    const node = this.findNode(key);
    if (!node || node.value === undefined) return false;
    node.value = undefined;
    this.count--;
    this.rehash(key);
    return true;
  }

  private findNode(key: string): TrieNode | undefined {
    let node = this.root;
    for (const ch of key) {
      const child = node.children.get(ch);
      if (!child) return undefined;
      node = child;
    }
    return node;
  }

  private rehash(key: string): void {
    const path: TrieNode[] = [this.root];
    let node = this.root;
    for (const ch of key) {
      const child = node.children.get(ch);
      if (!child) break;
      path.push(child);
      node = child;
    }
    for (let i = path.length - 1; i >= 0; i--) {
      path[i].hash = this.computeHash(path[i]);
    }
  }

  private computeHash(node: TrieNode): string {
    const childHashes = [...node.children.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => k + v.hash)
      .join("");
    const data = node.key + String(node.value ?? "") + childHashes;
    return simpleHash(data);
  }

  rootHash(): string {
    return this.root.hash;
  }

  size(): number {
    return this.count;
  }

  keys(): string[] {
    const result: string[] = [];
    const walk = (node: TrieNode, prefix: string) => {
      if (node.value !== undefined) result.push(prefix);
      for (const [ch, child] of node.children) {
        walk(child, prefix + ch);
      }
    };
    walk(this.root, "");
    return result.sort();
  }

  entries(): Array<[string, unknown]> {
    const result: Array<[string, unknown]> = [];
    const walk = (node: TrieNode, prefix: string) => {
      if (node.value !== undefined) result.push([prefix, node.value]);
      for (const [ch, child] of node.children) {
        walk(child, prefix + ch);
      }
    };
    walk(this.root, "");
    return result;
  }

  keysWithPrefix(prefix: string): string[] {
    let node = this.root;
    for (const ch of prefix) {
      const child = node.children.get(ch);
      if (!child) return [];
      node = child;
    }
    const result: string[] = [];
    const walk = (n: TrieNode, p: string) => {
      if (n.value !== undefined) result.push(p);
      for (const [ch, child] of n.children) {
        walk(child, p + ch);
      }
    };
    walk(node, prefix);
    return result.sort();
  }

  verify(): boolean {
    const check = (node: TrieNode): boolean => {
      const expected = this.computeHash(node);
      if (node.hash !== expected) return false;
      for (const child of node.children.values()) {
        if (!check(child)) return false;
      }
      return true;
    };
    return check(this.root);
  }
}
