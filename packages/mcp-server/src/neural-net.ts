function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}

function sigmoidDerivative(x: number): number {
  return x * (1 - x);
}

export class NeuralNet {
  private layers: number[];
  private weights: number[][][];
  private biases: number[][];

  constructor(layers: number[]) {
    this.layers = layers;
    this.weights = [];
    this.biases = [];

    for (let i = 1; i < layers.length; i++) {
      const w: number[][] = [];
      const b: number[] = [];
      for (let j = 0; j < layers[i]; j++) {
        const neuronWeights: number[] = [];
        for (let k = 0; k < layers[i - 1]; k++) {
          neuronWeights.push((Math.random() - 0.5) * 2);
        }
        w.push(neuronWeights);
        b.push((Math.random() - 0.5) * 2);
      }
      this.weights.push(w);
      this.biases.push(b);
    }
  }

  predict(inputs: number[]): number[] {
    let activations = inputs;
    for (let layer = 0; layer < this.weights.length; layer++) {
      const next: number[] = [];
      for (let j = 0; j < this.weights[layer].length; j++) {
        let sum = this.biases[layer][j];
        for (let k = 0; k < activations.length; k++) {
          sum += activations[k] * this.weights[layer][j][k];
        }
        next.push(sigmoid(sum));
      }
      activations = next;
    }
    return activations;
  }

  train(inputs: number[], targets: number[], learningRate = 0.1): number {
    const layerOutputs: number[][] = [inputs];
    let current = inputs;
    for (let layer = 0; layer < this.weights.length; layer++) {
      const next: number[] = [];
      for (let j = 0; j < this.weights[layer].length; j++) {
        let sum = this.biases[layer][j];
        for (let k = 0; k < current.length; k++) {
          sum += current[k] * this.weights[layer][j][k];
        }
        next.push(sigmoid(sum));
      }
      layerOutputs.push(next);
      current = next;
    }

    const errors: number[][] = new Array(this.weights.length);
    const lastIdx = this.weights.length - 1;
    errors[lastIdx] = [];
    let totalError = 0;
    for (let j = 0; j < targets.length; j++) {
      const err = targets[j] - layerOutputs[lastIdx + 1][j];
      errors[lastIdx].push(err * sigmoidDerivative(layerOutputs[lastIdx + 1][j]));
      totalError += err * err;
    }

    for (let layer = lastIdx - 1; layer >= 0; layer--) {
      errors[layer] = [];
      for (let j = 0; j < this.weights[layer].length; j++) {
        let err = 0;
        for (let k = 0; k < this.weights[layer + 1].length; k++) {
          err += errors[layer + 1][k] * this.weights[layer + 1][k][j];
        }
        errors[layer].push(err * sigmoidDerivative(layerOutputs[layer + 1][j]));
      }
    }

    for (let layer = 0; layer < this.weights.length; layer++) {
      for (let j = 0; j < this.weights[layer].length; j++) {
        for (let k = 0; k < this.weights[layer][j].length; k++) {
          this.weights[layer][j][k] += learningRate * errors[layer][j] * layerOutputs[layer][k];
        }
        this.biases[layer][j] += learningRate * errors[layer][j];
      }
    }

    return totalError / targets.length;
  }

  get shape(): number[] {
    return [...this.layers];
  }
}
