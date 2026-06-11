import { describe, it, expect } from "vitest";
import {
  accuracy, rangeSpan, responseTime, maintenance,
  dmCost, inline, forSlurry, principle,
  bestUse, densityMeterTypes,
} from "../density-meter-calc.js";

describe("accuracy", () => {
  it("coriolis inline most accurate", () => {
    expect(accuracy("coriolis_inline")).toBeGreaterThan(accuracy("hydrometer_float"));
  });
});

describe("rangeSpan", () => {
  it("nuclear gamma ray widest range", () => {
    expect(rangeSpan("nuclear_gamma_ray")).toBeGreaterThan(rangeSpan("hydrometer_float"));
  });
});

describe("responseTime", () => {
  it("coriolis inline fastest response", () => {
    expect(responseTime("coriolis_inline")).toBeGreaterThan(responseTime("hydrometer_float"));
  });
});

describe("maintenance", () => {
  it("hydrometer float lowest maintenance", () => {
    expect(maintenance("hydrometer_float")).toBeGreaterThan(maintenance("nuclear_gamma_ray"));
  });
});

describe("dmCost", () => {
  it("nuclear gamma ray most expensive", () => {
    expect(dmCost("nuclear_gamma_ray")).toBeGreaterThan(dmCost("hydrometer_float"));
  });
});

describe("inline", () => {
  it("coriolis inline is inline", () => {
    expect(inline("coriolis_inline")).toBe(true);
  });
  it("hydrometer float not inline", () => {
    expect(inline("hydrometer_float")).toBe(false);
  });
});

describe("forSlurry", () => {
  it("nuclear gamma ray for slurry", () => {
    expect(forSlurry("nuclear_gamma_ray")).toBe(true);
  });
  it("coriolis inline not for slurry", () => {
    expect(forSlurry("coriolis_inline")).toBe(false);
  });
});

describe("principle", () => {
  it("ultrasonic uses pulse transit time", () => {
    expect(principle("ultrasonic_transit")).toBe("ultrasonic_pulse_transit_time_speed_of_sound_infer");
  });
});

describe("bestUse", () => {
  it("hydrometer for brewing winemaking", () => {
    expect(bestUse("hydrometer_float")).toBe("brewing_winemaking_battery_acid_simple_spot_check");
  });
});

describe("densityMeterTypes", () => {
  it("returns 5 types", () => {
    expect(densityMeterTypes()).toHaveLength(5);
  });
});
