interface TrieNode<V> {
  children: [TrieNode<V> | null, TrieNode<V> | null];
  value: V | undefined;
  prefix: number;
  bits: number;
}

export class BitwiseTrie<V> {
  private root: TrieNode<V>;
  private _size = 0;

  constructor() {
    this.root = { children: [null, null], value: undefined, prefix: 0, bits: 0 };
  }

  get size(): number {
    return this._size;
  }

  set(key: number, value: V): void {
    let node = this.root;
    for (let bit = 31; bit >= 0; bit--) {
      const idx = (key >>> bit) & 1;
      if (!node.children[idx]) {
        node.children[idx] = { children: [null, null], value: undefined, prefix: 0, bits: 0 };
      }
      node = node.children[idx]!;
    }
    if (node.value === undefined) this._size++;
    node.value = value;
  }

  get(key: number): V | undefined {
    let node = this.root;
    for (let bit = 31; bit >= 0; bit--) {
      const idx = (key >>> bit) & 1;
      if (!node.children[idx]) return undefined;
      node = node.children[idx]!;
    }
    return node.value;
  }

  has(key: number): boolean {
    return this.get(key) !== undefined;
  }

  delete(key: number): boolean {
    const path: { node: TrieNode<V>; idx: number }[] = [];
    let node = this.root;
    for (let bit = 31; bit >= 0; bit--) {
      const idx = (key >>> bit) & 1;
      if (!node.children[idx]) return false;
      path.push({ node, idx });
      node = node.children[idx]!;
    }
    if (node.value === undefined) return false;
    node.value = undefined;
    this._size--;

    for (let i = path.length - 1; i >= 0; i--) {
      const { node: parent, idx } = path[i];
      const child = parent.children[idx]!;
      if (child.value === undefined && !child.children[0] && !child.children[1]) {
        parent.children[idx] = null;
      } else {
        break;
      }
    }
    return true;
  }

  longestPrefixMatch(key: number): { key: number; value: V } | null {
    let node = this.root;
    let lastMatch: { key: number; value: V } | null = null;
    let currentKey = 0;

    for (let bit = 31; bit >= 0; bit--) {
      const idx = (key >>> bit) & 1;
      if (!node.children[idx]) break;
      node = node.children[idx]!;
      currentKey = (currentKey << 1) | idx;
      if (node.value !== undefined) {
        lastMatch = { key: currentKey << bit, value: node.value };
      }
    }
    return lastMatch;
  }

  prefixRange(prefix: number, prefixBits: number): { key: number; value: V }[] {
    let node = this.root;
    for (let bit = 31; bit > 31 - prefixBits; bit--) {
      const idx = (prefix >>> bit) & 1;
      if (!node.children[idx]) return [];
      node = node.children[idx]!;
    }
    const results: { key: number; value: V }[] = [];
    this.collectAll(node, prefix >>> (32 - prefixBits), 32 - prefixBits, results);
    return results;
  }

  entries(): { key: number; value: V }[] {
    const results: { key: number; value: V }[] = [];
    this.collectAll(this.root, 0, 32, results);
    return results;
  }

  keys(): number[] {
    return this.entries().map((e) => e.key);
  }

  values(): V[] {
    return this.entries().map((e) => e.value);
  }

  private collectAll(node: TrieNode<V>, currentKey: number, remainingBits: number, results: { key: number; value: V }[]): void {
    if (remainingBits === 0) {
      if (node.value !== undefined) {
        results.push({ key: currentKey, value: node.value });
      }
      return;
    }
    if (node.value !== undefined && remainingBits === 0) {
      results.push({ key: currentKey, value: node.value });
    }
    for (let idx = 0; idx <= 1; idx++) {
      if (node.children[idx]) {
        this.collectAll(node.children[idx]!, (currentKey << 1) | idx, remainingBits - 1, results);
      }
    }
    if (remainingBits > 0 && !node.children[0] && !node.children[1] && node.value !== undefined) {
      results.push({ key: currentKey << remainingBits, value: node.value });
    }
  }
}

export function ipToInt(ip: string): number {
  const parts = ip.split(".").map(Number);
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}

export function intToIp(n: number): string {
  return `${(n >>> 24) & 255}.${(n >>> 16) & 255}.${(n >>> 8) & 255}.${n & 255}`;
}

export class IpLookup<V> {
  private trie = new BitwiseTrie<V>();

  addRoute(cidr: string, value: V): void {
    const [ip, bits] = cidr.split("/");
    const key = ipToInt(ip);
    const mask = bits ? parseInt(bits) : 32;
    const masked = (key >>> (32 - mask)) << (32 - mask);
    this.trie.set(masked >>> 0, value);
  }

  lookup(ip: string): V | undefined {
    const key = ipToInt(ip);
    const match = this.trie.longestPrefixMatch(key);
    return match?.value;
  }
}
