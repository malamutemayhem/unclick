import { describe, it, expect } from "vitest";
import {
  wipeQuality, windResist, durability, noiseLevel,
  wiperCost, allWeather, iceResist, bladeDesign,
  bestSeason, windshieldWipers,
} from "../windshield-wiper-calc.js";

describe("wipeQuality", () => {
  it("beam bracketless aero best wipe quality", () => {
    expect(wipeQuality("beam_bracketless_aero")).toBeGreaterThan(wipeQuality("conventional_frame_rubber"));
  });
});

describe("windResist", () => {
  it("beam bracketless aero best wind resist", () => {
    expect(windResist("beam_bracketless_aero")).toBeGreaterThan(windResist("conventional_frame_rubber"));
  });
});

describe("durability", () => {
  it("winter heavy ice boot most durable", () => {
    expect(durability("winter_heavy_ice_boot")).toBeGreaterThan(durability("conventional_frame_rubber"));
  });
});

describe("noiseLevel", () => {
  it("beam bracketless aero quietest", () => {
    expect(noiseLevel("beam_bracketless_aero")).toBeGreaterThan(noiseLevel("conventional_frame_rubber"));
  });
});

describe("wiperCost", () => {
  it("beam bracketless aero more expensive than conventional", () => {
    expect(wiperCost("beam_bracketless_aero")).toBeGreaterThan(wiperCost("conventional_frame_rubber"));
  });
});

describe("allWeather", () => {
  it("beam bracketless aero is all weather", () => {
    expect(allWeather("beam_bracketless_aero")).toBe(true);
  });
  it("conventional frame rubber is not all weather", () => {
    expect(allWeather("conventional_frame_rubber")).toBe(false);
  });
});

describe("iceResist", () => {
  it("winter heavy ice boot is ice resistant", () => {
    expect(iceResist("winter_heavy_ice_boot")).toBe(true);
  });
  it("beam bracketless aero is not ice resistant", () => {
    expect(iceResist("beam_bracketless_aero")).toBe(false);
  });
});

describe("bladeDesign", () => {
  it("winter heavy ice boot uses rubber boot sealed pivot", () => {
    expect(bladeDesign("winter_heavy_ice_boot")).toBe("rubber_boot_sealed_pivot");
  });
});

describe("bestSeason", () => {
  it("winter heavy ice boot best for snow ice freezing rain", () => {
    expect(bestSeason("winter_heavy_ice_boot")).toBe("snow_ice_freezing_rain");
  });
});

describe("windshieldWipers", () => {
  it("returns 5 types", () => {
    expect(windshieldWipers()).toHaveLength(5);
  });
});
