import { describe, it, expect } from "vitest";
import {
  speedup, qubitReq, noiseToler, classicalOverhead,
  qaCost, nisqFriendly, forOptimize, paradigm,
  bestUse, quantumAlgos,
} from "../quantum-algo-calc.js";

describe("speedup", () => {
  it("shor factoring greatest speedup", () => {
    expect(speedup("shor_factoring")).toBeGreaterThan(speedup("qaoa_combinatorial"));
  });
});

describe("qubitReq", () => {
  it("vqe variational fewest qubits", () => {
    expect(qubitReq("vqe_variational")).toBeGreaterThan(qubitReq("shor_factoring"));
  });
});

describe("noiseToler", () => {
  it("vqe variational most noise tolerant", () => {
    expect(noiseToler("vqe_variational")).toBeGreaterThan(noiseToler("shor_factoring"));
  });
});

describe("classicalOverhead", () => {
  it("vqe variational most classical overhead", () => {
    expect(classicalOverhead("vqe_variational")).toBeGreaterThan(classicalOverhead("grover_search"));
  });
});

describe("qaCost", () => {
  it("shor factoring most expensive", () => {
    expect(qaCost("shor_factoring")).toBeGreaterThan(qaCost("vqe_variational"));
  });
});

describe("nisqFriendly", () => {
  it("vqe variational is nisq friendly", () => {
    expect(nisqFriendly("vqe_variational")).toBe(true);
  });
  it("shor factoring not nisq friendly", () => {
    expect(nisqFriendly("shor_factoring")).toBe(false);
  });
});

describe("forOptimize", () => {
  it("qaoa for optimize", () => {
    expect(forOptimize("qaoa_combinatorial")).toBe(true);
  });
  it("grover not for optimize", () => {
    expect(forOptimize("grover_search")).toBe(false);
  });
});

describe("paradigm", () => {
  it("shor uses quantum fourier transform", () => {
    expect(paradigm("shor_factoring")).toBe("quantum_fourier_transform");
  });
});

describe("bestUse", () => {
  it("vqe best for molecular ground state", () => {
    expect(bestUse("vqe_variational")).toBe("molecular_ground_state_energy");
  });
});

describe("quantumAlgos", () => {
  it("returns 5 types", () => {
    expect(quantumAlgos()).toHaveLength(5);
  });
});
