export class LossFunctions {
  static mse(actual: number[], predicted: number[]): number {
    const sum = actual.reduce((s, a, i) => s + (a - predicted[i]) ** 2, 0);
    return Math.round((sum / actual.length) * 10000) / 10000;
  }

  static rmse(actual: number[], predicted: number[]): number {
    return Math.round(Math.sqrt(LossFunctions.mse(actual, predicted)) * 10000) / 10000;
  }

  static mae(actual: number[], predicted: number[]): number {
    const sum = actual.reduce((s, a, i) => s + Math.abs(a - predicted[i]), 0);
    return Math.round((sum / actual.length) * 10000) / 10000;
  }

  static huber(actual: number[], predicted: number[], delta = 1): number {
    let sum = 0;
    for (let i = 0; i < actual.length; i++) {
      const diff = Math.abs(actual[i] - predicted[i]);
      sum += diff <= delta
        ? 0.5 * diff * diff
        : delta * (diff - 0.5 * delta);
    }
    return Math.round((sum / actual.length) * 10000) / 10000;
  }

  static crossEntropy(actual: number[], predicted: number[]): number {
    const eps = 1e-15;
    let sum = 0;
    for (let i = 0; i < actual.length; i++) {
      const p = Math.max(eps, Math.min(1 - eps, predicted[i]));
      sum -= actual[i] * Math.log(p) + (1 - actual[i]) * Math.log(1 - p);
    }
    return Math.round((sum / actual.length) * 10000) / 10000;
  }

  static categoricalCrossEntropy(actual: number[][], predicted: number[][]): number {
    const eps = 1e-15;
    let sum = 0;
    for (let i = 0; i < actual.length; i++) {
      for (let j = 0; j < actual[i].length; j++) {
        sum -= actual[i][j] * Math.log(Math.max(eps, predicted[i][j]));
      }
    }
    return Math.round((sum / actual.length) * 10000) / 10000;
  }

  static hinge(actual: number[], predicted: number[]): number {
    let sum = 0;
    for (let i = 0; i < actual.length; i++) {
      sum += Math.max(0, 1 - actual[i] * predicted[i]);
    }
    return Math.round((sum / actual.length) * 10000) / 10000;
  }

  static r2Score(actual: number[], predicted: number[]): number {
    const mean = actual.reduce((s, v) => s + v, 0) / actual.length;
    const ssRes = actual.reduce((s, a, i) => s + (a - predicted[i]) ** 2, 0);
    const ssTot = actual.reduce((s, a) => s + (a - mean) ** 2, 0);
    return ssTot === 0 ? 1 : Math.round((1 - ssRes / ssTot) * 10000) / 10000;
  }

  static mape(actual: number[], predicted: number[]): number {
    let sum = 0;
    let count = 0;
    for (let i = 0; i < actual.length; i++) {
      if (actual[i] !== 0) {
        sum += Math.abs((actual[i] - predicted[i]) / actual[i]);
        count++;
      }
    }
    return count === 0 ? 0 : Math.round((sum / count) * 10000) / 10000;
  }
}
