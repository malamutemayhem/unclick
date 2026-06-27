export class CuckooFilter {
  private buckets: (string | null)[][];
  private bucketSize: number;
  private numBuckets: number;
  private count: number;
  private maxKicks: number;

  constructor(capacity: number, bucketSize = 4, maxKicks = 500) {
    this.numBuckets = Math.max(1, Math.ceil(capacity / bucketSize));
    this.bucketSize = bucketSize;
    this.maxKicks = maxKicks;
    this.count = 0;
    this.buckets = Array.from({ length: this.numBuckets }, () =>
      new Array(bucketSize).fill(null)
    );
  }

  private hash(value: string): number {
    let h = 0;
    for (let i = 0; i < value.length; i++) {
      h = ((h << 5) - h + value.charCodeAt(i)) | 0;
    }
    return Math.abs(h);
  }

  private fingerprint(item: string): string {
    const h = this.hash(item + "_fp");
    return h.toString(36).slice(0, 4) || "0";
  }

  private index1(item: string): number {
    return this.hash(item) % this.numBuckets;
  }

  private index2(i1: number, fp: string): number {
    return (i1 ^ this.hash(fp)) % this.numBuckets;
  }

  add(item: string): boolean {
    const fp = this.fingerprint(item);
    const i1 = this.index1(item);
    const i2 = this.index2(i1, fp);

    if (this.insertIntoBucket(i1, fp) || this.insertIntoBucket(i2, fp)) {
      this.count++;
      return true;
    }

    let idx = Math.random() < 0.5 ? i1 : i2;
    let currentFp = fp;

    for (let n = 0; n < this.maxKicks; n++) {
      const slot = Math.floor(Math.random() * this.bucketSize);
      const evicted = this.buckets[idx][slot]!;
      this.buckets[idx][slot] = currentFp;
      currentFp = evicted;
      idx = this.index2(idx, currentFp);

      if (this.insertIntoBucket(idx, currentFp)) {
        this.count++;
        return true;
      }
    }

    return false;
  }

  has(item: string): boolean {
    const fp = this.fingerprint(item);
    const i1 = this.index1(item);
    const i2 = this.index2(i1, fp);
    return this.bucketContains(i1, fp) || this.bucketContains(i2, fp);
  }

  delete(item: string): boolean {
    const fp = this.fingerprint(item);
    const i1 = this.index1(item);
    const i2 = this.index2(i1, fp);

    if (this.removeFromBucket(i1, fp) || this.removeFromBucket(i2, fp)) {
      this.count--;
      return true;
    }
    return false;
  }

  get size(): number { return this.count; }

  get loadFactor(): number {
    return this.count / (this.numBuckets * this.bucketSize);
  }

  private insertIntoBucket(idx: number, fp: string): boolean {
    const bucket = this.buckets[idx];
    for (let i = 0; i < this.bucketSize; i++) {
      if (bucket[i] === null) {
        bucket[i] = fp;
        return true;
      }
    }
    return false;
  }

  private bucketContains(idx: number, fp: string): boolean {
    return this.buckets[idx].some((s) => s === fp);
  }

  private removeFromBucket(idx: number, fp: string): boolean {
    const bucket = this.buckets[idx];
    for (let i = 0; i < this.bucketSize; i++) {
      if (bucket[i] === fp) {
        bucket[i] = null;
        return true;
      }
    }
    return false;
  }
}
