import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function logBase(args: Record<string, unknown>) {
  const value = typeof args.value === "number" ? args.value : NaN;
  const base = typeof args.base === "number" ? args.base : 10;
  if (isNaN(value) || value <= 0) return { error: "value is required (positive number)" };
  if (base <= 0 || base === 1) return { error: "base must be positive and not equal to 1" };

  const result = Math.log(value) / Math.log(base);
  const ln = Math.log(value);
  const log10 = Math.log10(value);
  const log2 = Math.log2(value);

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["log_b(x) = ln(x) / ln(b)", "Common bases: 2 (binary), e (natural), 10 (common)"],
  };
  return stampMeta({
    value,
    base,
    result: +result.toFixed(10),
    ln: +ln.toFixed(10),
    log10: +log10.toFixed(10),
    log2: +log2.toFixed(10),
    is_integer_result: Math.abs(result - Math.round(result)) < 1e-10,
  }, meta);
}
