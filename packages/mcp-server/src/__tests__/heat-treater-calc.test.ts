import { describe, it, expect } from "vitest";
import {
  tempAccuracy, throughput, atmosphereControl, uniformity,
  htCost, inert, forAmPart, treaterConfig,
  bestUse, heatTreaterTypes,
} from "../heat-treater-calc.js";

describe("tempAccuracy", () => {
  it("vacuum anneal best temp accuracy", () => {
    expect(tempAccuracy("vacuum_anneal")).toBeGreaterThan(tempAccuracy("stress_relieve"));
  });
});

describe("throughput", () => {
  it("stress relieve highest throughput", () => {
    expect(throughput("stress_relieve")).toBeGreaterThan(throughput("cryogenic_treat"));
  });
});

describe("atmosphereControl", () => {
  it("vacuum anneal best atmosphere control", () => {
    expect(atmosphereControl("vacuum_anneal")).toBeGreaterThan(atmosphereControl("cryogenic_treat"));
  });
});

describe("uniformity", () => {
  it("vacuum anneal best uniformity", () => {
    expect(uniformity("vacuum_anneal")).toBeGreaterThan(uniformity("cryogenic_treat"));
  });
});

describe("htCost", () => {
  it("vacuum anneal most expensive", () => {
    expect(htCost("vacuum_anneal")).toBeGreaterThan(htCost("stress_relieve"));
  });
});

describe("inert", () => {
  it("vacuum anneal is inert", () => {
    expect(inert("vacuum_anneal")).toBe(true);
  });
  it("stress relieve not inert", () => {
    expect(inert("stress_relieve")).toBe(false);
  });
});

describe("forAmPart", () => {
  it("vacuum anneal for am part", () => {
    expect(forAmPart("vacuum_anneal")).toBe(true);
  });
  it("case harden not for am part", () => {
    expect(forAmPart("case_harden")).toBe(false);
  });
});

describe("treaterConfig", () => {
  it("stress relieve uses sub critical hold slow cool relax", () => {
    expect(treaterConfig("stress_relieve")).toBe("stress_relieve_heat_treater_sub_critical_hold_slow_cool_relax");
  });
});

describe("bestUse", () => {
  it("vacuum anneal for titanium am part stress free ductile", () => {
    expect(bestUse("vacuum_anneal")).toBe("titanium_am_part_vacuum_anneal_heat_treater_stress_free_ductile");
  });
});

describe("heatTreaterTypes", () => {
  it("returns 5 types", () => {
    expect(heatTreaterTypes()).toHaveLength(5);
  });
});
