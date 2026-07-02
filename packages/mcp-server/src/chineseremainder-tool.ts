import { stampMeta, ConnectorMeta } from "./connector-meta.js";

function extendedGcd(a: bigint, b: bigint): [bigint, bigint, bigint] {
  if (a === 0n) return [b, 0n, 1n];
  const [g, x1, y1] = extendedGcd(b % a, a);
  return [g, y1 - (b / a) * x1, x1];
}

export async function chineseRemainder(args: Record<string, unknown>) {
  const remainders = args.remainders as number[];
  const moduli = args.moduli as number[];

  if (!Array.isArray(remainders) || remainders.length === 0 || remainders.length > 100) {
    throw new Error("remainders must be a non-empty array (max 100)");
  }
  if (!Array.isArray(moduli) || moduli.length !== remainders.length) {
    throw new Error("moduli must have the same length as remainders");
  }
  for (const m of moduli) {
    if (!Number.isInteger(m) || m < 1) {
      throw new Error("All moduli must be positive integers");
    }
  }

  let curR = BigInt(((remainders[0] % moduli[0]) + moduli[0]) % moduli[0]);
  let curM = BigInt(moduli[0]);

  for (let i = 1; i < remainders.length; i++) {
    const r2 = BigInt(((remainders[i] % moduli[i]) + moduli[i]) % moduli[i]);
    const m2 = BigInt(moduli[i]);
    const [g, p, _q] = extendedGcd(curM, m2);

    if ((r2 - curR) % g !== 0n) {
      const meta: ConnectorMeta = {
        source: "local-computation",
        fetched_at: new Date().toISOString(),
        next_steps: ["The system has no solution - the congruences are incompatible"],
      };
      return stampMeta({ solvable: false, reason: "incompatible congruences" }, meta);
    }

    const lcm = (curM / g) * m2;
    curR = ((curR + curM * ((r2 - curR) / g % (m2 / g)) * p) % lcm + lcm) % lcm;
    curM = lcm;
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "x is congruent to solution (mod combined_modulus)",
      "Generalised CRT handles non-coprime moduli when compatible",
    ],
  };

  return stampMeta(
    {
      solvable: true,
      solution: Number(curR),
      combined_modulus: Number(curM),
      equations: remainders.map((r, i) => `x = ${r} (mod ${moduli[i]})`),
    },
    meta,
  );
}
