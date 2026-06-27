import { describe, it, expect } from "vitest";
import {
  gearCapacity, accessSpeed, weatherProtection, comfortRating,
  bagCost, hasWheels, tsa_approved, closureType,
  bestScenario, cameraBags,
} from "../camera-bag-calc.js";

describe("gearCapacity", () => {
  it("rolling case highest capacity", () => {
    expect(gearCapacity("rolling_case")).toBeGreaterThan(gearCapacity("holster_pouch"));
  });
});

describe("accessSpeed", () => {
  it("holster pouch fastest access", () => {
    expect(accessSpeed("holster_pouch")).toBeGreaterThan(accessSpeed("hard_shell"));
  });
});

describe("weatherProtection", () => {
  it("hard shell best protection", () => {
    expect(weatherProtection("hard_shell")).toBeGreaterThan(weatherProtection("holster_pouch"));
  });
});

describe("comfortRating", () => {
  it("backpack most comfortable", () => {
    expect(comfortRating("backpack")).toBeGreaterThan(comfortRating("hard_shell"));
  });
});

describe("bagCost", () => {
  it("hard shell most expensive", () => {
    expect(bagCost("hard_shell")).toBeGreaterThan(bagCost("holster_pouch"));
  });
});

describe("hasWheels", () => {
  it("rolling case has wheels", () => {
    expect(hasWheels("rolling_case")).toBe(true);
  });
  it("backpack does not", () => {
    expect(hasWheels("backpack")).toBe(false);
  });
});

describe("tsa_approved", () => {
  it("backpack is tsa approved", () => {
    expect(tsa_approved("backpack")).toBe(true);
  });
  it("hard shell is not", () => {
    expect(tsa_approved("hard_shell")).toBe(false);
  });
});

describe("closureType", () => {
  it("hard shell uses latched foam lined pelican", () => {
    expect(closureType("hard_shell")).toBe("latched_foam_lined_pelican");
  });
});

describe("bestScenario", () => {
  it("shoulder sling for street event quick draw", () => {
    expect(bestScenario("shoulder_sling")).toBe("street_event_quick_draw");
  });
});

describe("cameraBags", () => {
  it("returns 5 types", () => {
    expect(cameraBags()).toHaveLength(5);
  });
});
