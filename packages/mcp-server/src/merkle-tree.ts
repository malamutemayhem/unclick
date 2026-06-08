function defaultHash(data: string): string {
  let h = 0;
  for (let i = 0; i < data.length; i++) {
    h = ((h << 5) - h + data.charCodeAt(i)) | 0;
  }
  return (h >>> 0).toString(16).padStart(8, "0");
}

interface MerkleNode {
  hash: string;
  left: MerkleNode | null;
  right: MerkleNode | null;
  data: string | null;
}

export class MerkleTree {
  private root: MerkleNode | null = null;
  private leaves: MerkleNode[] = [];
  private hashFn: (data: string) => string;

  constructor(data: string[], hashFn?: (data: string) => string) {
    this.hashFn = hashFn || defaultHash;
    if (data.length > 0) {
      this.leaves = data.map((d) => ({ hash: this.hashFn(d), left: null, right: null, data: d }));
      this.root = this.buildTree(this.leaves);
    }
  }

  private buildTree(nodes: MerkleNode[]): MerkleNode {
    if (nodes.length === 1) return nodes[0];
    const parent: MerkleNode[] = [];
    for (let i = 0; i < nodes.length; i += 2) {
      const left = nodes[i];
      const right = i + 1 < nodes.length ? nodes[i + 1] : left;
      parent.push({
        hash: this.hashFn(left.hash + right.hash),
        left,
        right: i + 1 < nodes.length ? right : null,
        data: null,
      });
    }
    return this.buildTree(parent);
  }

  get rootHash(): string | null {
    return this.root?.hash ?? null;
  }

  getProof(index: number): string[] {
    if (index < 0 || index >= this.leaves.length) return [];
    const proof: string[] = [];
    let nodes = [...this.leaves];
    let idx = index;

    while (nodes.length > 1) {
      const parent: MerkleNode[] = [];
      for (let i = 0; i < nodes.length; i += 2) {
        const left = nodes[i];
        const right = i + 1 < nodes.length ? nodes[i + 1] : left;
        if (i === idx || i + 1 === idx) {
          proof.push(i === idx ? (i + 1 < nodes.length ? right.hash : left.hash) : left.hash);
        }
        parent.push({
          hash: this.hashFn(left.hash + right.hash),
          left,
          right: i + 1 < nodes.length ? right : null,
          data: null,
        });
      }
      idx = Math.floor(idx / 2);
      nodes = parent;
    }
    return proof;
  }

  verify(data: string, index: number, proof: string[]): boolean {
    let hash = this.hashFn(data);
    let idx = index;
    for (const sibling of proof) {
      if (idx % 2 === 0) {
        hash = this.hashFn(hash + sibling);
      } else {
        hash = this.hashFn(sibling + hash);
      }
      idx = Math.floor(idx / 2);
    }
    return hash === this.rootHash;
  }

  get leafCount(): number {
    return this.leaves.length;
  }

  getLeafHashes(): string[] {
    return this.leaves.map((l) => l.hash);
  }
}
