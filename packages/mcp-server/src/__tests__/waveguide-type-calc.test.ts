import { describe, it, expect } from "vitest";
import {
  confinement, propagationLoss, bandwidth, footprint,
  wgCost, cmosFab, forSensor, platform,
  bestUse, waveguideTypes,
} from "../waveguide-type-calc.js";

describe("confinement", () => {
  it("plasmonic metal highest confinement", () => {
    expect(confinement("plasmonic_metal")).toBeGreaterThanOrEqual(confinement("rib_soi"));
  });
});

describe("propagationLoss", () => {
  it("rib soi lowest propagation loss", () => {
    expect(propagationLoss("rib_soi")).toBeGreaterThan(propagationLoss("plasmonic_metal"));
  });
});

describe("bandwidth", () => {
  it("plasmonic metal widest bandwidth", () => {
    expect(bandwidth("plasmonic_metal")).toBeGreaterThan(bandwidth("photonic_crystal"));
  });
});

describe("footprint", () => {
  it("plasmonic metal smallest footprint", () => {
    expect(footprint("plasmonic_metal")).toBeGreaterThanOrEqual(footprint("strip_silicon"));
  });
});

describe("wgCost", () => {
  it("plasmonic metal most expensive", () => {
    expect(wgCost("plasmonic_metal")).toBeGreaterThan(wgCost("strip_silicon"));
  });
});

describe("cmosFab", () => {
  it("strip silicon is cmos fab compatible", () => {
    expect(cmosFab("strip_silicon")).toBe(true);
  });
  it("photonic crystal not cmos fab", () => {
    expect(cmosFab("photonic_crystal")).toBe(false);
  });
});

describe("forSensor", () => {
  it("slot enhanced for sensor", () => {
    expect(forSensor("slot_enhanced")).toBe(true);
  });
  it("strip silicon not for sensor", () => {
    expect(forSensor("strip_silicon")).toBe(false);
  });
});

describe("platform", () => {
  it("strip silicon uses 220nm soi", () => {
    expect(platform("strip_silicon")).toBe("220nm_soi");
  });
});

describe("bestUse", () => {
  it("photonic crystal best for slow light delay line", () => {
    expect(bestUse("photonic_crystal")).toBe("slow_light_delay_line");
  });
});

describe("waveguideTypes", () => {
  it("returns 5 types", () => {
    expect(waveguideTypes()).toHaveLength(5);
  });
});
