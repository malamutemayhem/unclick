export class NeuralNetwork {
  private layers: number[];
  private weights: number[][][];
  private biases: number[][];
  private learningRate: number;

  constructor(layers: number[], learningRate = 0.1) {
    this.layers = layers;
    this.learningRate = learningRate;
    this.weights = [];
    this.biases = [];

    for (let i = 1; i < layers.length; i++) {
      const layerWeights: number[][] = [];
      const layerBiases: number[] = [];
      for (let j = 0; j < layers[i]; j++) {
        const neuronWeights: number[] = [];
        for (let k = 0; k < layers[i - 1]; k++) {
          neuronWeights.push((Math.random() - 0.5) * 2);
        }
        layerWeights.push(neuronWeights);
        layerBiases.push((Math.random() - 0.5) * 2);
      }
      this.weights.push(layerWeights);
      this.biases.push(layerBiases);
    }
  }

  private sigmoid(x: number): number {
    return 1 / (1 + Math.exp(-Math.max(-500, Math.min(500, x))));
  }

  private sigmoidDerivative(x: number): number {
    return x * (1 - x);
  }

  forward(input: number[]): number[] {
    let current = input;
    for (let l = 0; l < this.weights.length; l++) {
      const next: number[] = [];
      for (let j = 0; j < this.weights[l].length; j++) {
        let sum = this.biases[l][j];
        for (let k = 0; k < current.length; k++) {
          sum += current[k] * this.weights[l][j][k];
        }
        next.push(this.sigmoid(sum));
      }
      current = next;
    }
    return current;
  }

  train(input: number[], target: number[]): number {
    const activations: number[][] = [input];
    let current = input;

    for (let l = 0; l < this.weights.length; l++) {
      const next: number[] = [];
      for (let j = 0; j < this.weights[l].length; j++) {
        let sum = this.biases[l][j];
        for (let k = 0; k < current.length; k++) {
          sum += current[k] * this.weights[l][j][k];
        }
        next.push(this.sigmoid(sum));
      }
      activations.push(next);
      current = next;
    }

    const output = activations[activations.length - 1];
    let totalError = 0;
    for (let i = 0; i < output.length; i++) {
      totalError += (target[i] - output[i]) ** 2;
    }

    const deltas: number[][] = [];
    const outputDeltas: number[] = [];
    for (let i = 0; i < output.length; i++) {
      const error = target[i] - output[i];
      outputDeltas.push(error * this.sigmoidDerivative(output[i]));
    }
    deltas.unshift(outputDeltas);

    for (let l = this.weights.length - 2; l >= 0; l--) {
      const layerDeltas: number[] = [];
      for (let j = 0; j < this.weights[l].length; j++) {
        let error = 0;
        for (let k = 0; k < this.weights[l + 1].length; k++) {
          error += deltas[0][k] * this.weights[l + 1][k][j];
        }
        layerDeltas.push(error * this.sigmoidDerivative(activations[l + 1][j]));
      }
      deltas.unshift(layerDeltas);
    }

    for (let l = 0; l < this.weights.length; l++) {
      for (let j = 0; j < this.weights[l].length; j++) {
        for (let k = 0; k < this.weights[l][j].length; k++) {
          this.weights[l][j][k] += this.learningRate * deltas[l][j] * activations[l][k];
        }
        this.biases[l][j] += this.learningRate * deltas[l][j];
      }
    }

    return totalError;
  }

  trainBatch(data: Array<{ input: number[]; target: number[] }>, epochs: number): number[] {
    const errors: number[] = [];
    for (let e = 0; e < epochs; e++) {
      let totalError = 0;
      for (const { input, target } of data) {
        totalError += this.train(input, target);
      }
      errors.push(totalError / data.length);
    }
    return errors;
  }

  layerSizes(): number[] {
    return [...this.layers];
  }

  parameterCount(): number {
    let count = 0;
    for (let l = 0; l < this.weights.length; l++) {
      count += this.weights[l].length * this.weights[l][0].length;
      count += this.biases[l].length;
    }
    return count;
  }
}
