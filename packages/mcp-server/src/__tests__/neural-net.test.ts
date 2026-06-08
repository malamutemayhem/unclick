import { describe, it, expect } from "vitest";
import { NeuralNet } from "../neural-net.js";

describe("NeuralNet", () => {
  it("creates with correct shape", () => {
    const nn = new NeuralNet([2, 3, 1]);
    expect(nn.shape).toEqual([2, 3, 1]);
  });

  it("predict returns correct output dimensions", () => {
    const nn = new NeuralNet([2, 4, 3]);
    const output = nn.predict([1, 0]);
    expect(output).toHaveLength(3);
  });

  it("outputs are between 0 and 1 (sigmoid)", () => {
    const nn = new NeuralNet([3, 5, 2]);
    const output = nn.predict([0.5, 0.3, 0.8]);
    for (const v of output) {
      expect(v).toBeGreaterThan(0);
      expect(v).toBeLessThan(1);
    }
  });

  it("train reduces error over time", () => {
    const nn = new NeuralNet([2, 4, 1]);
    let firstError = 0;
    let lastError = 0;
    for (let i = 0; i < 500; i++) {
      const err = nn.train([1, 0], [1], 0.5);
      if (i === 0) firstError = err;
      if (i === 499) lastError = err;
    }
    expect(lastError).toBeLessThan(firstError);
  });

  it("learns XOR approximately", () => {
    const nn = new NeuralNet([2, 4, 1]);
    const data = [
      { input: [0, 0], target: [0] },
      { input: [0, 1], target: [1] },
      { input: [1, 0], target: [1] },
      { input: [1, 1], target: [0] },
    ];
    for (let epoch = 0; epoch < 2000; epoch++) {
      for (const { input, target } of data) {
        nn.train(input, target, 1);
      }
    }
    expect(nn.predict([0, 0])[0]).toBeLessThan(0.3);
    expect(nn.predict([1, 1])[0]).toBeLessThan(0.3);
    expect(nn.predict([0, 1])[0]).toBeGreaterThan(0.7);
    expect(nn.predict([1, 0])[0]).toBeGreaterThan(0.7);
  });

  it("handles single layer", () => {
    const nn = new NeuralNet([2, 1]);
    const output = nn.predict([0.5, 0.5]);
    expect(output).toHaveLength(1);
  });
});
