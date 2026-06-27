export interface Range {
  start: number;
  end: number;
}

export class RangeSet {
  private ranges: Range[] = [];

  get size(): number {
    return this.ranges.length;
  }

  add(start: number, end: number): void {
    if (start >= end) return;
    const newRanges: Range[] = [];
    let merged = { start, end };
    let inserted = false;

    for (const r of this.ranges) {
      if (r.end < merged.start) {
        newRanges.push(r);
      } else if (r.start > merged.end) {
        if (!inserted) {
          newRanges.push(merged);
          inserted = true;
        }
        newRanges.push(r);
      } else {
        merged = {
          start: Math.min(merged.start, r.start),
          end: Math.max(merged.end, r.end),
        };
      }
    }
    if (!inserted) newRanges.push(merged);
    this.ranges = newRanges;
  }

  remove(start: number, end: number): void {
    if (start >= end) return;
    const newRanges: Range[] = [];
    for (const r of this.ranges) {
      if (r.end <= start || r.start >= end) {
        newRanges.push(r);
      } else {
        if (r.start < start) newRanges.push({ start: r.start, end: start });
        if (r.end > end) newRanges.push({ start: end, end: r.end });
      }
    }
    this.ranges = newRanges;
  }

  contains(value: number): boolean {
    for (const r of this.ranges) {
      if (value >= r.start && value < r.end) return true;
      if (r.start > value) break;
    }
    return false;
  }

  overlaps(start: number, end: number): boolean {
    for (const r of this.ranges) {
      if (r.start < end && r.end > start) return true;
      if (r.start >= end) break;
    }
    return false;
  }

  toArray(): Range[] {
    return this.ranges.map((r) => ({ ...r }));
  }

  totalLength(): number {
    return this.ranges.reduce((sum, r) => sum + (r.end - r.start), 0);
  }

  clear(): void {
    this.ranges = [];
  }
}
