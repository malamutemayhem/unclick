export interface LogEntry {
  ip: string;
  method: string;
  path: string;
  status: number;
  bytes: number;
  timestamp: number;
  userAgent?: string;
  referer?: string;
}

export class AccessLogAnalyzer {
  private entries: LogEntry[] = [];

  add(entry: LogEntry): void {
    this.entries.push(entry);
  }

  parse(line: string): LogEntry | null {
    const match = line.match(
      /^(\S+)\s+\S+\s+\S+\s+\[([^\]]+)\]\s+"(\S+)\s+(\S+)\s+\S+"\s+(\d+)\s+(\d+)/
    );
    if (!match) return null;
    return {
      ip: match[1],
      method: match[3],
      path: match[4],
      status: parseInt(match[5], 10),
      bytes: parseInt(match[6], 10),
      timestamp: new Date(match[2].replace(/\//g, "-").replace(":", " ", )).getTime() || Date.now(),
    };
  }

  topPaths(n = 10): Array<{ path: string; count: number }> {
    const counts = new Map<string, number>();
    for (const entry of this.entries) {
      counts.set(entry.path, (counts.get(entry.path) ?? 0) + 1);
    }
    return [...counts.entries()]
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, n);
  }

  topIPs(n = 10): Array<{ ip: string; count: number }> {
    const counts = new Map<string, number>();
    for (const entry of this.entries) {
      counts.set(entry.ip, (counts.get(entry.ip) ?? 0) + 1);
    }
    return [...counts.entries()]
      .map(([ip, count]) => ({ ip, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, n);
  }

  statusDistribution(): Map<number, number> {
    const dist = new Map<number, number>();
    for (const entry of this.entries) {
      dist.set(entry.status, (dist.get(entry.status) ?? 0) + 1);
    }
    return dist;
  }

  errorRate(): number {
    if (this.entries.length === 0) return 0;
    const errors = this.entries.filter((e) => e.status >= 400).length;
    return errors / this.entries.length;
  }

  totalBytes(): number {
    return this.entries.reduce((sum, e) => sum + e.bytes, 0);
  }

  requestsPerSecond(windowMs = 1000): number {
    if (this.entries.length < 2) return 0;
    const sorted = [...this.entries].sort((a, b) => a.timestamp - b.timestamp);
    const duration = sorted[sorted.length - 1].timestamp - sorted[0].timestamp;
    if (duration === 0) return this.entries.length;
    return (this.entries.length / duration) * windowMs;
  }

  filter(predicate: (entry: LogEntry) => boolean): LogEntry[] {
    return this.entries.filter(predicate);
  }

  methodDistribution(): Map<string, number> {
    const dist = new Map<string, number>();
    for (const entry of this.entries) {
      dist.set(entry.method, (dist.get(entry.method) ?? 0) + 1);
    }
    return dist;
  }

  uniqueIPs(): number {
    return new Set(this.entries.map((e) => e.ip)).size;
  }

  count(): number {
    return this.entries.length;
  }
}
