export class LogisticRegression {
  weights: number[];
  bias: number;

  constructor(numFeatures: number) {
    this.weights = new Array(numFeatures).fill(0);
    this.bias = 0;
  }

  private sigmoid(z: number): number {
    return 1 / (1 + Math.exp(-z));
  }

  predictProbability(features: number[]): number {
    let z = this.bias;
    for (let i = 0; i < this.weights.length; i++) {
      z += this.weights[i] * features[i];
    }
    return this.sigmoid(z);
  }

  predict(features: number[], threshold = 0.5): number {
    return this.predictProbability(features) >= threshold ? 1 : 0;
  }

  train(
    data: number[][],
    labels: number[],
    learningRate = 0.1,
    epochs = 100,
  ): { losses: number[] } {
    const losses: number[] = [];
    const n = data.length;

    for (let epoch = 0; epoch < epochs; epoch++) {
      let totalLoss = 0;
      const dw = new Array(this.weights.length).fill(0);
      let db = 0;

      for (let i = 0; i < n; i++) {
        const p = this.predictProbability(data[i]);
        const error = p - labels[i];
        for (let j = 0; j < this.weights.length; j++) {
          dw[j] += error * data[i][j];
        }
        db += error;
        const eps = 1e-15;
        totalLoss -= labels[i] * Math.log(p + eps) + (1 - labels[i]) * Math.log(1 - p + eps);
      }

      for (let j = 0; j < this.weights.length; j++) {
        this.weights[j] -= learningRate * dw[j] / n;
      }
      this.bias -= learningRate * db / n;
      losses.push(Math.round((totalLoss / n) * 10000) / 10000);
    }

    return { losses };
  }

  accuracy(data: number[][], labels: number[]): number {
    let correct = 0;
    for (let i = 0; i < data.length; i++) {
      if (this.predict(data[i]) === labels[i]) correct++;
    }
    return Math.round((correct / data.length) * 10000) / 10000;
  }

  decisionBoundary(): { weights: number[]; bias: number } {
    return {
      weights: this.weights.map(w => Math.round(w * 10000) / 10000),
      bias: Math.round(this.bias * 10000) / 10000,
    };
  }
}
