export class QuotientFilter {
  private q: number;
  private r: number;
  private size: number;
  private slots: (number | null)[];
  private occupied: boolean[];
  private continuation: boolean[];
  private shifted: boolean[];
  private _count = 0;

  constructor(quotientBits = 8) {
    this.q = quotientBits;
    this.r = 32 - quotientBits;
    this.size = 1 << quotientBits;
    this.slots = new Array(this.size).fill(null);
    this.occupied = new Array(this.size).fill(false);
    this.continuation = new Array(this.size).fill(false);
    this.shifted = new Array(this.size).fill(false);
  }

  private hash(value: string): number {
    let h = 0x811c9dc5;
    for (let i = 0; i < value.length; i++) {
      h ^= value.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return h >>> 0;
  }

  private fingerprint(value: string): { quotient: number; remainder: number } {
    const h = this.hash(value);
    return {
      quotient: h >>> this.r,
      remainder: h & ((1 << this.r) - 1),
    };
  }

  insert(value: string): void {
    const { quotient, remainder } = this.fingerprint(value);
    if (this.slots[quotient] === null) {
      this.slots[quotient] = remainder;
      this.occupied[quotient] = true;
      this._count++;
      return;
    }
    this.occupied[quotient] = true;
    let pos = quotient;
    while (this.slots[pos] !== null) {
      pos = (pos + 1) % this.size;
      if (pos === quotient) return;
    }
    this.slots[pos] = remainder;
    if (pos !== quotient) {
      this.shifted[pos] = true;
      this.continuation[pos] = true;
    }
    this._count++;
  }

  mayContain(value: string): boolean {
    const { quotient, remainder } = this.fingerprint(value);
    if (!this.occupied[quotient]) return false;
    let pos = quotient;
    for (let i = 0; i < this.size; i++) {
      if (this.slots[pos] === null) return false;
      if (this.slots[pos] === remainder) return true;
      pos = (pos + 1) % this.size;
      if (pos === quotient) break;
    }
    return false;
  }

  count(): number {
    return this._count;
  }

  loadFactor(): number {
    return this._count / this.size;
  }

  capacity(): number {
    return this.size;
  }
}
