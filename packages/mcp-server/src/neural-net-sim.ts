export type ActivationFn = "sigmoid" | "relu" | "tanh" | "linear";

export interface LayerConfig {
  neurons: number;
  activation: ActivationFn;
}

function activate(x: number, fn: ActivationFn): number {
  switch (fn) {
    case "sigmoid": return 1 / (1 + Math.exp(-x));
    case "relu": return Math.max(0, x);
    case "tanh": return Math.tanh(x);
    case "linear": return x;
  }
}

function activateDerivative(output: number, fn: ActivationFn): number {
  switch (fn) {
    case "sigmoid": return output * (1 - output);
    case "relu": return output > 0 ? 1 : 0;
    case "tanh": return 1 - output * output;
    case "linear": return 1;
  }
}

export class NeuralNet {
  private weights: number[][][] = [];
  private biases: number[][] = [];
  private activations: ActivationFn[] = [];
  private layerSizes: number[];

  constructor(inputSize: number, layers: LayerConfig[], seed = 42) {
    let rng = this.seededRandom(seed);
    this.layerSizes = [inputSize, ...layers.map((l) => l.neurons)];
    this.activations = layers.map((l) => l.activation);

    for (let l = 0; l < layers.length; l++) {
      const inSize = this.layerSizes[l];
      const outSize = this.layerSizes[l + 1];
      const scale = Math.sqrt(2 / inSize);
      const w: number[][] = [];
      const b: number[] = [];
      for (let j = 0; j < outSize; j++) {
        const row: number[] = [];
        for (let i = 0; i < inSize; i++) {
          row.push((rng() * 2 - 1) * scale);
        }
        w.push(row);
        b.push(0);
      }
      this.weights.push(w);
      this.biases.push(b);
    }
  }

  forward(input: number[]): number[] {
    let current = input;
    for (let l = 0; l < this.weights.length; l++) {
      const next: number[] = [];
      for (let j = 0; j < this.weights[l].length; j++) {
        let sum = this.biases[l][j];
        for (let i = 0; i < current.length; i++) {
          sum += current[i] * this.weights[l][j][i];
        }
        next.push(activate(sum, this.activations[l]));
      }
      current = next;
    }
    return current;
  }

  train(inputs: number[][], targets: number[][], learningRate = 0.1, epochs = 1): number[] {
    const losses: number[] = [];

    for (let epoch = 0; epoch < epochs; epoch++) {
      let totalLoss = 0;

      for (let sample = 0; sample < inputs.length; sample++) {
        const layerOutputs: number[][] = [inputs[sample]];

        let current = inputs[sample];
        for (let l = 0; l < this.weights.length; l++) {
          const next: number[] = [];
          for (let j = 0; j < this.weights[l].length; j++) {
            let sum = this.biases[l][j];
            for (let i = 0; i < current.length; i++) {
              sum += current[i] * this.weights[l][j][i];
            }
            next.push(activate(sum, this.activations[l]));
          }
          layerOutputs.push(next);
          current = next;
        }

        const output = layerOutputs[layerOutputs.length - 1];
        let error = 0;
        let deltas: number[][] = [];
        const outputDelta: number[] = [];
        for (let j = 0; j < output.length; j++) {
          const diff = output[j] - targets[sample][j];
          error += diff * diff;
          outputDelta.push(diff * activateDerivative(output[j], this.activations[this.activations.length - 1]));
        }
        deltas.push(outputDelta);
        totalLoss += error / output.length;

        for (let l = this.weights.length - 2; l >= 0; l--) {
          const delta: number[] = [];
          for (let i = 0; i < this.weights[l].length; i++) {
            let sum = 0;
            for (let j = 0; j < this.weights[l + 1].length; j++) {
              sum += deltas[0][j] * this.weights[l + 1][j][i];
            }
            delta.push(sum * activateDerivative(layerOutputs[l + 1][i], this.activations[l]));
          }
          deltas.unshift(delta);
        }

        for (let l = 0; l < this.weights.length; l++) {
          for (let j = 0; j < this.weights[l].length; j++) {
            for (let i = 0; i < this.weights[l][j].length; i++) {
              this.weights[l][j][i] -= learningRate * deltas[l][j] * layerOutputs[l][i];
            }
            this.biases[l][j] -= learningRate * deltas[l][j];
          }
        }
      }

      losses.push(totalLoss / inputs.length);
    }

    return losses;
  }

  predict(input: number[]): number {
    const output = this.forward(input);
    let maxIdx = 0;
    for (let i = 1; i < output.length; i++) {
      if (output[i] > output[maxIdx]) maxIdx = i;
    }
    return maxIdx;
  }

  get layerCount(): number {
    return this.weights.length;
  }

  get totalParams(): number {
    let count = 0;
    for (let l = 0; l < this.weights.length; l++) {
      count += this.weights[l].length * this.weights[l][0].length;
      count += this.biases[l].length;
    }
    return count;
  }

  getLayerSizes(): number[] {
    return [...this.layerSizes];
  }

  private seededRandom(seed: number): () => number {
    let s = seed;
    return () => {
      s = (s * 1103515245 + 12345) & 0x7fffffff;
      return s / 0x7fffffff;
    };
  }
}
