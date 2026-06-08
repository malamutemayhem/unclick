import { describe, it, expect } from "vitest";
import { ActivationFunctions } from "../activation-functions.js";

describe("ActivationFunctions", () => {
  it("sigmoid maps to 0-1", () => {
    expect(ActivationFunctions.sigmoid(0)).toBe(0.5);
    expect(ActivationFunctions.sigmoid(100)).toBeCloseTo(1, 3);
    expect(ActivationFunctions.sigmoid(-100)).toBeCloseTo(0, 3);
  });

  it("sigmoidDerivative peaks at 0", () => {
    expect(ActivationFunctions.sigmoidDerivative(0)).toBe(0.25);
    expect(ActivationFunctions.sigmoidDerivative(5)).toBeLessThan(0.25);
  });

  it("tanh maps to -1 to 1", () => {
    expect(ActivationFunctions.tanh(0)).toBe(0);
    expect(ActivationFunctions.tanh(100)).toBeCloseTo(1, 3);
    expect(ActivationFunctions.tanh(-100)).toBeCloseTo(-1, 3);
  });

  it("tanhDerivative peaks at 0", () => {
    expect(ActivationFunctions.tanhDerivative(0)).toBe(1);
  });

  it("relu returns max(0, x)", () => {
    expect(ActivationFunctions.relu(5)).toBe(5);
    expect(ActivationFunctions.relu(-5)).toBe(0);
    expect(ActivationFunctions.relu(0)).toBe(0);
  });

  it("reluDerivative is 0 or 1", () => {
    expect(ActivationFunctions.reluDerivative(5)).toBe(1);
    expect(ActivationFunctions.reluDerivative(-5)).toBe(0);
  });

  it("leakyRelu allows small negative values", () => {
    expect(ActivationFunctions.leakyRelu(5)).toBe(5);
    expect(ActivationFunctions.leakyRelu(-5)).toBeCloseTo(-0.05, 3);
  });

  it("elu is smooth for negative values", () => {
    expect(ActivationFunctions.elu(5)).toBe(5);
    expect(ActivationFunctions.elu(-1)).toBeLessThan(0);
    expect(ActivationFunctions.elu(-1)).toBeGreaterThan(-1);
  });

  it("swish is x * sigmoid(x)", () => {
    expect(ActivationFunctions.swish(0)).toBe(0);
    expect(ActivationFunctions.swish(5)).toBeGreaterThan(4);
  });

  it("softplus is smooth relu", () => {
    expect(ActivationFunctions.softplus(0)).toBeCloseTo(0.6931, 3);
    expect(ActivationFunctions.softplus(10)).toBeCloseTo(10, 0);
  });

  it("softmax sums to 1", () => {
    const result = ActivationFunctions.softmax([1, 2, 3]);
    const sum = result.reduce((s, v) => s + v, 0);
    expect(sum).toBeCloseTo(1, 2);
    expect(result[2]).toBeGreaterThan(result[0]);
  });

  it("step returns 0 or 1", () => {
    expect(ActivationFunctions.step(0.5)).toBe(1);
    expect(ActivationFunctions.step(-0.5)).toBe(0);
    expect(ActivationFunctions.step(0)).toBe(1);
  });

  it("gelu approximates correctly", () => {
    expect(ActivationFunctions.gelu(0)).toBe(0);
    expect(ActivationFunctions.gelu(1)).toBeGreaterThan(0.8);
    expect(ActivationFunctions.gelu(-1)).toBeLessThan(0);
  });

  it("apply maps function over array", () => {
    const result = ActivationFunctions.apply([1, -1, 0], ActivationFunctions.relu);
    expect(result).toEqual([1, 0, 0]);
  });
});
