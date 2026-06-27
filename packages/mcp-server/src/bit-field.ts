export class BitField {
  private flags: number;
  private readonly names: Map<string, number>;

  constructor(fields: string[] = []) {
    this.flags = 0;
    this.names = new Map();
    fields.forEach((name, i) => {
      if (i >= 31) throw new Error("BitField supports at most 31 named fields");
      this.names.set(name, 1 << i);
    });
  }

  set(name: string): this {
    const mask = this.getMask(name);
    this.flags |= mask;
    return this;
  }

  unset(name: string): this {
    const mask = this.getMask(name);
    this.flags &= ~mask;
    return this;
  }

  toggle(name: string): this {
    const mask = this.getMask(name);
    this.flags ^= mask;
    return this;
  }

  has(name: string): boolean {
    const mask = this.getMask(name);
    return (this.flags & mask) !== 0;
  }

  hasAll(...names: string[]): boolean {
    return names.every((n) => this.has(n));
  }

  hasAny(...names: string[]): boolean {
    return names.some((n) => this.has(n));
  }

  clear(): this {
    this.flags = 0;
    return this;
  }

  toNumber(): number {
    return this.flags;
  }

  fromNumber(value: number): this {
    this.flags = value;
    return this;
  }

  toArray(): string[] {
    const result: string[] = [];
    for (const [name, mask] of this.names) {
      if ((this.flags & mask) !== 0) result.push(name);
    }
    return result;
  }

  private getMask(name: string): number {
    const mask = this.names.get(name);
    if (mask === undefined) throw new Error(`Unknown field: ${name}`);
    return mask;
  }
}
