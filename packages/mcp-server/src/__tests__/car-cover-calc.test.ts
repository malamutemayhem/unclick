import { describe, it, expect } from "vitest";
import {
  weatherProtect, fitQuality, scratchProtect, breathability,
  coverCost, uvResist, lockGrommet, fabricLayers,
  bestStorage, carCovers,
} from "../car-cover-calc.js";

describe("weatherProtect", () => {
  it("all weather multi layer best weather protection", () => {
    expect(weatherProtect("all_weather_multi_layer")).toBeGreaterThan(weatherProtect("indoor_flannel_soft"));
  });
});

describe("fitQuality", () => {
  it("custom fit breathable best fit", () => {
    expect(fitQuality("custom_fit_breathable")).toBeGreaterThan(fitQuality("universal_polyester_basic"));
  });
});

describe("scratchProtect", () => {
  it("indoor flannel soft best scratch protection", () => {
    expect(scratchProtect("indoor_flannel_soft")).toBeGreaterThan(scratchProtect("universal_polyester_basic"));
  });
});

describe("breathability", () => {
  it("custom fit breathable most breathable", () => {
    expect(breathability("custom_fit_breathable")).toBeGreaterThan(breathability("all_weather_multi_layer"));
  });
});

describe("coverCost", () => {
  it("carport portable canopy most expensive", () => {
    expect(coverCost("carport_portable_canopy")).toBeGreaterThan(coverCost("universal_polyester_basic"));
  });
});

describe("uvResist", () => {
  it("all weather multi layer is uv resistant", () => {
    expect(uvResist("all_weather_multi_layer")).toBe(true);
  });
  it("indoor flannel soft is not", () => {
    expect(uvResist("indoor_flannel_soft")).toBe(false);
  });
});

describe("lockGrommet", () => {
  it("custom fit breathable has lock grommet", () => {
    expect(lockGrommet("custom_fit_breathable")).toBe(true);
  });
  it("universal polyester basic does not", () => {
    expect(lockGrommet("universal_polyester_basic")).toBe(false);
  });
});

describe("fabricLayers", () => {
  it("all weather multi layer uses five layer silver reflective", () => {
    expect(fabricLayers("all_weather_multi_layer")).toBe("five_layer_silver_reflective");
  });
});

describe("bestStorage", () => {
  it("indoor flannel soft best for garage showroom collector", () => {
    expect(bestStorage("indoor_flannel_soft")).toBe("garage_showroom_collector");
  });
});

describe("carCovers", () => {
  it("returns 5 types", () => {
    expect(carCovers()).toHaveLength(5);
  });
});
