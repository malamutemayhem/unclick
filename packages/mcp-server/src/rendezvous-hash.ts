export class RendezvousHash {
  private nodes: string[];

  constructor(nodes: string[] = []) {
    this.nodes = [...nodes];
  }

  private hash(key: string, node: string): number {
    const combined = key + ":" + node;
    let h = 0x811c9dc5;
    for (let i = 0; i < combined.length; i++) {
      h ^= combined.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return h >>> 0;
  }

  getNode(key: string): string | undefined {
    if (this.nodes.length === 0) return undefined;
    let best = this.nodes[0];
    let bestHash = this.hash(key, best);
    for (let i = 1; i < this.nodes.length; i++) {
      const h = this.hash(key, this.nodes[i]);
      if (h > bestHash) {
        bestHash = h;
        best = this.nodes[i];
      }
    }
    return best;
  }

  getTopN(key: string, n: number): string[] {
    const scored = this.nodes.map((node) => ({
      node,
      score: this.hash(key, node),
    }));
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, n).map((s) => s.node);
  }

  addNode(node: string): void {
    if (!this.nodes.includes(node)) {
      this.nodes.push(node);
    }
  }

  removeNode(node: string): void {
    this.nodes = this.nodes.filter((n) => n !== node);
  }

  nodeCount(): number {
    return this.nodes.length;
  }

  getNodes(): string[] {
    return [...this.nodes];
  }

  distribution(keys: string[]): Map<string, number> {
    const dist = new Map<string, number>();
    for (const node of this.nodes) dist.set(node, 0);
    for (const key of keys) {
      const node = this.getNode(key);
      if (node) dist.set(node, (dist.get(node) ?? 0) + 1);
    }
    return dist;
  }
}
