function simpleHash(data: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < data.length; i++) {
    h ^= data.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, "0");
}

export interface CASObject {
  hash: string;
  data: string;
  size: number;
  refs: string[];
}

export class ContentAddressableStore {
  private objects = new Map<string, CASObject>();

  put(data: string, refs: string[] = []): string {
    const hash = simpleHash(data);
    if (!this.objects.has(hash)) {
      this.objects.set(hash, { hash, data, size: data.length, refs: [...refs] });
    }
    return hash;
  }

  get(hash: string): string | undefined {
    return this.objects.get(hash)?.data;
  }

  has(hash: string): boolean {
    return this.objects.has(hash);
  }

  refs(hash: string): string[] {
    return this.objects.get(hash)?.refs ?? [];
  }

  remove(hash: string): boolean {
    return this.objects.delete(hash);
  }

  size(): number {
    return this.objects.size;
  }

  totalBytes(): number {
    let total = 0;
    for (const obj of this.objects.values()) {
      total += obj.size;
    }
    return total;
  }

  allHashes(): string[] {
    return [...this.objects.keys()];
  }

  reachable(rootHash: string): Set<string> {
    const visited = new Set<string>();
    const visit = (hash: string) => {
      if (visited.has(hash)) return;
      if (!this.objects.has(hash)) return;
      visited.add(hash);
      for (const ref of this.refs(hash)) {
        visit(ref);
      }
    };
    visit(rootHash);
    return visited;
  }

  gc(roots: string[]): number {
    const reachable = new Set<string>();
    for (const root of roots) {
      for (const h of this.reachable(root)) {
        reachable.add(h);
      }
    }
    let removed = 0;
    for (const hash of this.objects.keys()) {
      if (!reachable.has(hash)) {
        this.objects.delete(hash);
        removed++;
      }
    }
    return removed;
  }

  verify(hash: string): boolean {
    const obj = this.objects.get(hash);
    if (!obj) return false;
    return simpleHash(obj.data) === hash;
  }
}

export class MerkleTree {
  private leaves: string[] = [];
  private store: ContentAddressableStore;

  constructor(store: ContentAddressableStore) {
    this.store = store;
  }

  addLeaf(data: string): string {
    const hash = this.store.put(data);
    this.leaves.push(hash);
    return hash;
  }

  root(): string {
    if (this.leaves.length === 0) return "";
    let level = [...this.leaves];
    while (level.length > 1) {
      const next: string[] = [];
      for (let i = 0; i < level.length; i += 2) {
        if (i + 1 < level.length) {
          const combined = level[i] + level[i + 1];
          next.push(this.store.put(combined, [level[i], level[i + 1]]));
        } else {
          next.push(level[i]);
        }
      }
      level = next;
    }
    return level[0];
  }

  leafCount(): number {
    return this.leaves.length;
  }
}
