import { describe, it, expect } from "vitest";
import {
  steamTemp, tankCapacity, heatUpTime, attachmentCount,
  cleanerCost, continuousSteam, pressurized, heatingElement,
  bestClean, steamCleaners,
} from "../steam-cleaner-calc.js";

describe("steamTemp", () => {
  it("commercial vapor highest steam temp", () => {
    expect(steamTemp("commercial_vapor")).toBeGreaterThan(steamTemp("handheld_compact"));
  });
});

describe("tankCapacity", () => {
  it("commercial vapor largest tank", () => {
    expect(tankCapacity("commercial_vapor")).toBeGreaterThan(tankCapacity("handheld_compact"));
  });
});

describe("heatUpTime", () => {
  it("handheld compact fastest heat up", () => {
    expect(heatUpTime("handheld_compact")).toBeGreaterThan(heatUpTime("commercial_vapor"));
  });
});

describe("attachmentCount", () => {
  it("cylinder canister most attachments", () => {
    expect(attachmentCount("cylinder_canister")).toBeGreaterThan(attachmentCount("wallpaper_strip"));
  });
});

describe("cleanerCost", () => {
  it("commercial vapor most expensive", () => {
    expect(cleanerCost("commercial_vapor")).toBeGreaterThan(cleanerCost("handheld_compact"));
  });
});

describe("continuousSteam", () => {
  it("cylinder canister has continuous steam", () => {
    expect(continuousSteam("cylinder_canister")).toBe(true);
  });
  it("handheld compact does not", () => {
    expect(continuousSteam("handheld_compact")).toBe(false);
  });
});

describe("pressurized", () => {
  it("commercial vapor is pressurized", () => {
    expect(pressurized("commercial_vapor")).toBe(true);
  });
  it("upright mop is not", () => {
    expect(pressurized("upright_mop")).toBe(false);
  });
});

describe("heatingElement", () => {
  it("commercial vapor uses industrial boiler high psi", () => {
    expect(heatingElement("commercial_vapor")).toBe("industrial_boiler_high_psi");
  });
});

describe("bestClean", () => {
  it("cylinder canister for whole home multi surface", () => {
    expect(bestClean("cylinder_canister")).toBe("whole_home_multi_surface");
  });
});

describe("steamCleaners", () => {
  it("returns 5 types", () => {
    expect(steamCleaners()).toHaveLength(5);
  });
});
