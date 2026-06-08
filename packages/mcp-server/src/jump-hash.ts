export class JumpHash {
  static hash(key: number, numBuckets: number): number {
    let k = BigInt.asUintN(64, BigInt(key));
    let b = -1;
    let j = 0;
    while (j < numBuckets) {
      b = j;
      k = BigInt.asUintN(64, k * 2862933555777941757n + 1n);
      const shifted = Number(BigInt.asUintN(64, k) >> 33n) + 1;
      j = Math.floor((b + 1) * (2147483648 / shifted));
    }
    return b;
  }

  static hashString(key: string, numBuckets: number): number {
    let h = 0;
    for (let i = 0; i < key.length; i++) {
      h = Math.imul(h, 31) + key.charCodeAt(i);
      h = h | 0;
    }
    return JumpHash.hash(h >>> 0, numBuckets);
  }

  static distribution(keys: string[], numBuckets: number): number[] {
    const counts = new Array(numBuckets).fill(0);
    for (const key of keys) {
      const bucket = JumpHash.hashString(key, numBuckets);
      counts[bucket]++;
    }
    return counts;
  }

  static monotonicity(key: string, oldBuckets: number, newBuckets: number): boolean {
    if (newBuckets <= oldBuckets) return true;
    const oldBucket = JumpHash.hashString(key, oldBuckets);
    const newBucket = JumpHash.hashString(key, newBuckets);
    return newBucket === oldBucket || newBucket >= oldBuckets;
  }

  static balanceScore(counts: number[]): number {
    const total = counts.reduce((a, b) => a + b, 0);
    if (total === 0) return 1;
    const expected = total / counts.length;
    let maxDev = 0;
    for (const c of counts) {
      const dev = Math.abs(c - expected) / expected;
      if (dev > maxDev) maxDev = dev;
    }
    return Math.round((1 - maxDev) * 10000) / 10000;
  }
}
