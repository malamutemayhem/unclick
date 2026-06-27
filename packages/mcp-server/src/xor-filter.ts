export class XorFilter {
  private fingerprints: Uint8Array;
  private size: number;
  private seed: number;

  constructor(items: string[], seed = 42) {
    this.seed = seed;
    this.size = Math.max(4, Math.ceil(items.length * 1.23) + 32);
    this.fingerprints = new Uint8Array(this.size);
    this.build(items);
  }

  private hash(item: string, seed: number): number {
    let h = seed ^ 0x811c9dc5;
    for (let i = 0; i < item.length; i++) {
      h ^= item.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return h >>> 0;
  }

  private fingerprint(item: string): number {
    return (this.hash(item, this.seed ^ 0xdeadbeef) & 0xff) | 1;
  }

  private h0(item: string): number {
    return this.hash(item, this.seed) % this.size;
  }

  private h1(item: string): number {
    return this.hash(item, this.seed ^ 0x9e3779b9) % this.size;
  }

  private h2(item: string): number {
    return this.hash(item, this.seed ^ 0x517cc1b7) % this.size;
  }

  private build(items: string[]): void {
    const stack: { item: string; hashIndex: number }[] = [];
    const counts = new Uint8Array(this.size);
    const sets: Set<string>[] = new Array(this.size);
    for (let i = 0; i < this.size; i++) sets[i] = new Set();

    for (const item of items) {
      const indices = [this.h0(item), this.h1(item), this.h2(item)];
      for (const idx of indices) {
        counts[idx]++;
        sets[idx].add(item);
      }
    }

    const queue: number[] = [];
    for (let i = 0; i < this.size; i++) {
      if (counts[i] === 1) queue.push(i);
    }

    while (queue.length > 0) {
      const pos = queue.pop()!;
      if (sets[pos].size !== 1) continue;
      const item = sets[pos].values().next().value!;
      const indices = [this.h0(item), this.h1(item), this.h2(item)];
      const hashIndex = indices.indexOf(pos);
      stack.push({ item, hashIndex });

      for (const idx of indices) {
        sets[idx].delete(item);
        counts[idx]--;
        if (counts[idx] === 1 && sets[idx].size === 1) queue.push(idx);
      }
    }

    this.fingerprints.fill(0);
    for (let i = stack.length - 1; i >= 0; i--) {
      const { item, hashIndex } = stack[i];
      const fp = this.fingerprint(item);
      const indices = [this.h0(item), this.h1(item), this.h2(item)];
      let xorVal = fp;
      for (let j = 0; j < 3; j++) {
        if (j !== hashIndex) xorVal ^= this.fingerprints[indices[j]];
      }
      this.fingerprints[indices[hashIndex]] = xorVal;
    }
  }

  contains(item: string): boolean {
    const fp = this.fingerprint(item);
    const i0 = this.h0(item);
    const i1 = this.h1(item);
    const i2 = this.h2(item);
    return (this.fingerprints[i0] ^ this.fingerprints[i1] ^ this.fingerprints[i2]) === fp;
  }

  get filterSize(): number { return this.size; }
  get bitsPerEntry(): number { return (this.size * 8) / Math.max(1, this.size / 1.23); }
}

export class QuotientFilter {
  private slots: { occupied: boolean; continuation: boolean; shifted: boolean; remainder: number }[];
  private q: number;
  private r: number;
  private count = 0;

  constructor(quotientBits = 8) {
    this.q = quotientBits;
    this.r = 32 - quotientBits;
    const size = 1 << quotientBits;
    this.slots = new Array(size);
    for (let i = 0; i < size; i++) {
      this.slots[i] = { occupied: false, continuation: false, shifted: false, remainder: 0 };
    }
  }

  private hash(item: string): number {
    let h = 0x811c9dc5;
    for (let i = 0; i < item.length; i++) {
      h ^= item.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return h >>> 0;
  }

  private getQuotient(h: number): number {
    return h >>> this.r;
  }

  private getRemainder(h: number): number {
    return h & ((1 << this.r) - 1);
  }

  insert(item: string): boolean {
    const h = this.hash(item);
    const quotient = this.getQuotient(h);
    const remainder = this.getRemainder(h);

    if (!this.slots[quotient].occupied && !this.slots[quotient].shifted) {
      this.slots[quotient] = { occupied: true, continuation: false, shifted: false, remainder };
      this.count++;
      return true;
    }

    this.slots[quotient].occupied = true;

    let pos = quotient;
    while (this.slots[pos].occupied || this.slots[pos].shifted || this.slots[pos].continuation) {
      if (this.slots[pos].remainder === remainder && this.getQuotient(this.hash(item)) === quotient) {
        return false;
      }
      pos = (pos + 1) % this.slots.length;
      if (pos === quotient) return false;
    }

    this.slots[pos] = { occupied: this.slots[pos].occupied, continuation: pos !== quotient, shifted: pos !== quotient, remainder };
    this.count++;
    return true;
  }

  mightContain(item: string): boolean {
    const h = this.hash(item);
    const quotient = this.getQuotient(h);
    const remainder = this.getRemainder(h);

    if (!this.slots[quotient].occupied) return false;

    let pos = quotient;
    for (let i = 0; i < this.slots.length; i++) {
      if (this.slots[pos].remainder === remainder) return true;
      pos = (pos + 1) % this.slots.length;
      if (!this.slots[pos].shifted && !this.slots[pos].continuation) break;
    }
    return false;
  }

  get size(): number { return this.count; }
  get capacity(): number { return this.slots.length; }
  get loadFactor(): number { return this.count / this.slots.length; }
}
