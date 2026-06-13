import { stampMeta } from "./connector-meta.js";

function gcd(a: number, b: number): number {
  a = Math.abs(a); b = Math.abs(b);
  while (b) { [a, b] = [b, a % b]; }
  return a;
}

function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

export async function gcdLcmCalc(args: Record<string, unknown>) {
  const raw = args.numbers;
  let numbers: number[];
  if (Array.isArray(raw)) {
    numbers = raw.map(Number).filter(n => !isNaN(n));
  } else if (typeof raw === "string") {
    numbers = String(raw).split(/[,\s]+/).map(Number).filter(n => !isNaN(n));
  } else {
    const a = Number(args.a);
    const b = Number(args.b);
    if (isNaN(a) || isNaN(b)) return { error: "Provide numbers (array or comma-separated) or a and b" };
    numbers = [a, b];
  }
  if (numbers.length < 2) return { error: "At least two numbers are required" };
  const resultGcd = numbers.reduce((acc, n) => gcd(acc, n));
  const resultLcm = numbers.reduce((acc, n) => lcm(acc, n));
  return stampMeta({
    numbers,
    gcd: resultGcd,
    lcm: resultLcm,
    count: numbers.length,
    are_coprime: resultGcd === 1,
  }, {
    source: "local GCD/LCM calculator",
    fetched_at: new Date().toISOString(),
    next_steps: ["are_coprime is true when GCD is 1", "works with any number of integers"],
  });
}
