import { describe, it, expect } from "vitest";
import {
  profileAccuracy, throughput, temperatureControl, surfaceFinish,
  erCost, continuous, forSeal, extruderConfig,
  bestUse, extruderRubberTypes,
} from "../extruder-rubber-calc.js";

describe("profileAccuracy", () => {
  it("duplex extruder best profile accuracy", () => {
    expect(profileAccuracy("duplex_extruder")).toBeGreaterThan(profileAccuracy("hot_feed"));
  });
});

describe("throughput", () => {
  it("pin barrel highest throughput", () => {
    expect(throughput("pin_barrel")).toBeGreaterThan(throughput("hot_feed"));
  });
});

describe("temperatureControl", () => {
  it("pin barrel best temperature control", () => {
    expect(temperatureControl("pin_barrel")).toBeGreaterThan(temperatureControl("hot_feed"));
  });
});

describe("surfaceFinish", () => {
  it("vented extruder best surface finish", () => {
    expect(surfaceFinish("vented_extruder")).toBeGreaterThan(surfaceFinish("hot_feed"));
  });
});

describe("erCost", () => {
  it("duplex extruder most expensive", () => {
    expect(erCost("duplex_extruder")).toBeGreaterThan(erCost("hot_feed"));
  });
});

describe("continuous", () => {
  it("cold feed is continuous", () => {
    expect(continuous("cold_feed")).toBe(true);
  });
});

describe("forSeal", () => {
  it("cold feed for seal", () => {
    expect(forSeal("cold_feed")).toBe(true);
  });
  it("vented extruder not for seal", () => {
    expect(forSeal("vented_extruder")).toBe(false);
  });
});

describe("extruderConfig", () => {
  it("pin barrel uses barrel pin disrupt flow mix", () => {
    expect(extruderConfig("pin_barrel")).toBe("pin_barrel_rubber_extruder_barrel_pin_disrupt_flow_mix_homogenize");
  });
});

describe("bestUse", () => {
  it("vented extruder for medical rubber degas bubble free", () => {
    expect(bestUse("vented_extruder")).toBe("medical_rubber_vented_extruder_degas_bubble_free_smooth_surface");
  });
});

describe("extruderRubberTypes", () => {
  it("returns 5 types", () => {
    expect(extruderRubberTypes()).toHaveLength(5);
  });
});
