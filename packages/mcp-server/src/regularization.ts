export class Regularization {
  static l1(weights: number[], lambda: number): number {
    return Math.round(lambda * weights.reduce((s, w) => s + Math.abs(w), 0) * 10000) / 10000;
  }

  static l2(weights: number[], lambda: number): number {
    return Math.round(lambda * weights.reduce((s, w) => s + w * w, 0) * 10000) / 10000;
  }

  static elasticNet(weights: number[], lambda: number, alpha = 0.5): number {
    const l1 = weights.reduce((s, w) => s + Math.abs(w), 0);
    const l2 = weights.reduce((s, w) => s + w * w, 0);
    return Math.round(lambda * (alpha * l1 + (1 - alpha) * l2) * 10000) / 10000;
  }

  static l1Gradient(weights: number[], lambda: number): number[] {
    return weights.map(w => {
      if (w > 0) return Math.round(lambda * 10000) / 10000;
      if (w < 0) return Math.round(-lambda * 10000) / 10000;
      return 0;
    });
  }

  static l2Gradient(weights: number[], lambda: number): number[] {
    return weights.map(w => Math.round(2 * lambda * w * 10000) / 10000);
  }

  static dropout(values: number[], rate: number): number[] {
    const scale = 1 / (1 - rate);
    return values.map(v => {
      if (Math.random() < rate) return 0;
      return Math.round(v * scale * 10000) / 10000;
    });
  }

  static batchNorm(
    values: number[],
    gamma = 1,
    beta = 0,
  ): { normalized: number[]; mean: number; variance: number } {
    const mean = values.reduce((s, v) => s + v, 0) / values.length;
    const variance = values.reduce((s, v) => s + (v - mean) ** 2, 0) / values.length;
    const eps = 1e-8;
    const std = Math.sqrt(variance + eps);
    const normalized = values.map(v =>
      Math.round((gamma * ((v - mean) / std) + beta) * 10000) / 10000,
    );
    return {
      normalized,
      mean: Math.round(mean * 10000) / 10000,
      variance: Math.round(variance * 10000) / 10000,
    };
  }

  static clipGradients(gradients: number[], maxNorm: number): number[] {
    const norm = Math.sqrt(gradients.reduce((s, g) => s + g * g, 0));
    if (norm <= maxNorm) return gradients;
    const scale = maxNorm / norm;
    return gradients.map(g => Math.round(g * scale * 10000) / 10000);
  }

  static weightDecay(weights: number[], learningRate: number, decayRate: number): number[] {
    return weights.map(w => Math.round(w * (1 - learningRate * decayRate) * 10000) / 10000);
  }
}
