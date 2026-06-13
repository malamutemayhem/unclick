import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function runningStats(args: Record<string, unknown>) {
  const data = args.data as number[];
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("data must be a non-empty array of numbers.");
  }
  if (data.length > 100000) throw new Error("data must have 100000 elements or fewer.");

  const windowSize = Math.max(1, Math.floor(Number(args.window ?? 5)));
  if (windowSize > data.length) throw new Error("window must not exceed data length.");

  const means: number[] = [];
  const stds: number[] = [];
  const mins: number[] = [];
  const maxs: number[] = [];

  for (let i = 0; i <= data.length - windowSize; i++) {
    const win = data.slice(i, i + windowSize);
    const mean = win.reduce((s, v) => s + v, 0) / windowSize;
    const variance = win.reduce((s, v) => s + (v - mean) ** 2, 0) / windowSize;
    const std = Math.sqrt(variance);
    means.push(Math.round(mean * 1e8) / 1e8);
    stds.push(Math.round(std * 1e8) / 1e8);
    mins.push(Math.min(...win));
    maxs.push(Math.max(...win));
  }

  const globalMean = data.reduce((s, v) => s + v, 0) / data.length;
  const globalVar = data.reduce((s, v) => s + (v - globalMean) ** 2, 0) / data.length;

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Increase window size for smoother averages", "Compare running std to detect volatility changes"],
  };
  return stampMeta({
    data_length: data.length,
    window_size: windowSize,
    output_length: means.length,
    global_mean: Math.round(globalMean * 1e8) / 1e8,
    global_std: Math.round(Math.sqrt(globalVar) * 1e8) / 1e8,
    running_means: means,
    running_stds: stds,
    running_mins: mins,
    running_maxs: maxs,
  }, meta);
}
