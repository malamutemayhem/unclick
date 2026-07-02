import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function standardForm(args: Record<string, unknown>) {
  const value = typeof args.value === "number" ? args.value : typeof args.value === "string" ? parseFloat(args.value as string) : NaN;
  if (isNaN(value)) return { error: "value is required (number or numeric string)" };

  const isNeg = value < 0;
  const absVal = Math.abs(value);

  let mantissa: number;
  let exponent: number;
  if (absVal === 0) {
    mantissa = 0;
    exponent = 0;
  } else {
    exponent = Math.floor(Math.log10(absVal));
    mantissa = absVal / Math.pow(10, exponent);
  }

  if (isNeg) mantissa = -mantissa;

  const scientific = `${mantissa.toFixed(6)}e${exponent >= 0 ? "+" : ""}${exponent}`;
  const engineering_exp = exponent >= 0 ? exponent - (exponent % 3) : exponent - ((exponent % 3 + 3) % 3);
  const engineering_mantissa = value / Math.pow(10, engineering_exp);
  const engineering = `${engineering_mantissa.toFixed(6)}e${engineering_exp >= 0 ? "+" : ""}${engineering_exp}`;

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Scientific notation: coefficient between 1 and 10", "Engineering notation: exponent is a multiple of 3"],
  };
  return stampMeta({
    value,
    mantissa: +mantissa.toFixed(6),
    exponent,
    scientific,
    engineering,
    digits: absVal === 0 ? 1 : Math.floor(Math.log10(absVal)) + 1,
  }, meta);
}
