import { describe, it, expect } from "vitest";
import {
  underflowDensity, overflowClarity, throughput, footprint,
  tcCost, continuous, forTailings, mechanism,
  bestUse, thickenerClarifierTypes,
} from "../thickener-clarifier-calc.js";

describe("underflowDensity", () => {
  it("paste thickener and deep cone highest underflow density", () => {
    expect(underflowDensity("paste_thickener")).toBeGreaterThan(underflowDensity("conventional_center"));
    expect(underflowDensity("deep_cone")).toBeGreaterThan(underflowDensity("conventional_center"));
  });
});

describe("overflowClarity", () => {
  it("lamella plate best overflow clarity", () => {
    expect(overflowClarity("lamella_plate")).toBeGreaterThan(overflowClarity("conventional_center"));
  });
});

describe("throughput", () => {
  it("high rate highest throughput", () => {
    expect(throughput("high_rate")).toBeGreaterThan(throughput("deep_cone"));
  });
});

describe("footprint", () => {
  it("lamella plate smallest footprint", () => {
    expect(footprint("lamella_plate")).toBeGreaterThan(footprint("conventional_center"));
  });
});

describe("tcCost", () => {
  it("deep cone most expensive", () => {
    expect(tcCost("deep_cone")).toBeGreaterThan(tcCost("conventional_center"));
  });
});

describe("continuous", () => {
  it("all types are continuous", () => {
    expect(continuous("conventional_center")).toBe(true);
    expect(continuous("deep_cone")).toBe(true);
  });
});

describe("forTailings", () => {
  it("paste thickener for tailings", () => {
    expect(forTailings("paste_thickener")).toBe(true);
  });
  it("lamella plate not for tailings", () => {
    expect(forTailings("lamella_plate")).toBe(false);
  });
});

describe("mechanism", () => {
  it("paste thickener uses steep cone high torque", () => {
    expect(mechanism("paste_thickener")).toBe("steep_cone_high_torque_rake_deep_bed_compression_paste");
  });
});

describe("bestUse", () => {
  it("deep cone for red mud alumina refinery", () => {
    expect(bestUse("deep_cone")).toBe("red_mud_alumina_refinery_ultra_high_density_underflow");
  });
});

describe("thickenerClarifierTypes", () => {
  it("returns 5 types", () => {
    expect(thickenerClarifierTypes()).toHaveLength(5);
  });
});
