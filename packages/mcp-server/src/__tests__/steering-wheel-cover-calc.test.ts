import { describe, it, expect } from "vitest";
import {
  gripQuality, comfort, heatResist, aestheticAppeal,
  coverCost, easyInstall, odorFree, coverMaterial,
  bestClimate, steeringWheelCovers,
} from "../steering-wheel-cover-calc.js";

describe("gripQuality", () => {
  it("silicone grip sport best grip", () => {
    expect(gripQuality("silicone_grip_sport")).toBeGreaterThan(gripQuality("wood_grain_luxury"));
  });
});

describe("comfort", () => {
  it("sheepskin wool warm most comfortable", () => {
    expect(comfort("sheepskin_wool_warm")).toBeGreaterThan(comfort("wood_grain_luxury"));
  });
});

describe("heatResist", () => {
  it("silicone grip sport best heat resistance", () => {
    expect(heatResist("silicone_grip_sport")).toBeGreaterThan(heatResist("sheepskin_wool_warm"));
  });
});

describe("aestheticAppeal", () => {
  it("wood grain luxury highest aesthetic appeal", () => {
    expect(aestheticAppeal("wood_grain_luxury")).toBeGreaterThan(aestheticAppeal("silicone_grip_sport"));
  });
});

describe("coverCost", () => {
  it("wood grain luxury most expensive", () => {
    expect(coverCost("wood_grain_luxury")).toBeGreaterThan(coverCost("silicone_grip_sport"));
  });
});

describe("easyInstall", () => {
  it("silicone grip sport easy install", () => {
    expect(easyInstall("silicone_grip_sport")).toBe(true);
  });
  it("leather wrap stitch is not", () => {
    expect(easyInstall("leather_wrap_stitch")).toBe(false);
  });
});

describe("odorFree", () => {
  it("silicone grip sport is odor free", () => {
    expect(odorFree("silicone_grip_sport")).toBe(true);
  });
  it("leather wrap stitch is not", () => {
    expect(odorFree("leather_wrap_stitch")).toBe(false);
  });
});

describe("coverMaterial", () => {
  it("leather wrap stitch uses genuine leather hand sewn", () => {
    expect(coverMaterial("leather_wrap_stitch")).toBe("genuine_leather_hand_sewn");
  });
});

describe("bestClimate", () => {
  it("sheepskin wool warm best for cold winter frost guard", () => {
    expect(bestClimate("sheepskin_wool_warm")).toBe("cold_winter_frost_guard");
  });
});

describe("steeringWheelCovers", () => {
  it("returns 5 types", () => {
    expect(steeringWheelCovers()).toHaveLength(5);
  });
});
