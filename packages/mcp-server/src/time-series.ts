export interface DataPoint {
  timestamp: number;
  value: number;
}

export class TimeSeries {
  private points: DataPoint[] = [];
  private maxAge?: number;

  constructor(maxAge?: number) {
    this.maxAge = maxAge;
  }

  add(value: number, timestamp?: number): void {
    const ts = timestamp ?? Date.now();
    this.points.push({ timestamp: ts, value });
    this.points.sort((a, b) => a.timestamp - b.timestamp);
    if (this.maxAge) this.prune(ts);
  }

  private prune(now: number): void {
    const cutoff = now - this.maxAge!;
    while (this.points.length > 0 && this.points[0].timestamp < cutoff) {
      this.points.shift();
    }
  }

  range(from: number, to: number): DataPoint[] {
    return this.points.filter((p) => p.timestamp >= from && p.timestamp <= to);
  }

  latest(n = 1): DataPoint[] {
    return this.points.slice(-n);
  }

  average(from?: number, to?: number): number {
    const pts = from !== undefined && to !== undefined ? this.range(from, to) : this.points;
    if (pts.length === 0) return 0;
    return pts.reduce((s, p) => s + p.value, 0) / pts.length;
  }

  min(): DataPoint | undefined {
    if (this.points.length === 0) return undefined;
    return this.points.reduce((m, p) => (p.value < m.value ? p : m));
  }

  max(): DataPoint | undefined {
    if (this.points.length === 0) return undefined;
    return this.points.reduce((m, p) => (p.value > m.value ? p : m));
  }

  sum(from?: number, to?: number): number {
    const pts = from !== undefined && to !== undefined ? this.range(from, to) : this.points;
    return pts.reduce((s, p) => s + p.value, 0);
  }

  rateOfChange(): number {
    if (this.points.length < 2) return 0;
    const first = this.points[0];
    const last = this.points[this.points.length - 1];
    const timeDelta = last.timestamp - first.timestamp;
    if (timeDelta === 0) return 0;
    return (last.value - first.value) / timeDelta;
  }

  downsample(bucketMs: number): DataPoint[] {
    if (this.points.length === 0) return [];
    const buckets = new Map<number, DataPoint[]>();
    for (const p of this.points) {
      const key = Math.floor(p.timestamp / bucketMs) * bucketMs;
      if (!buckets.has(key)) buckets.set(key, []);
      buckets.get(key)!.push(p);
    }
    return [...buckets.entries()]
      .sort(([a], [b]) => a - b)
      .map(([ts, pts]) => ({
        timestamp: ts,
        value: pts.reduce((s, p) => s + p.value, 0) / pts.length,
      }));
  }

  get size(): number {
    return this.points.length;
  }

  clear(): void {
    this.points.length = 0;
  }
}
