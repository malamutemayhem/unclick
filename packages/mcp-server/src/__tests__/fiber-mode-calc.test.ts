import { describe, it, expect } from "vitest";
import {
  bandwidth, reach, cost, alignment,
  fmCost, bendInsensitive, forDatacenter, coreType,
  bestUse, fiberModes,
} from "../fiber-mode-calc.js";

describe("bandwidth", () => {
  it("smf single mode widest bandwidth", () => {
    expect(bandwidth("smf_single_mode")).toBeGreaterThan(bandwidth("mmf_om3_multimode"));
  });
});

describe("reach", () => {
  it("smf single mode longest reach", () => {
    expect(reach("smf_single_mode")).toBeGreaterThan(reach("mmf_om3_multimode"));
  });
});

describe("cost", () => {
  it("mmf om3 cheapest overall cost", () => {
    expect(cost("mmf_om3_multimode")).toBeGreaterThan(cost("pmf_polarization"));
  });
});

describe("alignment", () => {
  it("mmf om3 easiest alignment", () => {
    expect(alignment("mmf_om3_multimode")).toBeGreaterThan(alignment("smf_single_mode"));
  });
});

describe("fmCost", () => {
  it("hollow core most expensive", () => {
    expect(fmCost("hollow_core_photonic")).toBeGreaterThan(fmCost("mmf_om3_multimode"));
  });
});

describe("bendInsensitive", () => {
  it("mmf om3 is bend insensitive", () => {
    expect(bendInsensitive("mmf_om3_multimode")).toBe(true);
  });
  it("smf single mode not bend insensitive", () => {
    expect(bendInsensitive("smf_single_mode")).toBe(false);
  });
});

describe("forDatacenter", () => {
  it("smf single mode for datacenter", () => {
    expect(forDatacenter("smf_single_mode")).toBe(true);
  });
  it("pmf polarization not for datacenter", () => {
    expect(forDatacenter("pmf_polarization")).toBe(false);
  });
});

describe("coreType", () => {
  it("pmf polarization uses elliptical stress rod", () => {
    expect(coreType("pmf_polarization")).toBe("elliptical_stress_rod");
  });
});

describe("bestUse", () => {
  it("hollow core photonic best for ultralow latency trading", () => {
    expect(bestUse("hollow_core_photonic")).toBe("ultralow_latency_trading");
  });
});

describe("fiberModes", () => {
  it("returns 5 types", () => {
    expect(fiberModes()).toHaveLength(5);
  });
});
