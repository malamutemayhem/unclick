import { describe, it, expect } from "vitest";
import {
  wipeQuality, windLift, durability, installEase,
  bladeCost, allSeason, rubberCoated, rubberType,
  bestCondition, wiperBlades,
} from "../wiper-blade-calc.js";

describe("wipeQuality", () => {
  it("beam bracketless curved best wipe", () => {
    expect(wipeQuality("beam_bracketless_curved")).toBeGreaterThan(wipeQuality("conventional_frame_bracket"));
  });
});

describe("windLift", () => {
  it("beam bracketless curved best wind lift resistance", () => {
    expect(windLift("beam_bracketless_curved")).toBeGreaterThan(windLift("conventional_frame_bracket"));
  });
});

describe("durability", () => {
  it("winter heavy ice most durable", () => {
    expect(durability("winter_heavy_ice")).toBeGreaterThan(durability("conventional_frame_bracket"));
  });
});

describe("installEase", () => {
  it("beam bracketless curved easiest install", () => {
    expect(installEase("beam_bracketless_curved")).toBeGreaterThan(installEase("rear_specific_short"));
  });
});

describe("bladeCost", () => {
  it("winter heavy ice most expensive", () => {
    expect(bladeCost("winter_heavy_ice")).toBeGreaterThan(bladeCost("conventional_frame_bracket"));
  });
});

describe("allSeason", () => {
  it("beam bracketless curved is all season", () => {
    expect(allSeason("beam_bracketless_curved")).toBe(true);
  });
  it("winter heavy ice is not", () => {
    expect(allSeason("winter_heavy_ice")).toBe(false);
  });
});

describe("rubberCoated", () => {
  it("winter heavy ice is rubber coated", () => {
    expect(rubberCoated("winter_heavy_ice")).toBe(true);
  });
  it("beam bracketless curved is not", () => {
    expect(rubberCoated("beam_bracketless_curved")).toBe(false);
  });
});

describe("rubberType", () => {
  it("beam bracketless curved uses silicone infused graphite", () => {
    expect(rubberType("beam_bracketless_curved")).toBe("silicone_infused_graphite");
  });
});

describe("bestCondition", () => {
  it("winter heavy ice best for snow ice freezing rain", () => {
    expect(bestCondition("winter_heavy_ice")).toBe("snow_ice_freezing_rain");
  });
});

describe("wiperBlades", () => {
  it("returns 5 types", () => {
    expect(wiperBlades()).toHaveLength(5);
  });
});
