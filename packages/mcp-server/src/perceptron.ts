export class Perceptron {
  weights: number[];
  bias: number;
  learningRate: number;

  constructor(inputSize: number, learningRate = 0.1) {
    this.weights = new Array(inputSize).fill(0);
    this.bias = 0;
    this.learningRate = learningRate;
  }

  predict(inputs: number[]): number {
    let sum = this.bias;
    for (let i = 0; i < this.weights.length; i++) {
      sum += this.weights[i] * inputs[i];
    }
    return sum >= 0 ? 1 : 0;
  }

  train(inputs: number[], target: number): number {
    const prediction = this.predict(inputs);
    const error = target - prediction;
    if (error !== 0) {
      for (let i = 0; i < this.weights.length; i++) {
        this.weights[i] += this.learningRate * error * inputs[i];
      }
      this.bias += this.learningRate * error;
    }
    return error;
  }

  trainEpoch(data: { inputs: number[]; target: number }[]): number {
    let totalError = 0;
    for (const sample of data) {
      totalError += Math.abs(this.train(sample.inputs, sample.target));
    }
    return totalError;
  }

  trainUntilConverge(data: { inputs: number[]; target: number }[], maxEpochs = 1000): number {
    for (let epoch = 0; epoch < maxEpochs; epoch++) {
      const error = this.trainEpoch(data);
      if (error === 0) return epoch + 1;
    }
    return maxEpochs;
  }

  accuracy(data: { inputs: number[]; target: number }[]): number {
    let correct = 0;
    for (const sample of data) {
      if (this.predict(sample.inputs) === sample.target) correct++;
    }
    return Math.round((correct / data.length) * 10000) / 10000;
  }

  static andGate(): Perceptron {
    const p = new Perceptron(2);
    p.trainUntilConverge([
      { inputs: [0, 0], target: 0 },
      { inputs: [0, 1], target: 0 },
      { inputs: [1, 0], target: 0 },
      { inputs: [1, 1], target: 1 },
    ]);
    return p;
  }

  static orGate(): Perceptron {
    const p = new Perceptron(2);
    p.trainUntilConverge([
      { inputs: [0, 0], target: 0 },
      { inputs: [0, 1], target: 1 },
      { inputs: [1, 0], target: 1 },
      { inputs: [1, 1], target: 1 },
    ]);
    return p;
  }
}
