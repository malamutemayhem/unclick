import { describe, it, expect } from "vitest";
import {
  coherence, gateSpeed, fidelity, scalability,
  qubitCost, cryogenic, forNisq, mechanism,
  bestUse, qubitTypes,
} from "../qubit-type-calc.js";

describe("coherence", () => {
  it("trapped ion yb longest coherence", () => {
    expect(coherence("trapped_ion_yb")).toBeGreaterThan(coherence("photonic_squeezed"));
  });
});

describe("gateSpeed", () => {
  it("superconducting transmon fastest gate", () => {
    expect(gateSpeed("superconducting_transmon")).toBeGreaterThan(gateSpeed("trapped_ion_yb"));
  });
});

describe("fidelity", () => {
  it("trapped ion yb highest fidelity", () => {
    expect(fidelity("trapped_ion_yb")).toBeGreaterThan(fidelity("photonic_squeezed"));
  });
});

describe("scalability", () => {
  it("silicon spin most scalable", () => {
    expect(scalability("silicon_spin")).toBeGreaterThan(scalability("trapped_ion_yb"));
  });
});

describe("qubitCost", () => {
  it("topological majorana most expensive", () => {
    expect(qubitCost("topological_majorana")).toBeGreaterThan(qubitCost("silicon_spin"));
  });
});

describe("cryogenic", () => {
  it("superconducting transmon is cryogenic", () => {
    expect(cryogenic("superconducting_transmon")).toBe(true);
  });
  it("trapped ion yb not cryogenic", () => {
    expect(cryogenic("trapped_ion_yb")).toBe(false);
  });
});

describe("forNisq", () => {
  it("superconducting transmon is for nisq", () => {
    expect(forNisq("superconducting_transmon")).toBe(true);
  });
  it("topological majorana not for nisq", () => {
    expect(forNisq("topological_majorana")).toBe(false);
  });
});

describe("mechanism", () => {
  it("trapped ion yb uses laser ion chain", () => {
    expect(mechanism("trapped_ion_yb")).toBe("laser_ion_chain");
  });
});

describe("bestUse", () => {
  it("silicon spin best for cmos compatible scale", () => {
    expect(bestUse("silicon_spin")).toBe("cmos_compatible_scale");
  });
});

describe("qubitTypes", () => {
  it("returns 5 types", () => {
    expect(qubitTypes()).toHaveLength(5);
  });
});
