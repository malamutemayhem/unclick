export class Bitmask {
  private value: number;

  constructor(initial: number = 0) {
    this.value = initial >>> 0;
  }

  set(bit: number): this {
    this.value |= 1 << bit;
    return this;
  }

  clear(bit: number): this {
    this.value &= ~(1 << bit);
    return this;
  }

  toggle(bit: number): this {
    this.value ^= 1 << bit;
    return this;
  }

  has(bit: number): boolean {
    return (this.value & (1 << bit)) !== 0;
  }

  hasAll(mask: number): boolean {
    return (this.value & mask) === mask;
  }

  hasAny(mask: number): boolean {
    return (this.value & mask) !== 0;
  }

  and(other: Bitmask): Bitmask {
    return new Bitmask((this.value & other.value) >>> 0);
  }

  or(other: Bitmask): Bitmask {
    return new Bitmask((this.value | other.value) >>> 0);
  }

  xor(other: Bitmask): Bitmask {
    return new Bitmask((this.value ^ other.value) >>> 0);
  }

  not(): Bitmask {
    return new Bitmask((~this.value) >>> 0);
  }

  count(): number {
    let n = this.value;
    n = n - ((n >> 1) & 0x55555555);
    n = (n & 0x33333333) + ((n >> 2) & 0x33333333);
    return (((n + (n >> 4)) & 0x0f0f0f0f) * 0x01010101) >> 24;
  }

  toNumber(): number {
    return this.value;
  }

  toBinary(): string {
    return this.value.toString(2);
  }

  toArray(): number[] {
    const bits: number[] = [];
    for (let i = 0; i < 32; i++) {
      if (this.has(i)) bits.push(i);
    }
    return bits;
  }

  static from(bits: number[]): Bitmask {
    const mask = new Bitmask();
    for (const b of bits) mask.set(b);
    return mask;
  }
}
