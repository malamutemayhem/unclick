// Log-once pattern.
// Prevents the same warning or error message from flooding logs.
// First occurrence gets logged, subsequent ones are silently counted.

export interface LogOnceEntry {
  message: string;
  count: number;
  firstSeen: number;
  lastSeen: number;
}

export class LogOnce {
  private seen = new Map<string, LogOnceEntry>();
  private readonly logger: (message: string) => void;

  constructor(logger: (message: string) => void = console.warn) {
    this.logger = logger;
  }

  warn(key: string, message?: string): boolean {
    const msg = message ?? key;
    const existing = this.seen.get(key);

    if (existing) {
      existing.count++;
      existing.lastSeen = Date.now();
      return false;
    }

    this.seen.set(key, {
      message: msg,
      count: 1,
      firstSeen: Date.now(),
      lastSeen: Date.now(),
    });
    this.logger(msg);
    return true;
  }

  hasSeen(key: string): boolean {
    return this.seen.has(key);
  }

  getCount(key: string): number {
    return this.seen.get(key)?.count ?? 0;
  }

  getSuppressedCounts(): Array<{ key: string; count: number }> {
    const result: Array<{ key: string; count: number }> = [];
    for (const [key, entry] of this.seen) {
      if (entry.count > 1) {
        result.push({ key, count: entry.count - 1 });
      }
    }
    return result;
  }

  reset(key?: string): void {
    if (key) {
      this.seen.delete(key);
    } else {
      this.seen.clear();
    }
  }

  flush(): string[] {
    const summaries: string[] = [];
    for (const [key, entry] of this.seen) {
      if (entry.count > 1) {
        summaries.push(`"${key}" repeated ${entry.count - 1} more time(s)`);
      }
    }
    this.seen.clear();
    return summaries;
  }
}
