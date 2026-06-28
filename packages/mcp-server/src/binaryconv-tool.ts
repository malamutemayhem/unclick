import { stampMeta } from "./connector-meta.js";

export async function numberBaseConvert(args: Record<string, unknown>) {
  const value = String(args.value ?? "").trim();
  if (!value) return { error: "value is required" };
  const fromBase = Number(args.from_base) || 10;
  const toBase = Number(args.to_base) || 0;
  if (fromBase < 2 || fromBase > 36) return { error: "from_base must be 2-36" };
  if (toBase !== 0 && (toBase < 2 || toBase > 36)) return { error: "to_base must be 2-36" };
  let decimal: number;
  try {
    decimal = parseInt(value, fromBase);
  } catch {
    return { error: `Cannot parse "${value}" as base ${fromBase}` };
  }
  if (isNaN(decimal)) return { error: `Cannot parse "${value}" as base ${fromBase}` };
  const conversions: Record<string, string> = {
    binary: decimal.toString(2),
    octal: decimal.toString(8),
    decimal: decimal.toString(10),
    hexadecimal: decimal.toString(16).toUpperCase(),
  };
  if (toBase > 0) {
    conversions.custom = decimal.toString(toBase).toUpperCase();
  }
  return stampMeta({
    input: value,
    from_base: fromBase,
    decimal_value: decimal,
    conversions,
  }, {
    source: "local number base converter",
    fetched_at: new Date().toISOString(),
    next_steps: ["set from_base for non-decimal input", "set to_base for a custom output base"],
  });
}
