import { describe, it, expect } from "vitest";
import {
  cureQuality, throughput, pressureRange, voidContent,
  acCost, highPressure, forAerospace, curingConfig,
  bestUse, autoclaveCuringTypes,
} from "../autoclave-curing-calc.js";

describe("cureQuality", () => {
  it("large aerospace best cure quality", () => {
    expect(cureQuality("large_aerospace")).toBeGreaterThan(cureQuality("out_of_autoclave"));
  });
});

describe("throughput", () => {
  it("quick cycle highest throughput", () => {
    expect(throughput("quick_cycle")).toBeGreaterThan(throughput("large_aerospace"));
  });
});

describe("pressureRange", () => {
  it("large aerospace best pressure range", () => {
    expect(pressureRange("large_aerospace")).toBeGreaterThan(pressureRange("out_of_autoclave"));
  });
});

describe("voidContent", () => {
  it("large aerospace best void content", () => {
    expect(voidContent("large_aerospace")).toBeGreaterThan(voidContent("out_of_autoclave"));
  });
});

describe("acCost", () => {
  it("large aerospace most expensive", () => {
    expect(acCost("large_aerospace")).toBeGreaterThan(acCost("out_of_autoclave"));
  });
});

describe("highPressure", () => {
  it("standard autoclave is high pressure", () => {
    expect(highPressure("standard_autoclave")).toBe(true);
  });
  it("out of autoclave not high pressure", () => {
    expect(highPressure("out_of_autoclave")).toBe(false);
  });
});

describe("forAerospace", () => {
  it("large aerospace for aerospace", () => {
    expect(forAerospace("large_aerospace")).toBe(true);
  });
  it("quick cycle not for aerospace", () => {
    expect(forAerospace("quick_cycle")).toBe(false);
  });
});

describe("curingConfig", () => {
  it("microwave cure uses 2450mhz volumetric heat fast cycle", () => {
    expect(curingConfig("microwave_cure")).toBe("microwave_cure_autoclave_2450mhz_volumetric_heat_fast_cycle");
  });
});

describe("bestUse", () => {
  it("large aerospace for fuselage skin wide body wing", () => {
    expect(bestUse("large_aerospace")).toBe("fuselage_skin_large_aerospace_autoclave_curing_wide_body_wing");
  });
});

describe("autoclaveCuringTypes", () => {
  it("returns 5 types", () => {
    expect(autoclaveCuringTypes()).toHaveLength(5);
  });
});
