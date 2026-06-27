import { describe, it, expect } from "vitest";
import {
  bandwidth, insertionLoss, complexity, qFactor,
  imCost, tunable, forPa, topology,
  bestUse, impedanceMatches,
} from "../impedance-match-calc.js";

describe("bandwidth", () => {
  it("transformer coupled widest bandwidth", () => {
    expect(bandwidth("transformer_coupled")).toBeGreaterThan(bandwidth("t_network_high_q"));
  });
});

describe("insertionLoss", () => {
  it("stub quarter wave lowest insertion loss", () => {
    expect(insertionLoss("stub_quarter_wave")).toBeGreaterThan(insertionLoss("transformer_coupled"));
  });
});

describe("complexity", () => {
  it("l network simple least complex", () => {
    expect(complexity("l_network_simple")).toBeGreaterThan(complexity("transformer_coupled"));
  });
});

describe("qFactor", () => {
  it("t network high q highest q factor", () => {
    expect(qFactor("t_network_high_q")).toBeGreaterThan(qFactor("l_network_simple"));
  });
});

describe("imCost", () => {
  it("transformer coupled most expensive", () => {
    expect(imCost("transformer_coupled")).toBeGreaterThan(imCost("l_network_simple"));
  });
});

describe("tunable", () => {
  it("stub quarter wave is tunable", () => {
    expect(tunable("stub_quarter_wave")).toBe(true);
  });
  it("l network simple not tunable", () => {
    expect(tunable("l_network_simple")).toBe(false);
  });
});

describe("forPa", () => {
  it("pi network narrow for pa", () => {
    expect(forPa("pi_network_narrow")).toBe(true);
  });
  it("l network simple not for pa", () => {
    expect(forPa("l_network_simple")).toBe(false);
  });
});

describe("topology", () => {
  it("transformer coupled uses turns ratio wideband", () => {
    expect(topology("transformer_coupled")).toBe("turns_ratio_wideband");
  });
});

describe("bestUse", () => {
  it("stub quarter wave best for pcb microwave transition", () => {
    expect(bestUse("stub_quarter_wave")).toBe("pcb_microwave_transition");
  });
});

describe("impedanceMatches", () => {
  it("returns 5 types", () => {
    expect(impedanceMatches()).toHaveLength(5);
  });
});
