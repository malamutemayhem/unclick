import { stampMeta } from "./connector-meta.js";

export async function fibonacciSequence(args: Record<string, unknown>) {
  const n = Math.min(Math.max(Number(args.n) || 10, 1), 100);
  const sequence: number[] = [];
  let a = 0, b = 1;
  for (let i = 0; i < n; i++) {
    sequence.push(a);
    [a, b] = [b, a + b];
  }
  const checkIndex = Number(args.check);
  let isFibonacci: boolean | null = null;
  if (!isNaN(checkIndex) && checkIndex >= 0) {
    const num = checkIndex;
    const test1 = 5 * num * num + 4;
    const test2 = 5 * num * num - 4;
    const sqrt1 = Math.sqrt(test1);
    const sqrt2 = Math.sqrt(test2);
    isFibonacci = sqrt1 === Math.floor(sqrt1) || sqrt2 === Math.floor(sqrt2);
  }
  return stampMeta({
    sequence,
    count: n,
    sum: sequence.reduce((a, b) => a + b, 0),
    last: sequence[sequence.length - 1],
    ...(isFibonacci !== null ? { check: checkIndex, is_fibonacci: isFibonacci } : {}),
  }, {
    source: "local Fibonacci generator",
    fetched_at: new Date().toISOString(),
    next_steps: ["set n for sequence length (max 100)", "set check to test if a number is Fibonacci"],
  });
}
