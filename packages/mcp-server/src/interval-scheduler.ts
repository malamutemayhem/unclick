export interface TimeInterval {
  start: number;
  end: number;
  id?: string;
}

export class IntervalScheduler {
  static overlaps(a: TimeInterval, b: TimeInterval): boolean {
    return a.start < b.end && b.start < a.end;
  }

  static merge(intervals: TimeInterval[]): TimeInterval[] {
    if (intervals.length === 0) return [];
    const sorted = [...intervals].sort((a, b) => a.start - b.start);
    const merged: TimeInterval[] = [{ ...sorted[0] }];

    for (let i = 1; i < sorted.length; i++) {
      const last = merged[merged.length - 1];
      if (sorted[i].start <= last.end) {
        last.end = Math.max(last.end, sorted[i].end);
      } else {
        merged.push({ ...sorted[i] });
      }
    }
    return merged;
  }

  static gaps(intervals: TimeInterval[], rangeStart: number, rangeEnd: number): TimeInterval[] {
    const merged = IntervalScheduler.merge(intervals);
    const result: TimeInterval[] = [];
    let pos = rangeStart;

    for (const interval of merged) {
      if (interval.start > pos) {
        result.push({ start: pos, end: Math.min(interval.start, rangeEnd) });
      }
      pos = Math.max(pos, interval.end);
    }
    if (pos < rangeEnd) {
      result.push({ start: pos, end: rangeEnd });
    }
    return result;
  }

  static findConflicts(intervals: TimeInterval[]): [number, number][] {
    const conflicts: [number, number][] = [];
    for (let i = 0; i < intervals.length; i++) {
      for (let j = i + 1; j < intervals.length; j++) {
        if (IntervalScheduler.overlaps(intervals[i], intervals[j])) {
          conflicts.push([i, j]);
        }
      }
    }
    return conflicts;
  }

  static greedySchedule(intervals: TimeInterval[]): TimeInterval[] {
    const sorted = [...intervals].sort((a, b) => a.end - b.end);
    const selected: TimeInterval[] = [];
    let lastEnd = -Infinity;

    for (const interval of sorted) {
      if (interval.start >= lastEnd) {
        selected.push(interval);
        lastEnd = interval.end;
      }
    }
    return selected;
  }

  static totalDuration(intervals: TimeInterval[]): number {
    const merged = IntervalScheduler.merge(intervals);
    return merged.reduce((sum, i) => sum + (i.end - i.start), 0);
  }

  static contains(interval: TimeInterval, point: number): boolean {
    return point >= interval.start && point < interval.end;
  }

  static intersection(a: TimeInterval, b: TimeInterval): TimeInterval | null {
    const start = Math.max(a.start, b.start);
    const end = Math.min(a.end, b.end);
    if (start >= end) return null;
    return { start, end };
  }

  static split(interval: TimeInterval, point: number): TimeInterval[] {
    if (point <= interval.start || point >= interval.end) return [interval];
    return [
      { start: interval.start, end: point },
      { start: point, end: interval.end },
    ];
  }
}
