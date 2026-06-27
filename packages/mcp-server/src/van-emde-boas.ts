export class VanEmdeBoas {
  private universe: number;
  private min: number;
  private max: number;
  private summary: VanEmdeBoas | null;
  private clusters: Map<number, VanEmdeBoas>;
  private sqrtHigh: number;
  private sqrtLow: number;

  constructor(universe: number) {
    this.universe = universe;
    this.min = -1;
    this.max = -1;
    this.clusters = new Map();
    this.summary = null;

    if (universe > 2) {
      this.sqrtHigh = Math.ceil(Math.sqrt(universe));
      this.sqrtLow = Math.ceil(Math.sqrt(universe));
    } else {
      this.sqrtHigh = 1;
      this.sqrtLow = 1;
    }
  }

  private high(x: number): number {
    return Math.floor(x / this.sqrtLow);
  }

  private low(x: number): number {
    return x % this.sqrtLow;
  }

  private index(high: number, low: number): number {
    return high * this.sqrtLow + low;
  }

  private getCluster(i: number): VanEmdeBoas {
    if (!this.clusters.has(i)) {
      this.clusters.set(i, new VanEmdeBoas(this.sqrtLow));
    }
    return this.clusters.get(i)!;
  }

  private getSummary(): VanEmdeBoas {
    if (!this.summary) {
      this.summary = new VanEmdeBoas(this.sqrtHigh);
    }
    return this.summary;
  }

  getMin(): number { return this.min; }
  getMax(): number { return this.max; }

  member(x: number): boolean {
    if (x === this.min || x === this.max) return true;
    if (this.universe <= 2) return false;
    const cluster = this.clusters.get(this.high(x));
    if (!cluster) return false;
    return cluster.member(this.low(x));
  }

  insert(x: number): void {
    if (this.min === -1) {
      this.min = x;
      this.max = x;
      return;
    }

    let val = x;
    if (val < this.min) {
      const tmp = this.min;
      this.min = val;
      val = tmp;
    }

    if (this.universe > 2) {
      const hi = this.high(val);
      const lo = this.low(val);
      const cluster = this.getCluster(hi);
      if (cluster.getMin() === -1) {
        this.getSummary().insert(hi);
        cluster.min = lo;
        cluster.max = lo;
      } else {
        cluster.insert(lo);
      }
    }

    if (val > this.max) this.max = val;
  }

  successor(x: number): number {
    if (this.universe <= 2) {
      if (x === 0 && this.max === 1) return 1;
      return -1;
    }

    if (this.min !== -1 && x < this.min) return this.min;

    const hi = this.high(x);
    const lo = this.low(x);
    const cluster = this.clusters.get(hi);
    if (cluster && cluster.getMax() !== -1 && lo < cluster.getMax()) {
      const offset = cluster.successor(lo);
      return this.index(hi, offset);
    }

    const succCluster = this.summary ? this.summary.successor(hi) : -1;
    if (succCluster === -1) return -1;
    const nextCluster = this.clusters.get(succCluster);
    if (!nextCluster) return -1;
    return this.index(succCluster, nextCluster.getMin());
  }

  predecessor(x: number): number {
    if (this.universe <= 2) {
      if (x === 1 && this.min === 0) return 0;
      return -1;
    }

    if (this.max !== -1 && x > this.max) return this.max;

    const hi = this.high(x);
    const lo = this.low(x);
    const cluster = this.clusters.get(hi);
    if (cluster && cluster.getMin() !== -1 && lo > cluster.getMin()) {
      const offset = cluster.predecessor(lo);
      return this.index(hi, offset);
    }

    const predCluster = this.summary ? this.summary.predecessor(hi) : -1;
    if (predCluster !== -1) {
      const prevCluster = this.clusters.get(predCluster);
      if (prevCluster) {
        return this.index(predCluster, prevCluster.getMax());
      }
    }

    if (this.min !== -1 && x > this.min) return this.min;
    return -1;
  }

  toArray(): number[] {
    const result: number[] = [];
    if (this.min === -1) return result;
    let current = this.min;
    while (current !== -1) {
      result.push(current);
      current = this.successor(current);
    }
    return result;
  }

  isEmpty(): boolean {
    return this.min === -1;
  }
}
