import { stampMeta } from "./connector-meta.js";

export async function statisticsCalc(args: Record<string, unknown>) {
  const raw = args.numbers;
  let numbers: number[];
  if (Array.isArray(raw)) {
    numbers = raw.map(Number).filter(n => !isNaN(n));
  } else if (typeof raw === "string") {
    numbers = String(raw).split(/[,\s]+/).map(Number).filter(n => !isNaN(n));
  } else {
    return { error: "numbers is required (array or comma-separated string)" };
  }
  if (numbers.length === 0) return { error: "At least one number is required" };
  const sorted = [...numbers].sort((a, b) => a - b);
  const count = numbers.length;
  const sum = numbers.reduce((a, b) => a + b, 0);
  const mean = sum / count;
  const median = count % 2 === 0
    ? (sorted[count / 2 - 1] + sorted[count / 2]) / 2
    : sorted[Math.floor(count / 2)];
  const freq: Record<number, number> = {};
  for (const n of numbers) freq[n] = (freq[n] || 0) + 1;
  const maxFreq = Math.max(...Object.values(freq));
  const modes = Object.entries(freq).filter(([, f]) => f === maxFreq).map(([n]) => Number(n));
  const mode = maxFreq > 1 ? modes : null;
  const variance = count > 1
    ? numbers.reduce((acc, n) => acc + (n - mean) ** 2, 0) / (count - 1)
    : 0;
  const stddev = Math.sqrt(variance);
  return stampMeta({
    count, sum: +sum.toFixed(6),
    mean: +mean.toFixed(6), median: +median.toFixed(6),
    mode,
    min: sorted[0], max: sorted[count - 1],
    range: +(sorted[count - 1] - sorted[0]).toFixed(6),
    variance: +variance.toFixed(6),
    standard_deviation: +stddev.toFixed(6),
  }, {
    source: "local statistics calculator",
    fetched_at: new Date().toISOString(),
    next_steps: ["pass numbers as array or comma-separated string", "mode is null when all values appear equally"],
  });
}
