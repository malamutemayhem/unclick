import { describe, it, expect } from "vitest";
import {
  waterEfficiency, coverageArea, installComplexity, maintenanceNeed,
  systemCost, hasWeatherSensor, undergroundPiping, waterDelivery,
  bestApplication, smartSprinklers,
} from "../smart-sprinkler-calc.js";

describe("waterEfficiency", () => {
  it("drip smart most efficient", () => {
    expect(waterEfficiency("drip_smart")).toBeGreaterThan(waterEfficiency("pop_up_rotor"));
  });
});

describe("coverageArea", () => {
  it("pop up rotor widest coverage", () => {
    expect(coverageArea("pop_up_rotor")).toBeGreaterThan(coverageArea("drip_smart"));
  });
});

describe("installComplexity", () => {
  it("pop up rotor most complex", () => {
    expect(installComplexity("pop_up_rotor")).toBeGreaterThan(installComplexity("drip_smart"));
  });
});

describe("maintenanceNeed", () => {
  it("micro spray highest maintenance", () => {
    expect(maintenanceNeed("micro_spray")).toBeGreaterThan(maintenanceNeed("weather_adaptive"));
  });
});

describe("systemCost", () => {
  it("weather adaptive most expensive", () => {
    expect(systemCost("weather_adaptive")).toBeGreaterThan(systemCost("drip_smart"));
  });
});

describe("hasWeatherSensor", () => {
  it("weather adaptive has sensor", () => {
    expect(hasWeatherSensor("weather_adaptive")).toBe(true);
  });
  it("zone controller does not", () => {
    expect(hasWeatherSensor("zone_controller")).toBe(false);
  });
});

describe("undergroundPiping", () => {
  it("pop up rotor has underground piping", () => {
    expect(undergroundPiping("pop_up_rotor")).toBe(true);
  });
  it("drip smart does not", () => {
    expect(undergroundPiping("drip_smart")).toBe(false);
  });
});

describe("waterDelivery", () => {
  it("drip smart uses slow emitter root zone", () => {
    expect(waterDelivery("drip_smart")).toBe("slow_emitter_root_zone");
  });
});

describe("bestApplication", () => {
  it("weather adaptive for drought region conservation", () => {
    expect(bestApplication("weather_adaptive")).toBe("drought_region_conservation");
  });
});

describe("smartSprinklers", () => {
  it("returns 5 types", () => {
    expect(smartSprinklers()).toHaveLength(5);
  });
});
