import { stampMeta, ConnectorMeta } from "./connector-meta.js";

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) { [a, b] = [b, a % b]; }
  return a;
}

export async function ratioSimplify(args: Record<string, unknown>) {
  const a = typeof args.a === "number" ? args.a : NaN;
  const b = typeof args.b === "number" ? args.b : NaN;
  if (isNaN(a) || isNaN(b)) return { error: "a and b are required (numbers)" };
  if (b === 0) return { error: "b must not be zero" };

  const scale = 1e8;
  const intA = Math.round(a * scale);
  const intB = Math.round(b * scale);
  const g = gcd(Math.abs(intA), Math.abs(intB));
  const simpA = intA / g;
  const simpB = intB / g;

  const sign = simpB < 0 ? -1 : 1;
  const finalA = simpA * sign;
  const finalB = simpB * sign;

  const decimal = a / b;
  const percentage = (a / b) * 100;

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Simplified ratio can be used as a fraction", "Decimal and percentage forms included"],
  };
  return stampMeta({
    original: { a, b, ratio: `${a}:${b}` },
    simplified: { a: finalA, b: finalB, ratio: `${finalA}:${finalB}` },
    decimal: +decimal.toFixed(8),
    percentage: +percentage.toFixed(4),
    gcd_factor: g / scale,
  }, meta);
}
