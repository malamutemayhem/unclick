export class BloomFilter {
  private bits: Uint8Array;
  private numHashes: number;
  private bitCount: number;
  private itemCount = 0;

  constructor(expectedItems: number, falsePositiveRate = 0.01) {
    this.bitCount = optimalBitCount(expectedItems, falsePositiveRate);
    this.numHashes = optimalHashCount(this.bitCount, expectedItems);
    this.bits = new Uint8Array(Math.ceil(this.bitCount / 8));
  }

  add(item: string): void {
    for (const pos of this.getPositions(item)) {
      this.bits[Math.floor(pos / 8)] |= 1 << (pos % 8);
    }
    this.itemCount++;
  }

  mightContain(item: string): boolean {
    for (const pos of this.getPositions(item)) {
      if ((this.bits[Math.floor(pos / 8)] & (1 << (pos % 8))) === 0) {
        return false;
      }
    }
    return true;
  }

  get size(): number {
    return this.itemCount;
  }

  get capacity(): number {
    return this.bitCount;
  }

  private getPositions(item: string): number[] {
    const h1 = fnv1a(item);
    const h2 = fnv1a(item + "\x00");
    const positions: number[] = [];
    for (let i = 0; i < this.numHashes; i++) {
      positions.push(Math.abs((h1 + i * h2) % this.bitCount));
    }
    return positions;
  }
}

function fnv1a(str: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = (hash * 0x01000193) >>> 0;
  }
  return hash;
}

function optimalBitCount(n: number, p: number): number {
  return Math.ceil(-n * Math.log(p) / (Math.LN2 * Math.LN2));
}

function optimalHashCount(m: number, n: number): number {
  return Math.max(1, Math.round((m / n) * Math.LN2));
}
