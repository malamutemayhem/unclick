import { describe, it, expect } from "vitest";
import {
  qubitCapacity, accuracy, speed, memoryEff,
  qsCost, noiseModel, forVariational, backend,
  bestUse, quantumSims,
} from "../quantum-sim-calc.js";

describe("qubitCapacity", () => {
  it("stabilizer clifford most qubits", () => {
    expect(qubitCapacity("stabilizer_clifford")).toBeGreaterThan(qubitCapacity("density_matrix_mixed"));
  });
});

describe("accuracy", () => {
  it("statevector full most accurate", () => {
    expect(accuracy("statevector_full")).toBeGreaterThan(accuracy("stabilizer_clifford"));
  });
});

describe("speed", () => {
  it("stabilizer clifford fastest", () => {
    expect(speed("stabilizer_clifford")).toBeGreaterThan(speed("density_matrix_mixed"));
  });
});

describe("memoryEff", () => {
  it("tensor network most memory efficient", () => {
    expect(memoryEff("tensor_network_mps")).toBeGreaterThan(memoryEff("density_matrix_mixed"));
  });
});

describe("qsCost", () => {
  it("gpu accelerated most expensive", () => {
    expect(qsCost("gpu_accelerated_cuq")).toBeGreaterThan(qsCost("stabilizer_clifford"));
  });
});

describe("noiseModel", () => {
  it("density matrix has noise model", () => {
    expect(noiseModel("density_matrix_mixed")).toBe(true);
  });
  it("statevector no noise model", () => {
    expect(noiseModel("statevector_full")).toBe(false);
  });
});

describe("forVariational", () => {
  it("tensor network for variational", () => {
    expect(forVariational("tensor_network_mps")).toBe(true);
  });
  it("stabilizer not for variational", () => {
    expect(forVariational("stabilizer_clifford")).toBe(false);
  });
});

describe("backend", () => {
  it("stabilizer uses tableau gottesman knill", () => {
    expect(backend("stabilizer_clifford")).toBe("tableau_gottesman_knill");
  });
});

describe("bestUse", () => {
  it("tensor network best for low entangle variational", () => {
    expect(bestUse("tensor_network_mps")).toBe("low_entangle_variational_circuit");
  });
});

describe("quantumSims", () => {
  it("returns 5 types", () => {
    expect(quantumSims()).toHaveLength(5);
  });
});
