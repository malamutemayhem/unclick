import { describe, it, expect } from "vitest";
import {
  threshold, overhead, decodingSpeed, faultTolerance,
  ecCost, topological, forNearTerm, encoding,
  bestUse, quantumErrors,
} from "../quantum-error-calc.js";

describe("threshold", () => {
  it("surface code highest threshold", () => {
    expect(threshold("surface_code")).toBeGreaterThan(threshold("shor_9qubit"));
  });
});

describe("overhead", () => {
  it("steane 7qubit lowest overhead", () => {
    expect(overhead("steane_7qubit")).toBeGreaterThan(overhead("surface_code"));
  });
});

describe("decodingSpeed", () => {
  it("steane 7qubit fastest decoding", () => {
    expect(decodingSpeed("steane_7qubit")).toBeGreaterThan(decodingSpeed("color_code_2d"));
  });
});

describe("faultTolerance", () => {
  it("surface code best fault tolerance", () => {
    expect(faultTolerance("surface_code")).toBeGreaterThan(faultTolerance("shor_9qubit"));
  });
});

describe("ecCost", () => {
  it("surface code most expensive", () => {
    expect(ecCost("surface_code")).toBeGreaterThan(ecCost("steane_7qubit"));
  });
});

describe("topological", () => {
  it("surface code is topological", () => {
    expect(topological("surface_code")).toBe(true);
  });
  it("steane 7qubit not topological", () => {
    expect(topological("steane_7qubit")).toBe(false);
  });
});

describe("forNearTerm", () => {
  it("steane 7qubit is for near term", () => {
    expect(forNearTerm("steane_7qubit")).toBe(true);
  });
  it("surface code not for near term", () => {
    expect(forNearTerm("surface_code")).toBe(false);
  });
});

describe("encoding", () => {
  it("surface code uses 2d lattice stabilizer", () => {
    expect(encoding("surface_code")).toBe("2d_lattice_stabilizer");
  });
});

describe("bestUse", () => {
  it("color code 2d best for transversal gate set", () => {
    expect(bestUse("color_code_2d")).toBe("transversal_gate_set");
  });
});

describe("quantumErrors", () => {
  it("returns 5 types", () => {
    expect(quantumErrors()).toHaveLength(5);
  });
});
