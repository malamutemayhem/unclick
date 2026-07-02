import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function lucasTheorem(args: Record<string, unknown>) {
  const n = args.n as number;
  const k = args.k as number;
  const p = args.p as number;

  if (!Number.isInteger(n) || n < 0 || n > 1e15) {
    throw new Error("n must be a non-negative integer (max 10^15)");
  }
  if (!Number.isInteger(k) || k < 0) {
    throw new Error("k must be a non-negative integer");
  }
  if (!Number.isInteger(p) || p < 2 || p > 100_000) {
    throw new Error("p must be a prime integer between 2 and 100,000");
  }

  const fact = new Array(p);
  fact[0] = 1;
  for (let i = 1; i < p; i++) {
    fact[i] = (fact[i - 1] * i) % p;
  }

  function modpow(base: number, exp: number, mod: number): number {
    let result = 1;
    base %= mod;
    while (exp > 0) {
      if (exp & 1) result = (result * base) % mod;
      exp >>= 1;
      base = (base * base) % mod;
    }
    return result;
  }

  function modInverse(a: number, mod: number): number {
    return modpow(a, mod - 2, mod);
  }

  function smallBinom(a: number, b: number): number {
    if (b > a) return 0;
    if (b === 0 || b === a) return 1;
    return (fact[a] * modInverse((fact[b] * fact[a - b]) % p, p)) % p;
  }

  let nn = n;
  let kk = k;
  let result = 1;
  const digits: { n_digit: number; k_digit: number }[] = [];

  while (nn > 0 || kk > 0) {
    const ni = nn % p;
    const ki = kk % p;
    digits.push({ n_digit: ni, k_digit: ki });
    if (ki > ni) {
      result = 0;
      break;
    }
    result = (result * smallBinom(ni, ki)) % p;
    nn = Math.floor(nn / p);
    kk = Math.floor(kk / p);
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "C(n, k) mod p using Lucas' theorem for prime p",
      "Useful for large binomial coefficients in competitive programming",
    ],
  };

  return stampMeta(
    {
      n,
      k,
      prime: p,
      binomial_mod_p: result,
      base_p_digits: digits,
    },
    meta,
  );
}
