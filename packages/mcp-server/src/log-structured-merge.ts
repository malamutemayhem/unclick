export interface LSMEntry {
  key: string;
  value: string | null;
  timestamp: number;
}

export class MemTable {
  private entries = new Map<string, LSMEntry>();
  private maxSize: number;

  constructor(maxSize = 100) {
    this.maxSize = maxSize;
  }

  put(key: string, value: string, timestamp: number): boolean {
    this.entries.set(key, { key, value, timestamp });
    return this.entries.size >= this.maxSize;
  }

  delete(key: string, timestamp: number): void {
    this.entries.set(key, { key, value: null, timestamp });
  }

  get(key: string): LSMEntry | undefined {
    return this.entries.get(key);
  }

  size(): number {
    return this.entries.size;
  }

  isFull(): boolean {
    return this.entries.size >= this.maxSize;
  }

  flush(): LSMEntry[] {
    const sorted = [...this.entries.values()].sort((a, b) => a.key.localeCompare(b.key));
    this.entries.clear();
    return sorted;
  }
}

export class SSTable {
  private entries: LSMEntry[];
  readonly level: number;
  readonly id: number;

  constructor(entries: LSMEntry[], level: number, id: number) {
    this.entries = entries;
    this.level = level;
    this.id = id;
  }

  get(key: string): LSMEntry | undefined {
    let lo = 0;
    let hi = this.entries.length - 1;
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      const cmp = this.entries[mid].key.localeCompare(key);
      if (cmp === 0) return this.entries[mid];
      if (cmp < 0) lo = mid + 1;
      else hi = mid - 1;
    }
    return undefined;
  }

  allEntries(): LSMEntry[] {
    return [...this.entries];
  }

  size(): number {
    return this.entries.length;
  }

  minKey(): string {
    return this.entries[0]?.key ?? "";
  }

  maxKey(): string {
    return this.entries[this.entries.length - 1]?.key ?? "";
  }
}

export class LSMTree {
  private memtable: MemTable;
  private sstables: SSTable[] = [];
  private clock = 0;
  private nextId = 0;
  private levelThreshold: number;

  constructor(memtableSize = 10, levelThreshold = 4) {
    this.memtable = new MemTable(memtableSize);
    this.levelThreshold = levelThreshold;
  }

  put(key: string, value: string): void {
    this.clock++;
    const shouldFlush = this.memtable.put(key, value, this.clock);
    if (shouldFlush) this.flushMemtable();
  }

  delete(key: string): void {
    this.clock++;
    this.memtable.delete(key, this.clock);
  }

  get(key: string): string | null {
    const memEntry = this.memtable.get(key);
    if (memEntry) return memEntry.value;

    const sorted = [...this.sstables].sort((a, b) => b.id - a.id);
    for (const table of sorted) {
      const entry = table.get(key);
      if (entry) return entry.value;
    }

    return null;
  }

  private flushMemtable(): void {
    const entries = this.memtable.flush();
    if (entries.length === 0) return;
    this.sstables.push(new SSTable(entries, 0, this.nextId++));
    this.maybeCompact();
  }

  private maybeCompact(): void {
    const levels = new Map<number, SSTable[]>();
    for (const t of this.sstables) {
      if (!levels.has(t.level)) levels.set(t.level, []);
      levels.get(t.level)!.push(t);
    }

    for (const [level, tables] of levels) {
      if (tables.length >= this.levelThreshold) {
        this.compact(level, tables);
        return;
      }
    }
  }

  private compact(level: number, tables: SSTable[]): void {
    const merged = new Map<string, LSMEntry>();
    const sorted = tables.sort((a, b) => a.id - b.id);
    for (const table of sorted) {
      for (const entry of table.allEntries()) {
        const existing = merged.get(entry.key);
        if (!existing || entry.timestamp > existing.timestamp) {
          merged.set(entry.key, entry);
        }
      }
    }

    const entries = [...merged.values()]
      .filter((e) => e.value !== null)
      .sort((a, b) => a.key.localeCompare(b.key));

    this.sstables = this.sstables.filter((t) => !tables.includes(t));
    if (entries.length > 0) {
      this.sstables.push(new SSTable(entries, level + 1, this.nextId++));
    }
  }

  tableCount(): number {
    return this.sstables.length;
  }

  memtableSize(): number {
    return this.memtable.size();
  }

  stats(): { memtableSize: number; sstableCount: number; levels: number[] } {
    const levels = [...new Set(this.sstables.map((t) => t.level))].sort();
    return { memtableSize: this.memtable.size(), sstableCount: this.sstables.length, levels };
  }
}
