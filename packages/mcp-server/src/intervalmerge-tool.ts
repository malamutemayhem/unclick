import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function intervalMerge(args: Record<string, unknown>) {
  const intervals = args.intervals as [number, number][];
  if (!Array.isArray(intervals) || intervals.length === 0) {
    throw new Error("intervals must be a non-empty array of [start, end] pairs");
  }
  if (intervals.length > 100_000) {
    throw new Error("intervals length must be at most 100,000");
  }

  for (const [a, b] of intervals) {
    if (typeof a !== "number" || typeof b !== "number") {
      throw new Error("all interval endpoints must be numbers");
    }
    if (a > b) {
      throw new Error(`interval [${a},${b}] has start > end`);
    }
  }

  const sorted = [...intervals].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const merged: [number, number][] = [];
  let [curStart, curEnd] = sorted[0];

  for (let i = 1; i < sorted.length; i++) {
    const [s, e] = sorted[i];
    if (s <= curEnd) {
      curEnd = Math.max(curEnd, e);
    } else {
      merged.push([curStart, curEnd]);
      curStart = s;
      curEnd = e;
    }
  }
  merged.push([curStart, curEnd]);

  const gaps: [number, number][] = [];
  for (let i = 1; i < merged.length; i++) {
    gaps.push([merged[i - 1][1], merged[i][0]]);
  }

  const totalCoverage = merged.reduce((sum, [a, b]) => sum + (b - a), 0);

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use interval merging for scheduling, range consolidation, and sweep line problems"],
  };

  return stampMeta(
    {
      input_count: intervals.length,
      merged_count: merged.length,
      merged_intervals: merged,
      gaps,
      total_coverage: totalCoverage,
      overall_span: merged.length > 0 ? [merged[0][0], merged[merged.length - 1][1]] : null,
    },
    meta,
  );
}
