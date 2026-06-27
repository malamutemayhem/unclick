import { describe, it, expect } from "vitest";
import { NeuralNet } from "../neural-net-sim.js";

describe("NeuralNet", () => {
  it("creates with correct layer sizes", () => {
    const nn = new NeuralNet(2, [
      { neurons: 4, activation: "relu" },
      { neurons: 1, activation: "sigmoid" },
    ]);
    expect(nn.layerCount).toBe(2);
    expect(nn.getLayerSizes()).toEqual([2, 4, 1]);
  });

  it("forward produces output of correct size", () => {
    const nn = new NeuralNet(3, [
      { neurons: 4, activation: "relu" },
      { neurons: 2, activation: "sigmoid" },
    ]);
    const output = nn.forward([1, 0, 1]);
    expect(output).toHaveLength(2);
    output.forEach((v) => {
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(1);
    });
  });

  it("deterministic with same seed", () => {
    const nn1 = new NeuralNet(2, [{ neurons: 3, activation: "relu" }], 99);
    const nn2 = new NeuralNet(2, [{ neurons: 3, activation: "relu" }], 99);
    expect(nn1.forward([1, 0])).toEqual(nn2.forward([1, 0]));
  });

  it("different seeds produce different outputs", () => {
    const nn1 = new NeuralNet(2, [{ neurons: 3, activation: "sigmoid" }], 1);
    const nn2 = new NeuralNet(2, [{ neurons: 3, activation: "sigmoid" }], 2);
    expect(nn1.forward([1, 0])).not.toEqual(nn2.forward([1, 0]));
  });

  it("trains and reduces loss", () => {
    const nn = new NeuralNet(2, [
      { neurons: 4, activation: "sigmoid" },
      { neurons: 1, activation: "sigmoid" },
    ], 42);

    const inputs = [[0, 0], [0, 1], [1, 0], [1, 1]];
    const targets = [[0], [1], [1], [0]];

    const losses = nn.train(inputs, targets, 0.5, 100);
    expect(losses[losses.length - 1]).toBeLessThan(losses[0]);
  });

  it("predict returns argmax index", () => {
    const nn = new NeuralNet(2, [{ neurons: 3, activation: "sigmoid" }], 42);
    const idx = nn.predict([1, 0]);
    expect(idx).toBeGreaterThanOrEqual(0);
    expect(idx).toBeLessThan(3);
  });

  it("totalParams counts weights and biases", () => {
    const nn = new NeuralNet(2, [
      { neurons: 4, activation: "relu" },
      { neurons: 3, activation: "sigmoid" },
    ]);
    expect(nn.totalParams).toBe(2 * 4 + 4 + 4 * 3 + 3);
  });

  it("tanh activation keeps outputs in [-1, 1]", () => {
    const nn = new NeuralNet(2, [{ neurons: 3, activation: "tanh" }], 42);
    const output = nn.forward([5, -5]);
    output.forEach((v) => {
      expect(v).toBeGreaterThanOrEqual(-1);
      expect(v).toBeLessThanOrEqual(1);
    });
  });

  it("linear activation allows any range", () => {
    const nn = new NeuralNet(2, [
      { neurons: 4, activation: "relu" },
      { neurons: 1, activation: "linear" },
    ], 42);
    const output = nn.forward([10, 10]);
    expect(typeof output[0]).toBe("number");
  });

  it("multi-epoch training returns per-epoch losses", () => {
    const nn = new NeuralNet(1, [{ neurons: 2, activation: "sigmoid" }], 42);
    const losses = nn.train([[1], [0]], [[0], [1]], 0.1, 5);
    expect(losses).toHaveLength(5);
  });
});
