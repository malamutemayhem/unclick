export interface ABTestResult {
  controlRate: number;
  variantRate: number;
  relativeUplift: number;
  zScore: number;
  pValue: number;
  significant: boolean;
  confidenceInterval: { lower: number; upper: number };
  sampleSizeAdequate: boolean;
}

export class ABTestCalc {
  static analyze(
    controlVisitors: number,
    controlConversions: number,
    variantVisitors: number,
    variantConversions: number,
    confidence: number = 0.95,
  ): ABTestResult {
    const controlRate = controlVisitors === 0 ? 0 : controlConversions / controlVisitors;
    const variantRate = variantVisitors === 0 ? 0 : variantConversions / variantVisitors;
    const relativeUplift = controlRate === 0 ? 0 : (variantRate - controlRate) / controlRate;

    const pooledRate = (controlConversions + variantConversions) / (controlVisitors + variantVisitors);
    const se = Math.sqrt(pooledRate * (1 - pooledRate) * (1 / controlVisitors + 1 / variantVisitors));
    const zScore = se === 0 ? 0 : (variantRate - controlRate) / se;
    const pValue = ABTestCalc.zToPValue(Math.abs(zScore));

    const alpha = 1 - confidence;
    const zCritical = ABTestCalc.criticalZ(confidence);
    const seDiff = Math.sqrt(
      (controlRate * (1 - controlRate)) / controlVisitors +
      (variantRate * (1 - variantRate)) / variantVisitors,
    );
    const diff = variantRate - controlRate;

    const minSample = ABTestCalc.minimumSampleSize(controlRate, 0.05, confidence);

    return {
      controlRate: Math.round(controlRate * 10000) / 10000,
      variantRate: Math.round(variantRate * 10000) / 10000,
      relativeUplift: Math.round(relativeUplift * 10000) / 10000,
      zScore: Math.round(zScore * 1000) / 1000,
      pValue: Math.round(pValue * 10000) / 10000,
      significant: pValue < alpha,
      confidenceInterval: {
        lower: Math.round((diff - zCritical * seDiff) * 10000) / 10000,
        upper: Math.round((diff + zCritical * seDiff) * 10000) / 10000,
      },
      sampleSizeAdequate: Math.min(controlVisitors, variantVisitors) >= minSample,
    };
  }

  static minimumSampleSize(
    baselineRate: number,
    minimumDetectableEffect: number,
    confidence: number = 0.95,
    power: number = 0.8,
  ): number {
    const zAlpha = ABTestCalc.criticalZ(confidence);
    const zBeta = ABTestCalc.criticalZ(0.5 + power / 2);
    const p1 = baselineRate;
    const p2 = baselineRate + minimumDetectableEffect;
    const numerator = (zAlpha * Math.sqrt(2 * p1 * (1 - p1)) + zBeta * Math.sqrt(p1 * (1 - p1) + p2 * (1 - p2))) ** 2;
    const denominator = (p2 - p1) ** 2;
    return Math.ceil(numerator / denominator);
  }

  static duration(
    dailyVisitors: number,
    baselineRate: number,
    minimumDetectableEffect: number,
    variants: number = 2,
  ): number {
    const perVariant = ABTestCalc.minimumSampleSize(baselineRate, minimumDetectableEffect);
    const totalNeeded = perVariant * variants;
    return Math.ceil(totalNeeded / dailyVisitors);
  }

  static bayesianProbability(
    controlConversions: number,
    controlVisitors: number,
    variantConversions: number,
    variantVisitors: number,
    simulations: number = 10000,
  ): number {
    let variantWins = 0;
    for (let i = 0; i < simulations; i++) {
      const controlSample = ABTestCalc.betaSample(controlConversions + 1, controlVisitors - controlConversions + 1);
      const variantSample = ABTestCalc.betaSample(variantConversions + 1, variantVisitors - variantConversions + 1);
      if (variantSample > controlSample) variantWins++;
    }
    return Math.round((variantWins / simulations) * 1000) / 1000;
  }

  private static betaSample(alpha: number, beta: number): number {
    const x = ABTestCalc.gammaSample(alpha);
    const y = ABTestCalc.gammaSample(beta);
    return x / (x + y);
  }

  private static gammaSample(shape: number): number {
    if (shape < 1) {
      return ABTestCalc.gammaSample(shape + 1) * Math.pow(Math.random(), 1 / shape);
    }
    const d = shape - 1 / 3;
    const c = 1 / Math.sqrt(9 * d);
    while (true) {
      let x: number;
      let v: number;
      do {
        x = ABTestCalc.normalRandom();
        v = 1 + c * x;
      } while (v <= 0);
      v = v * v * v;
      const u = Math.random();
      if (u < 1 - 0.0331 * (x * x) * (x * x)) return d * v;
      if (Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v))) return d * v;
    }
  }

  private static normalRandom(): number {
    const u1 = Math.random();
    const u2 = Math.random();
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  }

  private static zToPValue(z: number): number {
    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;
    const sign = z < 0 ? -1 : 1;
    const x = Math.abs(z) / Math.sqrt(2);
    const t = 1 / (1 + p * x);
    const erf = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    const cdf = 0.5 * (1 + sign * erf);
    return 2 * (1 - cdf);
  }

  private static criticalZ(confidence: number): number {
    const alpha = 1 - confidence;
    const p = 1 - alpha / 2;
    const a = [
      -3.969683028665376e+01, 2.209460984245205e+02,
      -2.759285104469687e+02, 1.383577518672690e+02,
      -3.066479806614716e+01, 2.506628277459239e+00,
    ];
    const b = [
      -5.447609879822406e+01, 1.615858368580409e+02,
      -1.556989798598866e+02, 6.680131188771972e+01,
      -1.328068155288572e+01,
    ];
    const c = [
      -7.784894002430293e-03, -3.223964580411365e-01,
      -2.400758277161838e+00, -2.549732539343734e+00,
      4.374664141464968e+00, 2.938163982698783e+00,
    ];
    const d = [
      7.784695709041462e-03, 3.224671290700398e-01,
      2.445134137142996e+00, 3.754408661907416e+00,
    ];

    const pLow = 0.02425;
    const pHigh = 1 - pLow;

    let q: number;
    let r: number;

    if (p < pLow) {
      q = Math.sqrt(-2 * Math.log(p));
      return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
        ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
    } else if (p <= pHigh) {
      q = p - 0.5;
      r = q * q;
      return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q /
        (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
    } else {
      q = Math.sqrt(-2 * Math.log(1 - p));
      return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
        ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
    }
  }
}
