import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function rleEncodeDecode(args: Record<string, unknown>) {
  const operation = String(args.operation ?? "encode").toLowerCase();
  if (!["encode", "decode"].includes(operation)) {
    throw new Error("operation must be encode or decode.");
  }

  if (operation === "encode") {
    const data = args.data as number[];
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("data must be a non-empty array for encoding.");
    }
    if (data.length > 100000) throw new Error("data must have 100000 elements or fewer.");

    const runs: { value: number; count: number }[] = [];
    let current = data[0];
    let count = 1;
    for (let i = 1; i < data.length; i++) {
      if (data[i] === current) {
        count++;
      } else {
        runs.push({ value: current, count });
        current = data[i];
        count = 1;
      }
    }
    runs.push({ value: current, count });

    const ratio = runs.length * 2 / data.length;

    const meta: ConnectorMeta = {
      source: "local-computation",
      fetched_at: new Date().toISOString(),
      next_steps: ["Ratio below 1 means RLE compressed effectively", "Works best with many consecutive repeats"],
    };
    return stampMeta({
      operation: "encode",
      input_length: data.length,
      run_count: runs.length,
      compression_ratio: Math.round(ratio * 1e6) / 1e6,
      runs,
    }, meta);
  }

  const runs = args.runs as { value: number; count: number }[];
  if (!Array.isArray(runs) || runs.length === 0) {
    throw new Error("runs must be a non-empty array of {value, count} for decoding.");
  }

  const data: number[] = [];
  for (const run of runs) {
    const v = Number(run.value);
    const c = Math.max(1, Math.floor(Number(run.count)));
    for (let i = 0; i < c; i++) data.push(v);
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Decoded data restores the original sequence"],
  };
  return stampMeta({
    operation: "decode",
    run_count: runs.length,
    output_length: data.length,
    data,
  }, meta);
}
