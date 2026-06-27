import { describe, it, expect } from "vitest";
import {
  chopQuality, throughput, fuelEfficiency, fieldSpeed,
  fcCost, selfPropelled, forCorn, cutterConfig,
  bestUse, forageChopperTypes,
} from "../forage-chopper-calc.js";

describe("chopQuality", () => {
  it("precision chop best chop quality", () => {
    expect(chopQuality("precision_chop")).toBeGreaterThan(chopQuality("direct_cut"));
  });
});

describe("throughput", () => {
  it("self propelled highest throughput", () => {
    expect(throughput("self_propelled")).toBeGreaterThan(throughput("stationary_blower"));
  });
});

describe("fuelEfficiency", () => {
  it("direct cut best fuel efficiency", () => {
    expect(fuelEfficiency("direct_cut")).toBeGreaterThan(fuelEfficiency("stationary_blower"));
  });
});

describe("fieldSpeed", () => {
  it("self propelled fastest field speed", () => {
    expect(fieldSpeed("self_propelled")).toBeGreaterThan(fieldSpeed("stationary_blower"));
  });
});

describe("fcCost", () => {
  it("self propelled most expensive", () => {
    expect(fcCost("self_propelled")).toBeGreaterThan(fcCost("stationary_blower"));
  });
});

describe("selfPropelled", () => {
  it("self propelled is self propelled", () => {
    expect(selfPropelled("self_propelled")).toBe(true);
  });
  it("pull type pto not self propelled", () => {
    expect(selfPropelled("pull_type_pto")).toBe(false);
  });
});

describe("forCorn", () => {
  it("self propelled for corn", () => {
    expect(forCorn("self_propelled")).toBe(true);
  });
  it("direct cut not for corn", () => {
    expect(forCorn("direct_cut")).toBe(false);
  });
});

describe("cutterConfig", () => {
  it("stationary blower uses fixed chopper blower", () => {
    expect(cutterConfig("stationary_blower")).toBe("stationary_chopper_blower_pit_silo_fill_bale_processor_fixed");
  });
});

describe("bestUse", () => {
  it("precision chop for precision corn silage", () => {
    expect(bestUse("precision_chop")).toBe("precision_corn_silage_kernel_processing_score_optimized_chop");
  });
});

describe("forageChopperTypes", () => {
  it("returns 5 types", () => {
    expect(forageChopperTypes()).toHaveLength(5);
  });
});
