import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function nthRoot(args: Record<string, unknown>) {
  const value = typeof args.value === "number" ? args.value : NaN;
  const n = typeof args.n === "number" ? args.n : 2;
  if (isNaN(value)) return { error: "value is required (number)" };
  if (n === 0) return { error: "n must not be zero" };
  if (value < 0 && n % 2 === 0) return { error: "Even roots of negative numbers are not real" };

  let result: number;
  if (value < 0) {
    result = -Math.pow(-value, 1 / n);
  } else {
    result = Math.pow(value, 1 / n);
  }

  const inverse = Math.pow(result, n);
  const isExact = Math.abs(inverse - value) < 1e-8;

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["nth root is the same as raising to the power 1/n", "Square root (n=2) and cube root (n=3) are the most common"],
  };
  return stampMeta({
    value,
    n,
    result: +result.toFixed(10),
    verification: +inverse.toFixed(10),
    is_exact: isExact,
    is_integer_result: Math.abs(result - Math.round(result)) < 1e-10,
  }, meta);
}
