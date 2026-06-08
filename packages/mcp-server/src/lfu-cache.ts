interface LFUEntry<V> {
  value: V;
  freq: number;
}

export class LFUCache<K, V> {
  private cache = new Map<K, LFUEntry<V>>();
  private freqMap = new Map<number, Set<K>>();
  private minFreq = 0;
  private maxSize: number;

  constructor(maxSize: number) {
    if (maxSize < 1) throw new Error("Cache size must be at least 1");
    this.maxSize = maxSize;
  }

  get size(): number { return this.cache.size; }

  get(key: K): V | undefined {
    const entry = this.cache.get(key);
    if (!entry) return undefined;
    this.incrementFreq(key, entry);
    return entry.value;
  }

  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      const entry = this.cache.get(key)!;
      entry.value = value;
      this.incrementFreq(key, entry);
      return;
    }

    if (this.cache.size >= this.maxSize) {
      this.evict();
    }

    this.cache.set(key, { value, freq: 1 });
    if (!this.freqMap.has(1)) this.freqMap.set(1, new Set());
    this.freqMap.get(1)!.add(key);
    this.minFreq = 1;
  }

  has(key: K): boolean { return this.cache.has(key); }

  delete(key: K): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;
    this.cache.delete(key);
    const freqSet = this.freqMap.get(entry.freq);
    if (freqSet) {
      freqSet.delete(key);
      if (freqSet.size === 0) this.freqMap.delete(entry.freq);
    }
    return true;
  }

  clear(): void {
    this.cache.clear();
    this.freqMap.clear();
    this.minFreq = 0;
  }

  keys(): K[] { return [...this.cache.keys()]; }

  private incrementFreq(key: K, entry: LFUEntry<V>): void {
    const oldFreq = entry.freq;
    entry.freq++;

    const oldSet = this.freqMap.get(oldFreq);
    if (oldSet) {
      oldSet.delete(key);
      if (oldSet.size === 0) {
        this.freqMap.delete(oldFreq);
        if (this.minFreq === oldFreq) this.minFreq++;
      }
    }

    if (!this.freqMap.has(entry.freq)) this.freqMap.set(entry.freq, new Set());
    this.freqMap.get(entry.freq)!.add(key);
  }

  private evict(): void {
    const minSet = this.freqMap.get(this.minFreq);
    if (!minSet || minSet.size === 0) return;
    const evictKey = minSet.values().next().value!;
    minSet.delete(evictKey);
    if (minSet.size === 0) this.freqMap.delete(this.minFreq);
    this.cache.delete(evictKey);
  }
}
