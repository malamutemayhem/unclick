import { describe, it, expect } from "vitest";
import {
  mixingAction, sheetQuality, rollSpeed, frictionRatio,
  trmCost, adjustableGap, forCompounding, millConfig,
  bestUse, twoRollMillTypes,
} from "../two-roll-mill-calc.js";

describe("mixingAction", () => {
  it("mixing mill best mixing action", () => {
    expect(mixingAction("mixing_mill")).toBeGreaterThan(mixingAction("cracker_mill"));
  });
});

describe("sheetQuality", () => {
  it("refiner mill best sheet quality", () => {
    expect(sheetQuality("refiner_mill")).toBeGreaterThan(sheetQuality("cracker_mill"));
  });
});

describe("rollSpeed", () => {
  it("warming mill fastest roll speed", () => {
    expect(rollSpeed("warming_mill")).toBeGreaterThan(rollSpeed("lab_mill"));
  });
});

describe("frictionRatio", () => {
  it("cracker mill highest friction ratio", () => {
    expect(frictionRatio("cracker_mill")).toBeGreaterThan(frictionRatio("warming_mill"));
  });
});

describe("trmCost", () => {
  it("refiner mill most expensive", () => {
    expect(trmCost("refiner_mill")).toBeGreaterThan(trmCost("lab_mill"));
  });
});

describe("adjustableGap", () => {
  it("mixing mill has adjustable gap", () => {
    expect(adjustableGap("mixing_mill")).toBe(true);
  });
  it("cracker mill not adjustable gap", () => {
    expect(adjustableGap("cracker_mill")).toBe(false);
  });
});

describe("forCompounding", () => {
  it("mixing mill for compounding", () => {
    expect(forCompounding("mixing_mill")).toBe(true);
  });
  it("warming mill not for compounding", () => {
    expect(forCompounding("warming_mill")).toBe(false);
  });
});

describe("millConfig", () => {
  it("cracker mill uses high friction ratio break down", () => {
    expect(millConfig("cracker_mill")).toBe("cracker_mill_high_friction_ratio_break_down_reclaim_rubber_scrap");
  });
});

describe("bestUse", () => {
  it("warming mill for preheat soften", () => {
    expect(bestUse("warming_mill")).toBe("preheat_soften_rubber_compound_before_calender_extruder_feed");
  });
});

describe("twoRollMillTypes", () => {
  it("returns 5 types", () => {
    expect(twoRollMillTypes()).toHaveLength(5);
  });
});
