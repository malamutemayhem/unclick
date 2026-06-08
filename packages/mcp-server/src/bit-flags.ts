export class BitFlags {
  private value: number;

  constructor(initial = 0) {
    this.value = initial;
  }

  set(flag: number): this {
    this.value |= flag;
    return this;
  }

  clear(flag: number): this {
    this.value &= ~flag;
    return this;
  }

  toggle(flag: number): this {
    this.value ^= flag;
    return this;
  }

  has(flag: number): boolean {
    return (this.value & flag) === flag;
  }

  hasAny(...flags: number[]): boolean {
    for (const flag of flags) {
      if (this.has(flag)) return true;
    }
    return false;
  }

  hasAll(...flags: number[]): boolean {
    for (const flag of flags) {
      if (!this.has(flag)) return false;
    }
    return true;
  }

  valueOf(): number {
    return this.value;
  }

  toBinary(): string {
    return this.value.toString(2);
  }

  toArray(flagMap: Record<string, number>): string[] {
    return Object.entries(flagMap)
      .filter(([, v]) => this.has(v))
      .map(([k]) => k);
  }

  reset(): this {
    this.value = 0;
    return this;
  }

  count(): number {
    let n = this.value;
    let count = 0;
    while (n) {
      count += n & 1;
      n >>>= 1;
    }
    return count;
  }
}

export function defineFlags<T extends Record<string, number>>(names: (keyof T)[]): T {
  const flags = {} as Record<string, number>;
  for (let i = 0; i < names.length; i++) {
    flags[names[i] as string] = 1 << i;
  }
  return flags as T;
}

export function combine(...flags: number[]): number {
  return flags.reduce((acc, f) => acc | f, 0);
}

export function intersect(a: number, b: number): number {
  return a & b;
}

export function difference(a: number, b: number): number {
  return a & ~b;
}
