import { describe, it, expect } from "vitest";
import { Perceptron } from "../perceptron.js";

describe("Perceptron", () => {
  it("predict returns 0 or 1", () => {
    const p = new Perceptron(2);
    const result = p.predict([1, 0]);
    expect([0, 1]).toContain(result);
  });

  it("train adjusts weights on error", () => {
    const p = new Perceptron(2, 0.1);
    const before = [...p.weights];
    p.train([1, 1], 0);
    const changed = p.weights.some((w, i) => w !== before[i]) || p.bias !== 0;
    expect(changed).toBe(true);
  });

  it("trainEpoch returns total error", () => {
    const p = new Perceptron(2);
    const data = [
      { inputs: [0, 0], target: 0 },
      { inputs: [1, 1], target: 1 },
    ];
    const error = p.trainEpoch(data);
    expect(error).toBeGreaterThanOrEqual(0);
  });

  it("trainUntilConverge learns AND gate", () => {
    const p = new Perceptron(2, 0.1);
    const data = [
      { inputs: [0, 0], target: 0 },
      { inputs: [0, 1], target: 0 },
      { inputs: [1, 0], target: 0 },
      { inputs: [1, 1], target: 1 },
    ];
    const epochs = p.trainUntilConverge(data);
    expect(epochs).toBeLessThan(100);
    expect(p.predict([1, 1])).toBe(1);
    expect(p.predict([0, 0])).toBe(0);
  });

  it("trainUntilConverge learns OR gate", () => {
    const p = new Perceptron(2, 0.1);
    const data = [
      { inputs: [0, 0], target: 0 },
      { inputs: [0, 1], target: 1 },
      { inputs: [1, 0], target: 1 },
      { inputs: [1, 1], target: 1 },
    ];
    p.trainUntilConverge(data);
    expect(p.predict([0, 0])).toBe(0);
    expect(p.predict([1, 0])).toBe(1);
  });

  it("accuracy measures correctness", () => {
    const p = Perceptron.andGate();
    const data = [
      { inputs: [0, 0], target: 0 },
      { inputs: [0, 1], target: 0 },
      { inputs: [1, 0], target: 0 },
      { inputs: [1, 1], target: 1 },
    ];
    expect(p.accuracy(data)).toBe(1);
  });

  it("andGate factory creates working AND", () => {
    const p = Perceptron.andGate();
    expect(p.predict([1, 1])).toBe(1);
    expect(p.predict([0, 1])).toBe(0);
  });

  it("orGate factory creates working OR", () => {
    const p = Perceptron.orGate();
    expect(p.predict([0, 0])).toBe(0);
    expect(p.predict([1, 0])).toBe(1);
  });
});
