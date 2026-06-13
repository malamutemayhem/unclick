import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function baseConvert(args: Record<string, unknown>) {
  const value = typeof args.value === "string" ? args.value : typeof args.value === "number" ? String(args.value) : "";
  const fromBase = typeof args.from_base === "number" ? args.from_base : 10;
  const toBase = typeof args.to_base === "number" ? args.to_base : 16;

  if (!value) return { error: "value is required" };
  if (fromBase < 2 || fromBase > 36) return { error: "from_base must be 2-36" };
  if (toBase < 2 || toBase > 36) return { error: "to_base must be 2-36" };

  let decimal: number;
  try {
    decimal = parseInt(value, fromBase);
  } catch {
    return { error: `Cannot parse "${value}" as base ${fromBase}` };
  }
  if (isNaN(decimal)) return { error: `Cannot parse "${value}" as base ${fromBase}` };

  const result = decimal.toString(toBase).toUpperCase();

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Common bases: 2 (binary), 8 (octal), 10 (decimal), 16 (hex)"],
  };
  return stampMeta({
    input: value,
    from_base: fromBase,
    to_base: toBase,
    decimal_value: decimal,
    result,
  }, meta);
}
