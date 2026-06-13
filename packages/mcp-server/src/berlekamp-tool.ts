import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function berlekampMassey(args: Record<string, unknown>) {
  const seq = args.sequence as number[];

  if (!Array.isArray(seq) || seq.length === 0 || seq.length > 10_000) {
    throw new Error("sequence must be a non-empty array (max 10,000 elements)");
  }

  const MOD = 998244353;

  function mod(x: number): number {
    return ((x % MOD) + MOD) % MOD;
  }

  function modpow(base: number, exp: number, m: number): number {
    let result = 1;
    base = ((base % m) + m) % m;
    while (exp > 0) {
      if (exp & 1) result = Number((BigInt(result) * BigInt(base)) % BigInt(m));
      exp >>= 1;
      base = Number((BigInt(base) * BigInt(base)) % BigInt(m));
    }
    return result;
  }

  function inv(x: number): number {
    return modpow(mod(x), MOD - 2, MOD);
  }

  const s = seq.map((v) => mod(v));
  let cur: number[] = [];
  let lst: number[] = [];
  let curDelta = 0;
  let lstDelta = 0;
  let curLen = 0;

  for (let i = 0; i < s.length; i++) {
    let delta = s[i];
    for (let j = 0; j < cur.length; j++) {
      delta = mod(delta - Number((BigInt(cur[j]) * BigInt(s[i - 1 - j])) % BigInt(MOD)));
    }
    if (delta === 0) continue;

    if (cur.length === 0) {
      cur = new Array(i + 1).fill(0);
      lstDelta = delta;
      curLen = i;
      continue;
    }

    const factor = Number((BigInt(delta) * BigInt(inv(lstDelta))) % BigInt(MOD));
    const shift = i - curLen - 1;
    const tmp = cur.slice();

    if (cur.length < lst.length + shift + 1) {
      cur.length = lst.length + shift + 1;
      cur.fill(0, tmp.length);
    }

    cur[shift] = mod(cur[shift] + factor);
    for (let j = 0; j < lst.length; j++) {
      cur[shift + 1 + j] = mod(
        cur[shift + 1 + j] - Number((BigInt(factor) * BigInt(lst[j])) % BigInt(MOD)),
      );
    }

    if (2 * (tmp.length) <= i) {
      lst = tmp;
      lstDelta = delta;
      curLen = i;
    }
    curDelta = delta;
  }

  const recurrence = cur.map((v) => mod(v));

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "Coefficients are modulo 998244353 - suitable for competitive programming",
      "The recurrence c means s[i] = c[0]*s[i-1] + c[1]*s[i-2] + ...",
    ],
  };

  return stampMeta(
    {
      recurrence_length: recurrence.length,
      recurrence_coefficients: recurrence,
      sequence_length: seq.length,
      modulus: MOD,
    },
    meta,
  );
}
