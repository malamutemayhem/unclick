import { describe, it, expect } from "vitest";
import {
  hardnessIncrease, ductilityEffect, processTemperatureC,
  coolingRate, costScore, throughHardening,
  requiresQuenchant, primaryPurpose, typicalSteel, heatTreatments,
} from "../heat-treatment-calc.js";

describe("hardnessIncrease", () => {
  it("quenching maximizes hardness", () => {
    expect(hardnessIncrease("quenching")).toBeGreaterThan(
      hardnessIncrease("annealing")
    );
  });
});

describe("ductilityEffect", () => {
  it("annealing best for ductility", () => {
    expect(ductilityEffect("annealing")).toBeGreaterThan(
      ductilityEffect("quenching")
    );
  });
});

describe("processTemperatureC", () => {
  it("case_hardening highest temp", () => {
    expect(processTemperatureC("case_hardening")).toBeGreaterThan(
      processTemperatureC("tempering")
    );
  });
});

describe("coolingRate", () => {
  it("quenching fastest cooling", () => {
    expect(coolingRate("quenching")).toBeGreaterThan(
      coolingRate("annealing")
    );
  });
});

describe("costScore", () => {
  it("case_hardening most expensive", () => {
    expect(costScore("case_hardening")).toBeGreaterThan(
      costScore("normalizing")
    );
  });
});

describe("throughHardening", () => {
  it("quenching is through hardening", () => {
    expect(throughHardening("quenching")).toBe(true);
  });
  it("case_hardening is not", () => {
    expect(throughHardening("case_hardening")).toBe(false);
  });
});

describe("requiresQuenchant", () => {
  it("quenching requires quenchant", () => {
    expect(requiresQuenchant("quenching")).toBe(true);
  });
  it("annealing does not", () => {
    expect(requiresQuenchant("annealing")).toBe(false);
  });
});

describe("primaryPurpose", () => {
  it("annealing for stress relief", () => {
    expect(primaryPurpose("annealing")).toBe("stress_relief");
  });
});

describe("typicalSteel", () => {
  it("tempering for tool steel", () => {
    expect(typicalSteel("tempering")).toBe("tool_steel");
  });
});

describe("heatTreatments", () => {
  it("returns 5 treatments", () => {
    expect(heatTreatments()).toHaveLength(5);
  });
});
