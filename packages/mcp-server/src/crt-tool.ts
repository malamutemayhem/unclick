import { stampMeta, ConnectorMeta } from "./connector-meta.js";

function gcd(a: bigint, b: bigint): bigint {
  while (b !== 0n) {
    [a, b] = [b, a % b];
  }
  return a < 0n ? -a : a;
}

function extGcd(a: bigint, b: bigint): [bigint, bigint, bigint] {
  if (b === 0n) return [a, 1n, 0n];
  const [g, x1, y1] = extGcd(b, a % b);
  return [g, y1, x1 - (a / b) * y1];
}

export async function chineseRemainderTheorem(args: Record<string, unknown>) {
  const remainders = args.remainders as number[];
  const moduli = args.moduli as number[];

  if (!Array.isArray(remainders) || !Array.isArray(moduli)) {
    throw new Error("remainders and moduli must be arrays of numbers");
  }
  if (remainders.length !== moduli.length || remainders.length === 0) {
    throw new Error("remainders and moduli must be non-empty arrays of equal length");
  }
  if (remainders.length > 20) {
    throw new Error("at most 20 congruences supported");
  }

  for (const m of moduli) {
    if (!Number.isInteger(m) || m < 1) {
      throw new Error("all moduli must be positive integers");
    }
  }

  let curR = BigInt(((remainders[0] % moduli[0]) + moduli[0]) % moduli[0]);
  let curM = BigInt(moduli[0]);

  for (let i = 1; i < remainders.length; i++) {
    const ri = BigInt(((remainders[i] % moduli[i]) + moduli[i]) % moduli[i]);
    const mi = BigInt(moduli[i]);

    const [g, p, _q] = extGcd(curM, mi);
    if ((ri - curR) % g !== 0n) {
      const meta: ConnectorMeta = {
        source: "local-computation",
        fetched_at: new Date().toISOString(),
        next_steps: ["No solution exists when moduli are not coprime for these remainders"],
      };
      return stampMeta(
        {
          has_solution: false,
          reason: `No solution: congruences ${i - 1} and ${i} are incompatible`,
          congruence_count: remainders.length,
        },
        meta,
      );
    }

    const lcm = (curM / g) * mi;
    const diff = (ri - curR) / g;
    curR = ((curR + curM * (diff * p % (mi / g))) % lcm + lcm) % lcm;
    curM = lcm;
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use CRT for solving simultaneous congruences"],
  };

  return stampMeta(
    {
      has_solution: true,
      solution: Number(curR),
      combined_modulus: Number(curM),
      congruence_count: remainders.length,
      verification: moduli.map((m, i) => ({
        remainder: remainders[i],
        modulus: m,
        check: Number(curR) % m === ((remainders[i] % m) + m) % m,
      })),
    },
    meta,
  );
}
