import { describe, it, expect } from "vitest";
import {
  fidelity, capacity, correctability, physicality,
  qcCost, unital, forFiber, model,
  bestUse, quantumChannels,
} from "../quantum-channel-calc.js";

describe("fidelity", () => {
  it("bit flip highest fidelity", () => {
    expect(fidelity("bit_flip_pauli_x")).toBeGreaterThan(fidelity("erasure_loss"));
  });
});

describe("capacity", () => {
  it("bit flip highest capacity", () => {
    expect(capacity("bit_flip_pauli_x")).toBeGreaterThan(capacity("depolarizing_uniform"));
  });
});

describe("correctability", () => {
  it("bit flip most correctable", () => {
    expect(correctability("bit_flip_pauli_x")).toBeGreaterThan(correctability("amplitude_damping"));
  });
});

describe("physicality", () => {
  it("amplitude damping most physical", () => {
    expect(physicality("amplitude_damping")).toBeGreaterThan(physicality("bit_flip_pauli_x"));
  });
});

describe("qcCost", () => {
  it("erasure loss most expensive", () => {
    expect(qcCost("erasure_loss")).toBeGreaterThan(qcCost("bit_flip_pauli_x"));
  });
});

describe("unital", () => {
  it("depolarizing is unital", () => {
    expect(unital("depolarizing_uniform")).toBe(true);
  });
  it("amplitude damping not unital", () => {
    expect(unital("amplitude_damping")).toBe(false);
  });
});

describe("forFiber", () => {
  it("erasure loss for fiber", () => {
    expect(forFiber("erasure_loss")).toBe(true);
  });
  it("depolarizing not for fiber", () => {
    expect(forFiber("depolarizing_uniform")).toBe(false);
  });
});

describe("model", () => {
  it("amplitude damping uses spontaneous emission decay", () => {
    expect(model("amplitude_damping")).toBe("spontaneous_emission_decay");
  });
});

describe("bestUse", () => {
  it("erasure loss best for photonic qkd", () => {
    expect(bestUse("erasure_loss")).toBe("photonic_fiber_qkd_link");
  });
});

describe("quantumChannels", () => {
  it("returns 5 types", () => {
    expect(quantumChannels()).toHaveLength(5);
  });
});
