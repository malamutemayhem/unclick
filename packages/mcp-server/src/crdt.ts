export interface GCounter {
  readonly id: string;
  readonly counts: Map<string, number>;
}

export function createGCounter(id: string): GCounter {
  return { id, counts: new Map() };
}

export function gIncrement(counter: GCounter, amount = 1): GCounter {
  const counts = new Map(counter.counts);
  counts.set(counter.id, (counts.get(counter.id) ?? 0) + amount);
  return { ...counter, counts };
}

export function gValue(counter: GCounter): number {
  let sum = 0;
  for (const v of counter.counts.values()) sum += v;
  return sum;
}

export function gMerge(a: GCounter, b: GCounter): GCounter {
  const counts = new Map(a.counts);
  for (const [k, v] of b.counts) {
    counts.set(k, Math.max(counts.get(k) ?? 0, v));
  }
  return { ...a, counts };
}

export interface PNCounter {
  readonly id: string;
  readonly pos: GCounter;
  readonly neg: GCounter;
}

export function createPNCounter(id: string): PNCounter {
  return { id, pos: createGCounter(id), neg: createGCounter(id) };
}

export function pnIncrement(counter: PNCounter, amount = 1): PNCounter {
  return { ...counter, pos: gIncrement(counter.pos, amount) };
}

export function pnDecrement(counter: PNCounter, amount = 1): PNCounter {
  return { ...counter, neg: gIncrement(counter.neg, amount) };
}

export function pnValue(counter: PNCounter): number {
  return gValue(counter.pos) - gValue(counter.neg);
}

export function pnMerge(a: PNCounter, b: PNCounter): PNCounter {
  return {
    id: a.id,
    pos: gMerge(a.pos, b.pos),
    neg: gMerge(a.neg, b.neg),
  };
}

export interface GSet<T> {
  readonly items: Set<T>;
}

export function createGSet<T>(): GSet<T> {
  return { items: new Set() };
}

export function gSetAdd<T>(set: GSet<T>, item: T): GSet<T> {
  const items = new Set(set.items);
  items.add(item);
  return { items };
}

export function gSetHas<T>(set: GSet<T>, item: T): boolean {
  return set.items.has(item);
}

export function gSetMerge<T>(a: GSet<T>, b: GSet<T>): GSet<T> {
  const items = new Set(a.items);
  for (const v of b.items) items.add(v);
  return { items };
}

export interface LWWRegister<T> {
  readonly value: T;
  readonly timestamp: number;
}

export function createLWWRegister<T>(value: T, timestamp = 0): LWWRegister<T> {
  return { value, timestamp };
}

export function lwwSet<T>(reg: LWWRegister<T>, value: T, timestamp: number): LWWRegister<T> {
  if (timestamp > reg.timestamp) {
    return { value, timestamp };
  }
  return reg;
}

export function lwwMerge<T>(a: LWWRegister<T>, b: LWWRegister<T>): LWWRegister<T> {
  return b.timestamp > a.timestamp ? b : a;
}

export interface LWWMap<K, V> {
  readonly entries: Map<K, LWWRegister<V>>;
}

export function createLWWMap<K, V>(): LWWMap<K, V> {
  return { entries: new Map() };
}

export function lwwMapSet<K, V>(map: LWWMap<K, V>, key: K, value: V, timestamp: number): LWWMap<K, V> {
  const entries = new Map(map.entries);
  const existing = entries.get(key);
  if (!existing || timestamp > existing.timestamp) {
    entries.set(key, { value, timestamp });
  }
  return { entries };
}

export function lwwMapGet<K, V>(map: LWWMap<K, V>, key: K): V | undefined {
  return map.entries.get(key)?.value;
}

export function lwwMapMerge<K, V>(a: LWWMap<K, V>, b: LWWMap<K, V>): LWWMap<K, V> {
  const entries = new Map(a.entries);
  for (const [k, reg] of b.entries) {
    const existing = entries.get(k);
    if (!existing || reg.timestamp > existing.timestamp) {
      entries.set(k, reg);
    }
  }
  return { entries };
}
