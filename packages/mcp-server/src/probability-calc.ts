export class ProbabilityCalc {
  static union(a: number, b: number, intersection?: number): number {
    const inter = intersection ?? a * b;
    return Math.round((a + b - inter) * 10000) / 10000;
  }

  static intersection(a: number, b: number, independent = true): number {
    if (independent) return Math.round(a * b * 10000) / 10000;
    return Math.round(Math.min(a, b) * 10000) / 10000;
  }

  static complement(p: number): number {
    return Math.round((1 - p) * 10000) / 10000;
  }

  static conditional(pAandB: number, pB: number): number {
    if (pB === 0) return 0;
    return Math.round((pAandB / pB) * 10000) / 10000;
  }

  static bayes(pBgivenA: number, pA: number, pB: number): number {
    if (pB === 0) return 0;
    return Math.round(((pBgivenA * pA) / pB) * 10000) / 10000;
  }

  static binomial(n: number, k: number, p: number): number {
    const coeff = ProbabilityCalc.choose(n, k);
    return Math.round(coeff * Math.pow(p, k) * Math.pow(1 - p, n - k) * 10000) / 10000;
  }

  static binomialCdf(n: number, k: number, p: number): number {
    let sum = 0;
    for (let i = 0; i <= k; i++) {
      sum += ProbabilityCalc.binomial(n, i, p);
    }
    return Math.round(sum * 10000) / 10000;
  }

  static poisson(k: number, lambda: number): number {
    const result = (Math.pow(lambda, k) * Math.exp(-lambda)) / ProbabilityCalc.factorialVal(k);
    return Math.round(result * 10000) / 10000;
  }

  static geometric(k: number, p: number): number {
    return Math.round(Math.pow(1 - p, k - 1) * p * 10000) / 10000;
  }

  static hypergeometric(N: number, K: number, n: number, k: number): number {
    const num = ProbabilityCalc.choose(K, k) * ProbabilityCalc.choose(N - K, n - k);
    const den = ProbabilityCalc.choose(N, n);
    return den === 0 ? 0 : Math.round((num / den) * 10000) / 10000;
  }

  static expectedValue(outcomes: { value: number; probability: number }[]): number {
    const ev = outcomes.reduce((s, o) => s + o.value * o.probability, 0);
    return Math.round(ev * 10000) / 10000;
  }

  static variance(outcomes: { value: number; probability: number }[]): number {
    const ev = outcomes.reduce((s, o) => s + o.value * o.probability, 0);
    const ev2 = outcomes.reduce((s, o) => s + o.value * o.value * o.probability, 0);
    return Math.round((ev2 - ev * ev) * 10000) / 10000;
  }

  static standardDeviation(outcomes: { value: number; probability: number }[]): number {
    return Math.round(Math.sqrt(ProbabilityCalc.variance(outcomes)) * 10000) / 10000;
  }

  private static choose(n: number, k: number): number {
    if (k > n) return 0;
    if (k === 0 || k === n) return 1;
    k = Math.min(k, n - k);
    let result = 1;
    for (let i = 0; i < k; i++) {
      result = (result * (n - i)) / (i + 1);
    }
    return Math.round(result);
  }

  private static factorialVal(n: number): number {
    if (n <= 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
  }
}
