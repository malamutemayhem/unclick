import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function extendedGcd(args: Record<string, unknown>) {
  const a = Number(args.a);
  const b = Number(args.b);

  if (!Number.isInteger(a) || !Number.isInteger(b)) {
    throw new Error("a and b must be integers");
  }
  if (a === 0 && b === 0) {
    throw new Error("a and b cannot both be zero");
  }

  function extGcdHelper(x: bigint, y: bigint): [bigint, bigint, bigint] {
    if (y === 0n) return [x < 0n ? -x : x, x < 0n ? -1n : 1n, 0n];
    const [g, x1, y1] = extGcdHelper(y, x % y);
    return [g, y1, x1 - (x / y) * y1];
  }

  const [gcdVal, x, y] = extGcdHelper(BigInt(a), BigInt(b));

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use extended GCD for modular inverses and Diophantine equations"],
  };

  const result: Record<string, unknown> = {
    a,
    b,
    gcd: Number(gcdVal),
    x: Number(x),
    y: Number(y),
    bezout_identity: `${a} * ${Number(x)} + ${b} * ${Number(y)} = ${Number(gcdVal)}`,
  };

  if (b !== 0 && gcdVal === 1n) {
    const modInv = ((x % BigInt(b)) + BigInt(Math.abs(b))) % BigInt(Math.abs(b));
    result.modular_inverse_a_mod_b = Number(modInv);
  }

  return stampMeta(result, meta);
}
