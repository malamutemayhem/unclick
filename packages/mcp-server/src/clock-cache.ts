export class ClockCache<K, V> {
  private capacity: number;
  private entries: { key: K; value: V; refBit: boolean }[] = [];
  private keyIndex: Map<K, number> = new Map();
  private hand = 0;

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  get(key: K): V | undefined {
    const idx = this.keyIndex.get(key);
    if (idx === undefined) return undefined;
    this.entries[idx].refBit = true;
    return this.entries[idx].value;
  }

  put(key: K, value: V): void {
    const existing = this.keyIndex.get(key);
    if (existing !== undefined) {
      this.entries[existing].value = value;
      this.entries[existing].refBit = true;
      return;
    }

    if (this.entries.length < this.capacity) {
      this.keyIndex.set(key, this.entries.length);
      this.entries.push({ key, value, refBit: true });
      return;
    }

    while (this.entries[this.hand].refBit) {
      this.entries[this.hand].refBit = false;
      this.hand = (this.hand + 1) % this.capacity;
    }

    const evicted = this.entries[this.hand];
    this.keyIndex.delete(evicted.key);
    this.entries[this.hand] = { key, value, refBit: true };
    this.keyIndex.set(key, this.hand);
    this.hand = (this.hand + 1) % this.capacity;
  }

  has(key: K): boolean {
    return this.keyIndex.has(key);
  }

  size(): number {
    return this.entries.length;
  }

  clear(): void {
    this.entries = [];
    this.keyIndex.clear();
    this.hand = 0;
  }

  keys(): K[] {
    return this.entries.map((e) => e.key);
  }
}
