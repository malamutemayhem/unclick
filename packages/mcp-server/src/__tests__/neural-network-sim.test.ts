import { describe, it, expect } from "vitest";
import { NeuralNetwork } from "../neural-network-sim.js";

describe("NeuralNetwork", () => {
  it("creates network with correct layer sizes", () => {
    const nn = new NeuralNetwork([2, 3, 1]);
    expect(nn.layerSizes()).toEqual([2, 3, 1]);
  });

  it("forward pass returns correct output dimensions", () => {
    const nn = new NeuralNetwork([3, 4, 2]);
    const output = nn.forward([1, 0, 1]);
    expect(output.length).toBe(2);
    output.forEach((v) => {
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(1);
    });
  });

  it("trains and reduces error", () => {
    const nn = new NeuralNetwork([2, 4, 1], 0.5);
    const data = [
      { input: [0, 0], target: [0] },
      { input: [1, 1], target: [0] },
      { input: [1, 0], target: [1] },
      { input: [0, 1], target: [1] },
    ];
    const errors = nn.trainBatch(data, 100);
    expect(errors[errors.length - 1]).toBeLessThan(errors[0]);
  });

  it("learns simple OR function", () => {
    const nn = new NeuralNetwork([2, 4, 1], 1.0);
    const data = [
      { input: [0, 0], target: [0] },
      { input: [1, 0], target: [1] },
      { input: [0, 1], target: [1] },
      { input: [1, 1], target: [1] },
    ];
    nn.trainBatch(data, 500);
    expect(nn.forward([0, 0])[0]).toBeLessThan(0.3);
    expect(nn.forward([1, 1])[0]).toBeGreaterThan(0.7);
  });

  it("counts parameters", () => {
    const nn = new NeuralNetwork([2, 3, 1]);
    // 2*3 weights + 3 biases + 3*1 weights + 1 bias = 13
    expect(nn.parameterCount()).toBe(13);
  });

  it("handles single hidden layer", () => {
    const nn = new NeuralNetwork([1, 1]);
    const output = nn.forward([0.5]);
    expect(output.length).toBe(1);
  });

  it("train returns error value", () => {
    const nn = new NeuralNetwork([2, 2, 1]);
    const error = nn.train([1, 0], [1]);
    expect(typeof error).toBe("number");
    expect(error).toBeGreaterThanOrEqual(0);
  });
});
