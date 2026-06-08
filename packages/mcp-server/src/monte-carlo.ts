export interface MonteCarloResult {
  mean: number;
  median: number;
  stdDev: number;
  min: number;
  max: number;
  percentiles: Record<string, number>;
  histogram: Array<{ bin: string; count: number }>;
}

export class MonteCarlo {
  static simulate(
    fn: () => number,
    iterations: number = 10000,
  ): MonteCarloResult {
    const results: number[] = [];
    for (let i = 0; i < iterations; i++) {
      results.push(fn());
    }
    return MonteCarlo.summarize(results);
  }

  static risk(
    scenarios: Array<{ probability: number; outcome: number }>,
    iterations: number = 10000,
  ): MonteCarloResult {
    const cumProb = scenarios.reduce((arr, s) => {
      const last = arr.length > 0 ? arr[arr.length - 1] : 0;
      arr.push(last + s.probability);
      return arr;
    }, [] as number[]);

    const results: number[] = [];
    for (let i = 0; i < iterations; i++) {
      const r = Math.random();
      for (let j = 0; j < cumProb.length; j++) {
        if (r <= cumProb[j]) {
          results.push(scenarios[j].outcome);
          break;
        }
      }
    }
    return MonteCarlo.summarize(results);
  }

  static portfolio(
    assets: Array<{ expectedReturn: number; stdDev: number; weight: number }>,
    periods: number = 12,
    iterations: number = 10000,
  ): MonteCarloResult {
    const results: number[] = [];
    for (let i = 0; i < iterations; i++) {
      let totalReturn = 1;
      for (let p = 0; p < periods; p++) {
        let periodReturn = 0;
        for (const asset of assets) {
          const r = MonteCarlo.normalRandom() * asset.stdDev + asset.expectedReturn;
          periodReturn += r * asset.weight;
        }
        totalReturn *= (1 + periodReturn);
      }
      results.push(Math.round((totalReturn - 1) * 10000) / 100);
    }
    return MonteCarlo.summarize(results);
  }

  static pi(iterations: number = 100000): { estimate: number; error: number } {
    let inside = 0;
    for (let i = 0; i < iterations; i++) {
      const x = Math.random();
      const y = Math.random();
      if (x * x + y * y <= 1) inside++;
    }
    const estimate = 4 * inside / iterations;
    return {
      estimate: Math.round(estimate * 10000) / 10000,
      error: Math.round(Math.abs(estimate - Math.PI) * 10000) / 10000,
    };
  }

  static convergence(fn: () => number, checkpoints: number[]): Array<{ iterations: number; mean: number }> {
    const results: number[] = [];
    const convergence: Array<{ iterations: number; mean: number }> = [];
    const maxIter = Math.max(...checkpoints);

    for (let i = 0; i < maxIter; i++) {
      results.push(fn());
      if (checkpoints.includes(i + 1)) {
        const mean = results.reduce((s, v) => s + v, 0) / results.length;
        convergence.push({
          iterations: i + 1,
          mean: Math.round(mean * 10000) / 10000,
        });
      }
    }
    return convergence;
  }

  private static summarize(results: number[]): MonteCarloResult {
    const sorted = [...results].sort((a, b) => a - b);
    const mean = results.reduce((s, v) => s + v, 0) / results.length;
    const variance = results.reduce((s, v) => s + (v - mean) ** 2, 0) / results.length;
    const median = sorted.length % 2 === 0
      ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
      : sorted[Math.floor(sorted.length / 2)];

    const pctIdx = (p: number) => Math.floor((p / 100) * (sorted.length - 1));
    const percentiles: Record<string, number> = {
      "5": Math.round(sorted[pctIdx(5)] * 100) / 100,
      "25": Math.round(sorted[pctIdx(25)] * 100) / 100,
      "50": Math.round(sorted[pctIdx(50)] * 100) / 100,
      "75": Math.round(sorted[pctIdx(75)] * 100) / 100,
      "95": Math.round(sorted[pctIdx(95)] * 100) / 100,
    };

    const bins = 10;
    const min = sorted[0];
    const max = sorted[sorted.length - 1];
    const binWidth = (max - min) / bins || 1;
    const histogram: Array<{ bin: string; count: number }> = [];
    for (let i = 0; i < bins; i++) {
      const lo = min + i * binWidth;
      const hi = lo + binWidth;
      const count = results.filter((v) => v >= lo && (i === bins - 1 ? v <= hi : v < hi)).length;
      histogram.push({ bin: `${Math.round(lo * 100) / 100}-${Math.round(hi * 100) / 100}`, count });
    }

    return {
      mean: Math.round(mean * 100) / 100,
      median: Math.round(median * 100) / 100,
      stdDev: Math.round(Math.sqrt(variance) * 100) / 100,
      min: Math.round(min * 100) / 100,
      max: Math.round(max * 100) / 100,
      percentiles,
      histogram,
    };
  }

  private static normalRandom(): number {
    const u1 = Math.random();
    const u2 = Math.random();
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  }
}
