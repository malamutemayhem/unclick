import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function collatzSequence(args: Record<string, unknown>) {
  const n = typeof args.number === "number" ? Math.floor(args.number) : 0;
  if (n < 1) return { error: "number must be a positive integer" };

  const maxSteps = 10000;
  const sequence: number[] = [n];
  let current = n;
  while (current !== 1 && sequence.length < maxSteps) {
    current = current % 2 === 0 ? current / 2 : 3 * current + 1;
    sequence.push(current);
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["The Collatz conjecture states every sequence reaches 1"],
  };
  return stampMeta({
    start: n,
    steps: sequence.length - 1,
    max_value: Math.max(...sequence),
    reached_one: current === 1,
    sequence: sequence.length <= 200 ? sequence : sequence.slice(0, 100).concat(["..."] as unknown as number[], sequence.slice(-10)),
  }, meta);
}
