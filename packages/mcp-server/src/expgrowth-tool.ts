import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function exponentialGrowth(args: Record<string, unknown>) {
  const initial = typeof args.initial === "number" ? args.initial : NaN;
  const rate = typeof args.rate === "number" ? args.rate : NaN;
  const time = typeof args.time === "number" ? args.time : NaN;
  if (isNaN(initial) || isNaN(rate) || isNaN(time)) return { error: "initial, rate, and time are required (numbers)" };

  const final = initial * Math.exp(rate * time);
  const doublingTime = rate > 0 ? Math.log(2) / rate : rate < 0 ? NaN : Infinity;
  const halfLife = rate < 0 ? Math.log(2) / Math.abs(rate) : rate > 0 ? NaN : Infinity;

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Positive rate = growth; negative rate = decay", "Doubling time = ln(2) / rate"],
  };
  const result: Record<string, unknown> = {
    initial, rate, time,
    final: +final.toFixed(8),
    growth_factor: +Math.exp(rate * time).toFixed(8),
    is_growth: rate > 0,
  };
  if (!isNaN(doublingTime) && isFinite(doublingTime)) result.doubling_time = +doublingTime.toFixed(8);
  if (!isNaN(halfLife) && isFinite(halfLife)) result.half_life = +halfLife.toFixed(8);
  return stampMeta(result, meta);
}
