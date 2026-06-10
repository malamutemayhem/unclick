import { describe, it, expect } from "vitest";
import {
  tempAccuracy, readability, easeOfUse, tempRange,
  coneCost, autoShutoff, needsPlaque, coneShape,
  bestFiring, pyrometricCones,
} from "../pyrometric-cone-calc.js";

describe("tempAccuracy", () => {
  it("witness cone kiln sitter most accurate temp", () => {
    expect(tempAccuracy("witness_cone_kiln_sitter")).toBeGreaterThan(tempAccuracy("small_junior_bar"));
  });
});

describe("readability", () => {
  it("self supporting stand most readable", () => {
    expect(readability("self_supporting_stand")).toBeGreaterThan(readability("witness_cone_kiln_sitter"));
  });
});

describe("easeOfUse", () => {
  it("self supporting stand easiest to use", () => {
    expect(easeOfUse("self_supporting_stand")).toBeGreaterThan(easeOfUse("pyrometric_bar_guard"));
  });
});

describe("tempRange", () => {
  it("large senior tall widest temp range", () => {
    expect(tempRange("large_senior_tall")).toBeGreaterThan(tempRange("witness_cone_kiln_sitter"));
  });
});

describe("coneCost", () => {
  it("witness cone kiln sitter more expensive than self supporting", () => {
    expect(coneCost("witness_cone_kiln_sitter")).toBeGreaterThan(coneCost("self_supporting_stand"));
  });
});

describe("autoShutoff", () => {
  it("witness cone kiln sitter has auto shutoff", () => {
    expect(autoShutoff("witness_cone_kiln_sitter")).toBe(true);
  });
  it("self supporting stand has no auto shutoff", () => {
    expect(autoShutoff("self_supporting_stand")).toBe(false);
  });
});

describe("needsPlaque", () => {
  it("small junior bar needs plaque", () => {
    expect(needsPlaque("small_junior_bar")).toBe(true);
  });
  it("self supporting stand needs no plaque", () => {
    expect(needsPlaque("self_supporting_stand")).toBe(false);
  });
});

describe("coneShape", () => {
  it("self supporting stand uses tapered triangle base", () => {
    expect(coneShape("self_supporting_stand")).toBe("tapered_triangle_base");
  });
});

describe("bestFiring", () => {
  it("witness cone kiln sitter best for automatic kiln shutoff", () => {
    expect(bestFiring("witness_cone_kiln_sitter")).toBe("automatic_kiln_shutoff");
  });
});

describe("pyrometricCones", () => {
  it("returns 5 types", () => {
    expect(pyrometricCones()).toHaveLength(5);
  });
});
