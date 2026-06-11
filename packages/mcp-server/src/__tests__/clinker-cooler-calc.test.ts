import { describe, it, expect } from "vitest";
import {
  coolingEfficiency, throughput, heatRecovery, clinkerQuality,
  clCost, inline, forModern, coolerConfig,
  bestUse, clinkerCoolerTypes,
} from "../clinker-cooler-calc.js";

describe("coolingEfficiency", () => {
  it("rapid cooler best cooling efficiency", () => {
    expect(coolingEfficiency("rapid_cooler")).toBeGreaterThan(coolingEfficiency("satellite_cooler"));
  });
});

describe("throughput", () => {
  it("grate cooler highest throughput", () => {
    expect(throughput("grate_cooler")).toBeGreaterThan(throughput("shaft_cooler"));
  });
});

describe("heatRecovery", () => {
  it("rapid cooler best heat recovery", () => {
    expect(heatRecovery("rapid_cooler")).toBeGreaterThan(heatRecovery("satellite_cooler"));
  });
});

describe("clinkerQuality", () => {
  it("rapid cooler best clinker quality", () => {
    expect(clinkerQuality("rapid_cooler")).toBeGreaterThan(clinkerQuality("satellite_cooler"));
  });
});

describe("clCost", () => {
  it("rapid cooler most expensive", () => {
    expect(clCost("rapid_cooler")).toBeGreaterThan(clCost("shaft_cooler"));
  });
});

describe("inline", () => {
  it("grate cooler is inline", () => {
    expect(inline("grate_cooler")).toBe(true);
  });
  it("shaft cooler not inline", () => {
    expect(inline("shaft_cooler")).toBe(false);
  });
});

describe("forModern", () => {
  it("grate cooler for modern", () => {
    expect(forModern("grate_cooler")).toBe(true);
  });
  it("rotary cooler not for modern", () => {
    expect(forModern("rotary_cooler")).toBe(false);
  });
});

describe("coolerConfig", () => {
  it("satellite cooler uses tubes mounted kiln shell", () => {
    expect(coolerConfig("satellite_cooler")).toBe("satellite_cooler_clinker_tubes_mounted_kiln_shell_gravity_cool");
  });
});

describe("bestUse", () => {
  it("shaft cooler for small cement plant vertical", () => {
    expect(bestUse("shaft_cooler")).toBe("small_cement_plant_shaft_cooler_vertical_counter_flow_compact");
  });
});

describe("clinkerCoolerTypes", () => {
  it("returns 5 types", () => {
    expect(clinkerCoolerTypes()).toHaveLength(5);
  });
});
