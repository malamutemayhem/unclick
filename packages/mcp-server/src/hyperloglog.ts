export class HyperLogLog {
  private registers: Uint8Array;
  private m: number;
  private p: number;

  constructor(precision: number = 14) {
    this.p = precision;
    this.m = 1 << precision;
    this.registers = new Uint8Array(this.m);
  }

  private hash(value: string): number {
    let h = 0x811c9dc5;
    for (let i = 0; i < value.length; i++) {
      h ^= value.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return h >>> 0;
  }

  private rho(w: number, maxBits: number): number {
    let r = 1;
    while (r <= maxBits && !(w & 1)) {
      r++;
      w >>>= 1;
    }
    return r;
  }

  add(value: string): void {
    const h = this.hash(value);
    const j = h >>> (32 - this.p);
    const w = h << this.p;
    const r = this.rho(w, 32 - this.p);
    if (r > this.registers[j]) {
      this.registers[j] = r;
    }
  }

  count(): number {
    const alpha = this.m >= 128
      ? 0.7213 / (1 + 1.079 / this.m)
      : this.m === 64 ? 0.709
      : this.m === 32 ? 0.697
      : 0.673;

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

  merge(other: HyperLogLog): HyperLogLog {
    const result = new HyperLogLog(this.p);
    for (let i = 0; i < this.m; i++) {
      result.registers[i] = Math.max(this.registers[i], other.registers[i]);
    }
    return result;
  }

  clear(): void {
    this.registers.fill(0);
  }

  precision(): number {
    return this.p;
  }

  registerCount(): number {
    return this.m;
  }
}
