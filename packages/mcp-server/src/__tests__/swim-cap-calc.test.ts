import { describe, it, expect } from "vitest";
import {
  hydrodynamics, comfort, durability, warmth,
  capCost, waterTight, easyOnOff, capMaterial,
  bestSwim, swimCaps,
} from "../swim-cap-calc.js";

describe("hydrodynamics", () => {
  it("silicone durable smooth best hydrodynamics", () => {
    expect(hydrodynamics("silicone_durable_smooth")).toBeGreaterThan(hydrodynamics("lycra_fabric_comfort"));
  });
});

describe("comfort", () => {
  it("lycra fabric comfort most comfortable", () => {
    expect(comfort("lycra_fabric_comfort")).toBeGreaterThan(comfort("latex_thin_classic"));
  });
});

describe("durability", () => {
  it("silicone durable smooth most durable", () => {
    expect(durability("silicone_durable_smooth")).toBeGreaterThan(durability("latex_thin_classic"));
  });
});

describe("warmth", () => {
  it("neoprene thermal warm warmest", () => {
    expect(warmth("neoprene_thermal_warm")).toBeGreaterThan(warmth("latex_thin_classic"));
  });
});

describe("capCost", () => {
  it("neoprene thermal warm most expensive", () => {
    expect(capCost("neoprene_thermal_warm")).toBeGreaterThan(capCost("latex_thin_classic"));
  });
});

describe("waterTight", () => {
  it("silicone durable smooth is water tight", () => {
    expect(waterTight("silicone_durable_smooth")).toBe(true);
  });
  it("lycra fabric comfort is not", () => {
    expect(waterTight("lycra_fabric_comfort")).toBe(false);
  });
});

describe("easyOnOff", () => {
  it("lycra fabric comfort is easy on off", () => {
    expect(easyOnOff("lycra_fabric_comfort")).toBe(true);
  });
  it("latex thin classic is not", () => {
    expect(easyOnOff("latex_thin_classic")).toBe(false);
  });
});

describe("capMaterial", () => {
  it("neoprene thermal warm uses neoprene insulated", () => {
    expect(capMaterial("neoprene_thermal_warm")).toBe("neoprene_insulated");
  });
});

describe("bestSwim", () => {
  it("neoprene thermal warm best for open water cold swim", () => {
    expect(bestSwim("neoprene_thermal_warm")).toBe("open_water_cold_swim");
  });
});

describe("swimCaps", () => {
  it("returns 5 types", () => {
    expect(swimCaps()).toHaveLength(5);
  });
});
