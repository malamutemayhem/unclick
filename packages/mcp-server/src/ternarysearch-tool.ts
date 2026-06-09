import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function ternarySearch(args: Record<string, unknown>) {
  const arr = args.array as number[];
  const target = Number(args.target);
  const mode = String(args.mode ?? "search");

  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error("array must be a non-empty array of numbers");
  }
  if (arr.length > 100_000) {
    throw new Error("array length must be at most 100,000");
  }

  if (mode === "search") {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < arr[i - 1]) {
        throw new Error("array must be sorted for search mode");
      }
    }

    let lo = 0;
    let hi = arr.length - 1;
    let comparisons = 0;

    while (lo <= hi) {
      const mid1 = lo + Math.floor((hi - lo) / 3);
      const mid2 = hi - Math.floor((hi - lo) / 3);
      comparisons++;

      if (arr[mid1] === target) {
        const meta: ConnectorMeta = {
          source: "local-computation",
          fetched_at: new Date().toISOString(),
          next_steps: ["Use ternary search for unimodal function optimization or sorted array search"],
        };
        return stampMeta({ found: true, index: mid1, value: arr[mid1], comparisons, mode }, meta);
      }
      if (arr[mid2] === target) {
        const meta: ConnectorMeta = {
          source: "local-computation",
          fetched_at: new Date().toISOString(),
          next_steps: ["Use ternary search for unimodal function optimization or sorted array search"],
        };
        return stampMeta({ found: true, index: mid2, value: arr[mid2], comparisons, mode }, meta);
      }

      if (target < arr[mid1]) {
        hi = mid1 - 1;
      } else if (target > arr[mid2]) {
        lo = mid2 + 1;
      } else {
        lo = mid1 + 1;
        hi = mid2 - 1;
      }
    }

    const meta: ConnectorMeta = {
      source: "local-computation",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use ternary search for unimodal function optimization or sorted array search"],
    };
    return stampMeta({ found: false, comparisons, mode }, meta);
  }

  if (mode === "max" || mode === "min") {
    let lo = 0;
    let hi = arr.length - 1;
    let iterations = 0;

    while (hi - lo > 2) {
      iterations++;
      const mid1 = lo + Math.floor((hi - lo) / 3);
      const mid2 = hi - Math.floor((hi - lo) / 3);
      if (mode === "max") {
        if (arr[mid1] < arr[mid2]) lo = mid1 + 1;
        else hi = mid2 - 1;
      } else {
        if (arr[mid1] > arr[mid2]) lo = mid1 + 1;
        else hi = mid2 - 1;
      }
    }

    let bestIdx = lo;
    for (let i = lo + 1; i <= hi; i++) {
      if (mode === "max" && arr[i] > arr[bestIdx]) bestIdx = i;
      if (mode === "min" && arr[i] < arr[bestIdx]) bestIdx = i;
    }

    const meta: ConnectorMeta = {
      source: "local-computation",
      fetched_at: new Date().toISOString(),
      next_steps: ["Use ternary search for unimodal function optimization or sorted array search"],
    };
    return stampMeta({ index: bestIdx, value: arr[bestIdx], iterations, mode }, meta);
  }

  throw new Error("mode must be 'search', 'max', or 'min'");
}
