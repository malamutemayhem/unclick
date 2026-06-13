import { stampMeta, ConnectorMeta } from "./connector-meta.js";

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) { [a, b] = [b, a % b]; }
  return a;
}

function lcm(a: number, b: number): number {
  return a && b ? Math.abs(a * b) / gcd(a, b) : 0;
}

export async function gcdCalculate(args: Record<string, unknown>) {
  const numbers = Array.isArray(args.numbers)
    ? args.numbers.filter((v) => typeof v === "number" && Number.isInteger(v)) as number[]
    : [];
  if (numbers.length < 2) return { error: "numbers array with at least 2 integers is required" };

  const resultGcd = numbers.reduce((a, b) => gcd(a, b));
  const resultLcm = numbers.reduce((a, b) => lcm(a, b));

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["GCD is the greatest common divisor", "LCM is the least common multiple"],
  };
  return stampMeta({ numbers, gcd: resultGcd, lcm: resultLcm }, meta);
}
