import { describe, it, expect } from "vitest";
import {
  fidelity, speed, errorRate, universality,
  gateCost, clifford, forVqe, qubits,
  bestUse, quantumGates,
} from "../quantum-gate-calc.js";

describe("fidelity", () => {
  it("single qubit rx highest fidelity", () => {
    expect(fidelity("single_qubit_rx")).toBeGreaterThan(fidelity("toffoli_ccx"));
  });
});

describe("speed", () => {
  it("hadamard h fastest speed", () => {
    expect(speed("hadamard_h")).toBeGreaterThan(speed("t_gate_magic"));
  });
});

describe("errorRate", () => {
  it("single qubit rx lowest error rate", () => {
    expect(errorRate("single_qubit_rx")).toBeGreaterThan(errorRate("toffoli_ccx"));
  });
});

describe("universality", () => {
  it("t gate magic most universal", () => {
    expect(universality("t_gate_magic")).toBeGreaterThan(universality("single_qubit_rx"));
  });
});

describe("gateCost", () => {
  it("t gate magic most expensive", () => {
    expect(gateCost("t_gate_magic")).toBeGreaterThan(gateCost("single_qubit_rx"));
  });
});

describe("clifford", () => {
  it("cnot cx is clifford", () => {
    expect(clifford("cnot_cx")).toBe(true);
  });
  it("t gate magic not clifford", () => {
    expect(clifford("t_gate_magic")).toBe(false);
  });
});

describe("forVqe", () => {
  it("single qubit rx is for vqe", () => {
    expect(forVqe("single_qubit_rx")).toBe(true);
  });
  it("toffoli ccx not for vqe", () => {
    expect(forVqe("toffoli_ccx")).toBe(false);
  });
});

describe("qubits", () => {
  it("toffoli ccx uses three controlled", () => {
    expect(qubits("toffoli_ccx")).toBe("three_controlled");
  });
});

describe("bestUse", () => {
  it("hadamard h best for basis change transform", () => {
    expect(bestUse("hadamard_h")).toBe("basis_change_transform");
  });
});

describe("quantumGates", () => {
  it("returns 5 types", () => {
    expect(quantumGates()).toHaveLength(5);
  });
});
