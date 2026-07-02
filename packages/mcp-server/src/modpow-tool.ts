import { stampMeta, ConnectorMeta } from "./connector-meta.js";

function bigModPow(base: bigint, exp: bigint, mod: bigint): bigint {
  let result = 1n;
  base = base % mod;
  while (exp > 0n) {
    if (exp % 2n === 1n) result = (result * base) % mod;
    exp = exp / 2n;
    base = (base * base) % mod;
  }
  return result;
}

function bigModInverse(a: bigint, m: bigint): bigint | null {
  let [old_r, r] = [a % m, m];
  let [old_s, s] = [1n, 0n];
  while (r !== 0n) {
    const q = old_r / r;
    [old_r, r] = [r, old_r - q * r];
    [old_s, s] = [s, old_s - q * s];
  }
  if (old_r !== 1n) return null;
  return ((old_s % m) + m) % m;
}

export async function modularArithmetic(args: Record<string, unknown>) {
  const op = typeof args.operation === "string" ? args.operation.toLowerCase() : "";
  const validOps = ["modpow", "modinverse", "mod"];
  if (!validOps.includes(op)) return { error: `operation is required (one of: ${validOps.join(", ")})` };

  const a = typeof args.a === "number" ? BigInt(Math.floor(args.a)) : null;
  const b = typeof args.b === "number" ? BigInt(Math.floor(args.b)) : null;
  const m = typeof args.m === "number" ? BigInt(Math.floor(args.m)) : null;
  if (a === null || m === null || m <= 0n) return { error: "a and m are required (m must be positive)" };

  let result: string;
  let details: Record<string, unknown>;

  switch (op) {
    case "modpow": {
      if (b === null || b < 0n) return { error: "b (exponent) is required and must be non-negative" };
      const r = bigModPow(a, b, m);
      result = r.toString();
      details = { operation: "modpow", expression: `${a}^${b} mod ${m}`, result: r.toString() };
      break;
    }
    case "modinverse": {
      const inv = bigModInverse(a, m);
      if (inv === null) return { error: `No modular inverse exists for ${a} mod ${m}` };
      result = inv.toString();
      details = { operation: "modinverse", expression: `${a}^(-1) mod ${m}`, result: inv.toString() };
      break;
    }
    case "mod": {
      const r = ((a % m) + m) % m;
      result = r.toString();
      details = { operation: "mod", expression: `${a} mod ${m}`, result: r.toString() };
      break;
    }
    default:
      result = "0";
      details = {};
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["modpow is used in RSA and Diffie-Hellman", "modinverse exists only when gcd(a, m) = 1"],
  };
  return stampMeta({ ...details, result_numeric: result }, meta);
}
