export interface VersionEntry<V> {
  value: V;
  version: number;
  timestamp: number;
  deleted: boolean;
}

export class VersionedMap<K, V> {
  private data = new Map<K, VersionEntry<V>[]>();
  private currentVersion = 0;
  private clock = 0;

  set(key: K, value: V): number {
    const version = ++this.currentVersion;
    const entries = this.data.get(key) ?? [];
    entries.push({ value, version, timestamp: this.clock++, deleted: false });
    this.data.set(key, entries);
    return version;
  }

  get(key: K): V | undefined {
    const entries = this.data.get(key);
    if (!entries || entries.length === 0) return undefined;
    const latest = entries[entries.length - 1];
    if (latest.deleted) return undefined;
    return latest.value;
  }

  getAt(key: K, version: number): V | undefined {
    const entries = this.data.get(key);
    if (!entries) return undefined;
    let result: VersionEntry<V> | undefined;
    for (const entry of entries) {
      if (entry.version <= version) result = entry;
    }
    if (!result || result.deleted) return undefined;
    return result.value;
  }

  delete(key: K): boolean {
    const entries = this.data.get(key);
    if (!entries || entries.length === 0) return false;
    const latest = entries[entries.length - 1];
    if (latest.deleted) return false;
    const version = ++this.currentVersion;
    entries.push({ value: latest.value, version, timestamp: this.clock++, deleted: true });
    return true;
  }

  has(key: K): boolean {
    return this.get(key) !== undefined;
  }

  history(key: K): VersionEntry<V>[] {
    return [...(this.data.get(key) ?? [])];
  }

  version(): number {
    return this.currentVersion;
  }

  snapshot(version: number): Map<K, V> {
    const result = new Map<K, V>();
    for (const [key, entries] of this.data) {
      let latest: VersionEntry<V> | undefined;
      for (const entry of entries) {
        if (entry.version <= version) latest = entry;
      }
      if (latest && !latest.deleted) {
        result.set(key, latest.value);
      }
    }
    return result;
  }

  keys(): K[] {
    const result: K[] = [];
    for (const [key, entries] of this.data) {
      const latest = entries[entries.length - 1];
      if (!latest.deleted) result.push(key);
    }
    return result;
  }

  size(): number {
    return this.keys().length;
  }

  totalVersions(): number {
    let count = 0;
    for (const entries of this.data.values()) {
      count += entries.length;
    }
    return count;
  }

  rollback(key: K, version: number): boolean {
    const entries = this.data.get(key);
    if (!entries) return false;
    let target: VersionEntry<V> | undefined;
    for (const entry of entries) {
      if (entry.version <= version) target = entry;
    }
    if (!target || target.deleted) return false;
    this.set(key, target.value);
    return true;
  }
}
