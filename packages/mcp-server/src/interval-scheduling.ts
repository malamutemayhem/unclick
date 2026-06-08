export interface Interval {
  start: number;
  end: number;
  id?: string;
  weight?: number;
}

export function maxNonOverlapping(intervals: Interval[]): Interval[] {
  if (intervals.length === 0) return [];
  const sorted = [...intervals].sort((a, b) => a.end - b.end);
  const result: Interval[] = [sorted[0]];
  let lastEnd = sorted[0].end;

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i].start >= lastEnd) {
      result.push(sorted[i]);
      lastEnd = sorted[i].end;
    }
  }

  return result;
}

export function maxWeightedSchedule(intervals: Interval[]): {
  intervals: Interval[];
  totalWeight: number;
} {
  if (intervals.length === 0) return { intervals: [], totalWeight: 0 };
  const sorted = [...intervals].sort((a, b) => a.end - b.end);

  const n = sorted.length;
  const dp = new Array<number>(n);
  const prev = new Array<number>(n).fill(-1);

  for (let i = 0; i < n; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (sorted[j].end <= sorted[i].start) {
        prev[i] = j;
        break;
      }
    }
  }

  dp[0] = sorted[0].weight ?? 1;
  for (let i = 1; i < n; i++) {
    const include = (sorted[i].weight ?? 1) + (prev[i] >= 0 ? dp[prev[i]] : 0);
    const exclude = dp[i - 1];
    dp[i] = Math.max(include, exclude);
  }

  const result: Interval[] = [];
  let i = n - 1;
  while (i >= 0) {
    const include = (sorted[i].weight ?? 1) + (prev[i] >= 0 ? dp[prev[i]] : 0);
    if (i === 0 || include >= dp[i - 1]) {
      result.push(sorted[i]);
      i = prev[i];
    } else {
      i--;
    }
  }

  result.reverse();
  return { intervals: result, totalWeight: dp[n - 1] };
}

export function findOverlaps(intervals: Interval[]): [Interval, Interval][] {
  const events: { time: number; type: "start" | "end"; interval: Interval }[] = [];
  for (const iv of intervals) {
    events.push({ time: iv.start, type: "start", interval: iv });
    events.push({ time: iv.end, type: "end", interval: iv });
  }
  events.sort((a, b) => a.time - b.time || (a.type === "end" ? -1 : 1));

  const active = new Set<Interval>();
  const overlaps: [Interval, Interval][] = [];

  for (const event of events) {
    if (event.type === "start") {
      for (const other of active) {
        overlaps.push([other, event.interval]);
      }
      active.add(event.interval);
    } else {
      active.delete(event.interval);
    }
  }

  return overlaps;
}

export function mergeIntervals(intervals: Interval[]): Interval[] {
  if (intervals.length === 0) return [];
  const sorted = [...intervals].sort((a, b) => a.start - b.start);
  const result: Interval[] = [{ ...sorted[0] }];

  for (let i = 1; i < sorted.length; i++) {
    const last = result[result.length - 1];
    if (sorted[i].start <= last.end) {
      last.end = Math.max(last.end, sorted[i].end);
    } else {
      result.push({ ...sorted[i] });
    }
  }

  return result;
}

export function maxConcurrent(intervals: Interval[]): {
  maxCount: number;
  time: number;
} {
  const events: { time: number; delta: number }[] = [];
  for (const iv of intervals) {
    events.push({ time: iv.start, delta: 1 });
    events.push({ time: iv.end, delta: -1 });
  }
  events.sort((a, b) => a.time - b.time || a.delta - b.delta);

  let current = 0;
  let maxCount = 0;
  let maxTime = 0;

  for (const { time, delta } of events) {
    current += delta;
    if (current > maxCount) {
      maxCount = current;
      maxTime = time;
    }
  }

  return { maxCount, time: maxTime };
}
