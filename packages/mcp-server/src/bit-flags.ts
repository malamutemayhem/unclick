export class BitFlags {
  private value: number;

  constructor(initial = 0) { this.value = initial; }

  set(flag: number): this { this.value |= flag; return this; }
  clear(flag: number): this { this.value &= ~flag; return this; }
  toggle(flag: number): this { this.value ^= flag; return this; }
  has(flag: number): boolean { return (this.value & flag) === flag; }
  hasAny(flag: number): boolean { return (this.value & flag) !== 0; }

  get raw(): number { return this.value; }

  reset(): void { this.value = 0; }

  toArray(maxBit = 32): number[] {
    const flags: number[] = [];
    for (let i = 0; i < maxBit; i++) {
      if (this.value & (1 << i)) flags.push(1 << i);
    }
    return flags;
  }

  toString(): string { return this.value.toString(2); }

  static combine(...flags: number[]): number {
    return flags.reduce((a, b) => a | b, 0);
  }

  static fromArray(flags: number[]): BitFlags {
    return new BitFlags(BitFlags.combine(...flags));
  }
}

export function createFlags<T extends string>(names: T[]): Record<T, number> {
  const flags = {} as Record<T, number>;
  for (let i = 0; i < names.length; i++) {
    flags[names[i]] = 1 << i;
  }
  return flags;
}
