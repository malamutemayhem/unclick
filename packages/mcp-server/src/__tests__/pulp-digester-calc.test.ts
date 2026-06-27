import { describe, it, expect } from "vitest";
import {
  pulpStrength, throughput, chemicalRecovery, yieldRate,
  pdCost, continuous, forPaper, digesterConfig,
  bestUse, pulpDigesterTypes,
} from "../pulp-digester-calc.js";

describe("pulpStrength", () => {
  it("batch kraft best pulp strength", () => {
    expect(pulpStrength("batch_kraft")).toBeGreaterThan(pulpStrength("sulfite_acid"));
  });
});

describe("throughput", () => {
  it("continuous kraft highest throughput", () => {
    expect(throughput("continuous_kraft")).toBeGreaterThan(throughput("organosolv"));
  });
});

describe("chemicalRecovery", () => {
  it("organosolv best chemical recovery", () => {
    expect(chemicalRecovery("organosolv")).toBeGreaterThan(chemicalRecovery("sulfite_acid"));
  });
});

describe("yieldRate", () => {
  it("organosolv best yield rate", () => {
    expect(yieldRate("organosolv")).toBeGreaterThan(yieldRate("batch_kraft"));
  });
});

describe("pdCost", () => {
  it("continuous kraft most expensive", () => {
    expect(pdCost("continuous_kraft")).toBeGreaterThan(pdCost("soda_process"));
  });
});

describe("continuous", () => {
  it("continuous kraft is continuous", () => {
    expect(continuous("continuous_kraft")).toBe(true);
  });
  it("batch kraft not continuous", () => {
    expect(continuous("batch_kraft")).toBe(false);
  });
});

describe("forPaper", () => {
  it("batch kraft for paper", () => {
    expect(forPaper("batch_kraft")).toBe(true);
  });
  it("soda process not for paper", () => {
    expect(forPaper("soda_process")).toBe(false);
  });
});

describe("digesterConfig", () => {
  it("sulfite acid uses bisulfite cook dissolve lignin", () => {
    expect(digesterConfig("sulfite_acid")).toBe("sulfite_acid_pulp_digester_bisulfite_cook_dissolve_lignin_soft");
  });
});

describe("bestUse", () => {
  it("organosolv for biorefinery clean lignin recovery", () => {
    expect(bestUse("organosolv")).toBe("biorefinery_organosolv_digester_clean_lignin_recovery_green_pulp");
  });
});

describe("pulpDigesterTypes", () => {
  it("returns 5 types", () => {
    expect(pulpDigesterTypes()).toHaveLength(5);
  });
});
