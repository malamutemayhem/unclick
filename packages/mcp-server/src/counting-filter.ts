export class CountingBloomFilter {
  private counters: Uint8Array;
  private numHashes: number;
  private size: number;
  private itemCount = 0;

  constructor(size = 1024, numHashes = 3) {
    this.size = size;
    this.numHashes = numHashes;
    this.counters = new Uint8Array(size);
  }

  private hashes(item: string): number[] {
    const indices: number[] = [];
    let h1 = 0x811c9dc5;
    let h2 = 0;
    for (let i = 0; i < item.length; i++) {
      h1 ^= item.charCodeAt(i);
      h1 = Math.imul(h1, 0x01000193);
      h2 = (Math.imul(h2, 31) + item.charCodeAt(i)) | 0;
    }
    for (let i = 0; i < this.numHashes; i++) {
      const combined = (h1 + Math.imul(i, h2)) >>> 0;
      indices.push(combined % this.size);
    }
    return indices;
  }

  add(item: string): void {
    for (const idx of this.hashes(item)) {
      if (this.counters[idx] < 255) this.counters[idx]++;
    }
    this.itemCount++;
  }

  remove(item: string): boolean {
    const indices = this.hashes(item);
    for (const idx of indices) {
      if (this.counters[idx] === 0) return false;
    }
    for (const idx of indices) {
      this.counters[idx]--;
    }
    this.itemCount--;
    return true;
  }

  mightContain(item: string): boolean {
    for (const idx of this.hashes(item)) {
      if (this.counters[idx] === 0) return false;
    }
    return true;
  }

  get count(): number { return this.itemCount; }
  get filterSize(): number { return this.size; }

  clear(): void {
    this.counters.fill(0);
    this.itemCount = 0;
  }

  estimateFPR(): number {
    let setBits = 0;
    for (let i = 0; i < this.size; i++) {
      if (this.counters[i] > 0) setBits++;
    }
    const ratio = setBits / this.size;
    return Math.pow(ratio, this.numHashes);
  }
}

export class CountMinSketch {
  private table: Uint32Array[];
  private width: number;
  private depth: number;

  constructor(width = 1024, depth = 4) {
    this.width = width;
    this.depth = depth;
    this.table = [];
    for (let i = 0; i < depth; i++) {
      this.table.push(new Uint32Array(width));
    }
  }

  private hash(item: string, seed: number): number {
    let h = seed;
    for (let i = 0; i < item.length; i++) {
      h ^= item.charCodeAt(i);
      h = Math.imul(h, 0x01000193 + seed);
    }
    return (h >>> 0) % this.width;
  }

  add(item: string, count = 1): void {
    for (let i = 0; i < this.depth; i++) {
      const idx = this.hash(item, i * 0x9e3779b9);
      this.table[i][idx] += count;
    }
  }

  estimate(item: string): number {
    let min = Infinity;
    for (let i = 0; i < this.depth; i++) {
      const idx = this.hash(item, i * 0x9e3779b9);
      if (this.table[i][idx] < min) min = this.table[i][idx];
    }
    return min;
  }

  clear(): void {
    for (const row of this.table) row.fill(0);
  }
}

export class HyperLogLog {
  private registers: Uint8Array;
  private m: number;
  private p: number;

  constructor(precision = 10) {
    this.p = precision;
    this.m = 1 << precision;
    this.registers = new Uint8Array(this.m);
  }

  private hash(item: string): number {
    let h = 0x811c9dc5;
    for (let i = 0; i < item.length; i++) {
      h ^= item.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return h >>> 0;
  }

  private rho(w: number): number {
    if (w === 0) return 32 - this.p;
    let r = 1;
    while ((w & 1) === 0 && r <= 32 - this.p) {
      r++;
      w >>>= 1;
    }
    return r;
  }

  add(item: string): void {
    const h = this.hash(item);
    const j = h >>> (32 - this.p);
    const w = h << this.p;
    const r = this.rho(w);
    if (r > this.registers[j]) this.registers[j] = r;
  }

  estimate(): number {
    const alpha = this.m >= 128 ? 0.7213 / (1 + 1.079 / this.m) :
      this.m === 64 ? 0.709 :
        this.m === 32 ? 0.697 : 0.673;

    let sum = 0;
    let zeros = 0;
    for (let i = 0; i < this.m; i++) {
      sum += Math.pow(2, -this.registers[i]);
      if (this.registers[i] === 0) zeros++;
    }

    let estimate = alpha * this.m * this.m / sum;

    if (estimate <= 2.5 * this.m && zeros > 0) {
      estimate = this.m * Math.log(this.m / zeros);
    }

    return Math.round(estimate);
  }

  clear(): void {
    this.registers.fill(0);
  }
}
