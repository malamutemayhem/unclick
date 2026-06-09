import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function sternBrocotTree(args: Record<string, unknown>) {
  const target = args.target as number;
  const maxDenom = (args.max_denominator as number) || 1000;

  if (typeof target !== "number" || !Number.isFinite(target) || target <= 0) {
    throw new Error("target must be a positive finite number");
  }
  if (typeof maxDenom !== "number" || maxDenom < 1 || maxDenom > 1_000_000) {
    throw new Error("max_denominator must be between 1 and 1,000,000");
  }

  let lp = 0, lq = 1;
  let rp = 1, rq = 0;
  const path: string[] = [];
  let bestP = 1, bestQ = 1;
  let bestDist = Math.abs(target - 1);
  const maxSteps = 200;

  for (let step = 0; step < maxSteps; step++) {
    const mp = lp + rp;
    const mq = lq + rq;

    if (mq > maxDenom) break;

    const mediant = mp / mq;
    const dist = Math.abs(target - mediant);
    if (dist < bestDist) {
      bestDist = dist;
      bestP = mp;
      bestQ = mq;
    }

    if (Math.abs(mediant - target) < 1e-12) {
      path.push("=");
      bestP = mp;
      bestQ = mq;
      break;
    } else if (target < mediant) {
      path.push("L");
      rp = mp;
      rq = mq;
    } else {
      path.push("R");
      lp = mp;
      lq = mq;
    }
  }

  const convergents: Array<{ p: number; q: number; value: number }> = [];
  const cfTerms = continuedFraction(target, maxDenom);
  let h0 = 0, h1 = 1, k0 = 1, k1 = 0;
  for (const a of cfTerms) {
    const h2 = a * h1 + h0;
    const k2 = a * k1 + k0;
    if (k2 > maxDenom) break;
    convergents.push({ p: h2, q: k2, value: h2 / k2 });
    h0 = h1; h1 = h2;
    k0 = k1; k1 = k2;
  }

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Use Stern-Brocot tree for rational approximation and Farey sequence generation"],
  };

  return stampMeta(
    {
      target,
      max_denominator: maxDenom,
      best_approximation: { p: bestP, q: bestQ, value: bestP / bestQ },
      error: bestDist,
      path: path.join(""),
      path_length: path.length,
      continued_fraction: cfTerms,
      convergents,
    },
    meta,
  );
}

function continuedFraction(x: number, maxDenom: number): number[] {
  const terms: number[] = [];
  let val = x;
  for (let i = 0; i < 50; i++) {
    const a = Math.floor(val);
    terms.push(a);
    const frac = val - a;
    if (frac < 1e-12) break;
    val = 1 / frac;
    if (val > maxDenom * 2) break;
  }
  return terms;
}
