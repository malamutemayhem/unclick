export class GCounter {
  private counts: Map<string, number> = new Map();

  increment(nodeId: string, amount: number = 1): void {
    this.counts.set(nodeId, (this.counts.get(nodeId) || 0) + amount);
  }

  value(): number {
    let sum = 0;
    for (const v of this.counts.values()) sum += v;
    return sum;
  }

  merge(other: GCounter): GCounter {
    const result = new GCounter();
    const allKeys = new Set([...this.counts.keys(), ...other.counts.keys()]);
    for (const k of allKeys) {
      result.counts.set(k, Math.max(this.counts.get(k) || 0, other.counts.get(k) || 0));
    }
    return result;
  }

  getNodeValue(nodeId: string): number {
    return this.counts.get(nodeId) || 0;
  }

  nodes(): string[] {
    return [...this.counts.keys()];
  }
}

export class PNCounter {
  private inc: GCounter = new GCounter();
  private dec: GCounter = new GCounter();

  increment(nodeId: string, amount: number = 1): void {
    this.inc.increment(nodeId, amount);
  }

  decrement(nodeId: string, amount: number = 1): void {
    this.dec.increment(nodeId, amount);
  }

  value(): number {
    return this.inc.value() - this.dec.value();
  }

  merge(other: PNCounter): PNCounter {
    const result = new PNCounter();
    result.inc = this.inc.merge(other.inc);
    result.dec = this.dec.merge(other.dec);
    return result;
  }
}
