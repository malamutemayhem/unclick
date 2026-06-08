export class ActivationFunctions {
  static sigmoid(x: number): number {
    return Math.round((1 / (1 + Math.exp(-x))) * 10000) / 10000;
  }

  static sigmoidDerivative(x: number): number {
    const s = ActivationFunctions.sigmoid(x);
    return Math.round(s * (1 - s) * 10000) / 10000;
  }

  static tanh(x: number): number {
    return Math.round(Math.tanh(x) * 10000) / 10000;
  }

  static tanhDerivative(x: number): number {
    const t = Math.tanh(x);
    return Math.round((1 - t * t) * 10000) / 10000;
  }

  static relu(x: number): number {
    return Math.max(0, x);
  }

  static reluDerivative(x: number): number {
    return x > 0 ? 1 : 0;
  }

  static leakyRelu(x: number, alpha = 0.01): number {
    return Math.round((x > 0 ? x : alpha * x) * 10000) / 10000;
  }

  static leakyReluDerivative(x: number, alpha = 0.01): number {
    return x > 0 ? 1 : alpha;
  }

  static elu(x: number, alpha = 1): number {
    return Math.round((x > 0 ? x : alpha * (Math.exp(x) - 1)) * 10000) / 10000;
  }

  static swish(x: number): number {
    return Math.round((x / (1 + Math.exp(-x))) * 10000) / 10000;
  }

  static softplus(x: number): number {
    return Math.round(Math.log(1 + Math.exp(x)) * 10000) / 10000;
  }

  static softmax(values: number[]): number[] {
    const max = Math.max(...values);
    const exps = values.map(v => Math.exp(v - max));
    const sum = exps.reduce((s, e) => s + e, 0);
    return exps.map(e => Math.round((e / sum) * 10000) / 10000);
  }

  static step(x: number): number {
    return x >= 0 ? 1 : 0;
  }

  static gelu(x: number): number {
    const cdf = 0.5 * (1 + Math.tanh(Math.sqrt(2 / Math.PI) * (x + 0.044715 * x * x * x)));
    return Math.round(x * cdf * 10000) / 10000;
  }

  static apply(values: number[], fn: (x: number) => number): number[] {
    return values.map(fn);
  }
}
