import { stampMeta, ConnectorMeta } from "./connector-meta.js";

const MOD = 998244353;
const G = 3;

function power(base: number, exp: number, mod: number): number {
  let result = 1;
  base %= mod;
  while (exp > 0) {
    if (exp & 1) result = Number((BigInt(result) * BigInt(base)) % BigInt(mod));
    exp >>= 1;
    base = Number((BigInt(base) * BigInt(base)) % BigInt(mod));
  }
  return result;
}

function nttTransform(a: number[], invert: boolean): void {
  const n = a.length;
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) [a[i], a[j]] = [a[j], a[i]];
  }

  for (let len = 2; len <= n; len <<= 1) {
    const w = invert
      ? power(power(G, (MOD - 1) / len, MOD), MOD - 2, MOD)
      : power(G, (MOD - 1) / len, MOD);
    const half = len >> 1;
    for (let i = 0; i < n; i += len) {
      let wn = 1;
      for (let j = 0; j < half; j++) {
        const u = a[i + j];
        const v = Number((BigInt(a[i + j + half]) * BigInt(wn)) % BigInt(MOD));
        a[i + j] = (u + v) % MOD;
        a[i + j + half] = (u - v + MOD) % MOD;
        wn = Number((BigInt(wn) * BigInt(w)) % BigInt(MOD));
      }
    }
  }

  if (invert) {
    const nInv = power(n, MOD - 2, MOD);
    for (let i = 0; i < n; i++) {
      a[i] = Number((BigInt(a[i]) * BigInt(nInv)) % BigInt(MOD));
    }
  }
}

export async function ntt(args: Record<string, unknown>) {
  const polyA = args.poly_a as number[];
  const polyB = args.poly_b as number[];

  if (!Array.isArray(polyA) || polyA.length === 0 || polyA.length > 100_000) {
    throw new Error("poly_a must be a non-empty array (max 100,000 coefficients)");
  }
  if (!Array.isArray(polyB) || polyB.length === 0 || polyB.length > 100_000) {
    throw new Error("poly_b must be a non-empty array (max 100,000 coefficients)");
  }

  const resultLen = polyA.length + polyB.length - 1;
  let sz = 1;
  while (sz < resultLen) sz <<= 1;

  const fa = new Array(sz).fill(0);
  const fb = new Array(sz).fill(0);
  for (let i = 0; i < polyA.length; i++) fa[i] = ((polyA[i] % MOD) + MOD) % MOD;
  for (let i = 0; i < polyB.length; i++) fb[i] = ((polyB[i] % MOD) + MOD) % MOD;

  nttTransform(fa, false);
  nttTransform(fb, false);

  for (let i = 0; i < sz; i++) {
    fa[i] = Number((BigInt(fa[i]) * BigInt(fb[i])) % BigInt(MOD));
  }

  nttTransform(fa, true);

  const product = fa.slice(0, resultLen);

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Results are modulo 998244353 - suitable for competitive programming",
      "Use for fast polynomial multiplication, convolution, or string matching",
    ],
  };

  return stampMeta(
    {
      degree_a: polyA.length - 1,
      degree_b: polyB.length - 1,
      result_degree: resultLen - 1,
      modulus: MOD,
      product,
    },
    meta,
  );
}
