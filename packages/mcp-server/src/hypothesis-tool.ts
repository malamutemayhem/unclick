import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function hypothesisTest(args: Record<string, unknown>) {
  const test = String(args.test ?? "z").toLowerCase();

  if (test === "z") {
    const mean = Number(args.sample_mean);
    const mu0 = Number(args.population_mean ?? 0);
    const sigma = Number(args.population_std);
    const n = Number(args.sample_size);
    const alpha = Number(args.alpha ?? 0.05);
    const tail = String(args.tail ?? "two").toLowerCase();

    if (!Number.isFinite(mean) || !Number.isFinite(mu0)) throw new Error("sample_mean and population_mean must be finite.");
    if (!Number.isFinite(sigma) || sigma <= 0) throw new Error("population_std must be a positive number.");
    if (!Number.isFinite(n) || n < 1) throw new Error("sample_size must be at least 1.");

    const z = (mean - mu0) / (sigma / Math.sqrt(n));
    const pTwoTailed = 2 * (1 - normalCDF(Math.abs(z)));
    let pValue: number;
    if (tail === "left") pValue = normalCDF(z);
    else if (tail === "right") pValue = 1 - normalCDF(z);
    else pValue = pTwoTailed;

    const reject = pValue < alpha;

    const meta: ConnectorMeta = {
      source: "local-computation",
      fetched_at: new Date().toISOString(),
      next_steps: reject
        ? ["Result is statistically significant at the given alpha"]
        : ["Fail to reject the null hypothesis"],
    };
    return stampMeta({
      test: "z-test",
      z_statistic: Math.round(z * 1e6) / 1e6,
      p_value: Math.round(pValue * 1e8) / 1e8,
      alpha,
      tail,
      reject_null: reject,
      sample_mean: mean,
      population_mean: mu0,
      sample_size: n,
    }, meta);
  }

  if (test === "t") {
    const mean = Number(args.sample_mean);
    const mu0 = Number(args.population_mean ?? 0);
    const s = Number(args.sample_std);
    const n = Number(args.sample_size);
    const alpha = Number(args.alpha ?? 0.05);
    const tail = String(args.tail ?? "two").toLowerCase();

    if (!Number.isFinite(mean) || !Number.isFinite(mu0)) throw new Error("sample_mean and population_mean must be finite.");
    if (!Number.isFinite(s) || s <= 0) throw new Error("sample_std must be a positive number.");
    if (!Number.isFinite(n) || n < 2) throw new Error("sample_size must be at least 2 for t-test.");

    const t = (mean - mu0) / (s / Math.sqrt(n));
    const df = n - 1;
    const pTwoTailed = 2 * (1 - tCDF(Math.abs(t), df));
    let pValue: number;
    if (tail === "left") pValue = tCDF(t, df);
    else if (tail === "right") pValue = 1 - tCDF(t, df);
    else pValue = pTwoTailed;

    const reject = pValue < alpha;

    const meta: ConnectorMeta = {
      source: "local-computation",
      fetched_at: new Date().toISOString(),
      next_steps: reject
        ? ["Result is statistically significant at the given alpha"]
        : ["Fail to reject the null hypothesis; consider larger sample"],
    };
    return stampMeta({
      test: "t-test",
      t_statistic: Math.round(t * 1e6) / 1e6,
      degrees_of_freedom: df,
      p_value: Math.round(pValue * 1e8) / 1e8,
      alpha,
      tail,
      reject_null: reject,
      sample_mean: mean,
      population_mean: mu0,
      sample_size: n,
    }, meta);
  }

  if (test === "chi2") {
    const observed = args.observed as number[];
    const expected = args.expected as number[];
    if (!Array.isArray(observed) || !Array.isArray(expected)) {
      throw new Error("observed and expected must be arrays of numbers.");
    }
    if (observed.length !== expected.length || observed.length < 2) {
      throw new Error("observed and expected must have the same length (at least 2).");
    }
    const alpha = Number(args.alpha ?? 0.05);

    let chi2 = 0;
    for (let i = 0; i < observed.length; i++) {
      const e = Number(expected[i]);
      if (e <= 0) throw new Error("Expected values must be positive.");
      chi2 += Math.pow(Number(observed[i]) - e, 2) / e;
    }
    const df = observed.length - 1;
    const pValue = 1 - chi2CDF(chi2, df);
    const reject = pValue < alpha;

    const meta: ConnectorMeta = {
      source: "local-computation",
      fetched_at: new Date().toISOString(),
      next_steps: reject
        ? ["Observed distribution differs significantly from expected"]
        : ["No significant difference detected"],
    };
    return stampMeta({
      test: "chi-squared",
      chi2_statistic: Math.round(chi2 * 1e6) / 1e6,
      degrees_of_freedom: df,
      p_value: Math.round(pValue * 1e8) / 1e8,
      alpha,
      reject_null: reject,
    }, meta);
  }

  throw new Error("test must be z, t, or chi2.");
}

function normalCDF(x: number): number {
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741;
  const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x) / Math.SQRT2;
  const t = 1 / (1 + p * x);
  const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return 0.5 * (1 + sign * y);
}

function tCDF(t: number, df: number): number {
  const x = df / (df + t * t);
  return 1 - 0.5 * incompleteBeta(x, df / 2, 0.5);
}

function chi2CDF(x: number, k: number): number {
  return lowerGamma(k / 2, x / 2) / gamma(k / 2);
}

function gamma(z: number): number {
  if (z < 0.5) return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
  z -= 1;
  const g = 7;
  const c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028,
    771.32342877765313, -176.61502916214059, 12.507343278686905,
    -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  let x = c[0];
  for (let i = 1; i < g + 2; i++) x += c[i] / (z + i);
  const t = z + g + 0.5;
  return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
}

function lowerGamma(s: number, x: number): number {
  let sum = 0;
  let term = 1 / s;
  for (let n = 0; n < 200; n++) {
    sum += term;
    term *= x / (s + n + 1);
    if (Math.abs(term) < 1e-15) break;
  }
  return Math.pow(x, s) * Math.exp(-x) * sum;
}

function incompleteBeta(x: number, a: number, b: number): number {
  if (x === 0 || x === 1) return x;
  const bt = Math.exp(
    lgamma(a + b) - lgamma(a) - lgamma(b) + a * Math.log(x) + b * Math.log(1 - x),
  );
  if (x < (a + 1) / (a + b + 2)) {
    return bt * betaCF(x, a, b) / a;
  }
  return 1 - bt * betaCF(1 - x, b, a) / b;
}

function lgamma(x: number): number {
  return Math.log(gamma(x));
}

function betaCF(x: number, a: number, b: number): number {
  let m2, aa, c, d, del, h;
  const qab = a + b, qap = a + 1, qam = a - 1;
  c = 1; d = 1 - qab * x / qap;
  if (Math.abs(d) < 1e-30) d = 1e-30;
  d = 1 / d; h = d;
  for (let m = 1; m <= 100; m++) {
    m2 = 2 * m;
    aa = m * (b - m) * x / ((qam + m2) * (a + m2));
    d = 1 + aa * d; if (Math.abs(d) < 1e-30) d = 1e-30;
    c = 1 + aa / c; if (Math.abs(c) < 1e-30) c = 1e-30;
    d = 1 / d; h *= d * c;
    aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
    d = 1 + aa * d; if (Math.abs(d) < 1e-30) d = 1e-30;
    c = 1 + aa / c; if (Math.abs(c) < 1e-30) c = 1e-30;
    d = 1 / d; del = d * c; h *= del;
    if (Math.abs(del - 1) < 1e-10) break;
  }
  return h;
}
