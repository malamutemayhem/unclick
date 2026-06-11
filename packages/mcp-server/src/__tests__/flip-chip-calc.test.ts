import { describe, it, expect } from "vitest";
import {
  pitch, reliability, thermal, electrical,
  fcCost, underfill, forHpc, interconnect,
  bestUse, flipChips,
} from "../flip-chip-calc.js";

describe("pitch", () => {
  it("direct bond hybrid finest pitch", () => {
    expect(pitch("direct_bond_hybrid")).toBeGreaterThan(pitch("solder_bump_c4"));
  });
});

describe("reliability", () => {
  it("direct bond hybrid most reliable", () => {
    expect(reliability("direct_bond_hybrid")).toBeGreaterThan(reliability("anisotropic_acf"));
  });
});

describe("thermal", () => {
  it("direct bond hybrid best thermal", () => {
    expect(thermal("direct_bond_hybrid")).toBeGreaterThan(thermal("anisotropic_acf"));
  });
});

describe("electrical", () => {
  it("direct bond hybrid best electrical", () => {
    expect(electrical("direct_bond_hybrid")).toBeGreaterThan(electrical("anisotropic_acf"));
  });
});

describe("fcCost", () => {
  it("direct bond hybrid most expensive", () => {
    expect(fcCost("direct_bond_hybrid")).toBeGreaterThan(fcCost("anisotropic_acf"));
  });
});

describe("underfill", () => {
  it("solder bump c4 needs underfill", () => {
    expect(underfill("solder_bump_c4")).toBe(true);
  });
  it("gold stud thermo no underfill", () => {
    expect(underfill("gold_stud_thermo")).toBe(false);
  });
});

describe("forHpc", () => {
  it("copper pillar for hpc", () => {
    expect(forHpc("copper_pillar_micro")).toBe(true);
  });
  it("anisotropic acf not for hpc", () => {
    expect(forHpc("anisotropic_acf")).toBe(false);
  });
});

describe("interconnect", () => {
  it("direct bond hybrid uses cu cu oxide fusion", () => {
    expect(interconnect("direct_bond_hybrid")).toBe("cu_cu_oxide_fusion");
  });
});

describe("bestUse", () => {
  it("copper pillar best for advanced gpu", () => {
    expect(bestUse("copper_pillar_micro")).toBe("advanced_gpu_high_bump_count");
  });
});

describe("flipChips", () => {
  it("returns 5 types", () => {
    expect(flipChips()).toHaveLength(5);
  });
});
