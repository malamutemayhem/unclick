import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function babyGiantStep(args: Record<string, unknown>) {
  const base = args.base as number;
  const target = args.target as number;
  const modulus = args.modulus as number;

  if (typeof base !== "number" || !Number.isInteger(base)) {
    throw new Error("base must be an integer");
  }
  if (typeof target !== "number" || !Number.isInteger(target)) {
    throw new Error("target must be an integer");
  }
  if (typeof modulus !== "number" || !Number.isInteger(modulus) || modulus < 2) {
    throw new Error("modulus must be an integer >= 2");
  }
  if (modulus > 1_000_000_000) {
    throw new Error("modulus must be at most 1,000,000,000");
  }

  const m = Math.ceil(Math.sqrt(modulus));

  const table = new Map<number, number>();
  let power = ((target % modulus) + modulus) % modulus;
  const b = ((base % modulus) + modulus) % modulus;

  for (let j = 0; j < m; j++) {
    table.set(power, j);
    power = (power * b) % modulus;
  }

  let giant = 1;
  let bm = 1;
  for (let i = 0; i < m; i++) {
    bm = (bm * b) % modulus;
  }

  let result: number | null = null;
  let stepsChecked = 0;

  for (let i = 0; i <= m; i++) {
    stepsChecked++;
    if (table.has(giant)) {
      const j = table.get(giant)!;
      const x = i * m - j;
      if (x >= 0) {
        result = x;
        break;
      }
    }
    giant = (giant * bm) % modulus;
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use baby-step giant-step for discrete logarithm in cyclic groups"],
  };

  return stampMeta(
    {
      base: b,
      target: ((target % modulus) + modulus) % modulus,
      modulus,
      result,
      found: result !== null,
      steps_checked: stepsChecked,
      table_size: m,
    },
    meta,
  );
}
