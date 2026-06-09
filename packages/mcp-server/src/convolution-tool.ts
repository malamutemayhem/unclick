import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function convolution(args: Record<string, unknown>) {
  const a = args.signal as number[];
  const b = args.kernel as number[];
  if (!Array.isArray(a) || !Array.isArray(b) || a.length === 0 || b.length === 0) {
    throw new Error("signal and kernel must be non-empty arrays of numbers.");
  }
  if (a.length > 50000 || b.length > 50000) {
    throw new Error("Arrays must have 50000 elements or fewer.");
  }

  const mode = String(args.mode ?? "full").toLowerCase();
  if (!["full", "same", "valid"].includes(mode)) {
    throw new Error("mode must be full, same, or valid.");
  }

  const fullLen = a.length + b.length - 1;
  const full: number[] = new Array(fullLen).fill(0);
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
      full[i + j] += a[i] * b[j];
    }
  }

  for (let i = 0; i < full.length; i++) {
    full[i] = Math.round(full[i] * 1e10) / 1e10;
  }

  let result: number[];
  if (mode === "same") {
    const start = Math.floor((b.length - 1) / 2);
    result = full.slice(start, start + a.length);
  } else if (mode === "valid") {
    const validLen = Math.abs(a.length - b.length) + 1;
    const start = Math.min(a.length, b.length) - 1;
    result = full.slice(start, start + validLen);
  } else {
    result = full;
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "full mode returns a.length + b.length - 1 elements",
      "same mode returns a.length elements centered",
      "valid mode returns only fully overlapping elements",
    ],
  };
  return stampMeta({
    signal_length: a.length,
    kernel_length: b.length,
    mode,
    output_length: result.length,
    result,
  }, meta);
}
