import { describe, it, expect } from "vitest";
import {
  stabilityScore, cleanEase, portability, longevityYears,
  chairCost, adjustableHeight, foldable, trayStyle,
  bestAge, highChairs,
} from "../high-chair-calc.js";

describe("stabilityScore", () => {
  it("traditional wooden most stable", () => {
    expect(stabilityScore("traditional_wooden")).toBeGreaterThan(stabilityScore("clip_on_portable"));
  });
});

describe("cleanEase", () => {
  it("clip on portable easiest to clean", () => {
    expect(cleanEase("clip_on_portable")).toBeGreaterThan(cleanEase("traditional_wooden"));
  });
});

describe("portability", () => {
  it("clip on portable most portable", () => {
    expect(portability("clip_on_portable")).toBeGreaterThan(portability("traditional_wooden"));
  });
});

describe("longevityYears", () => {
  it("convertible grow longest longevity", () => {
    expect(longevityYears("convertible_grow")).toBeGreaterThan(longevityYears("clip_on_portable"));
  });
});

describe("chairCost", () => {
  it("convertible grow most expensive", () => {
    expect(chairCost("convertible_grow")).toBeGreaterThan(chairCost("booster_seat"));
  });
});

describe("adjustableHeight", () => {
  it("convertible grow has adjustable height", () => {
    expect(adjustableHeight("convertible_grow")).toBe(true);
  });
  it("traditional wooden does not", () => {
    expect(adjustableHeight("traditional_wooden")).toBe(false);
  });
});

describe("foldable", () => {
  it("space saver fold is foldable", () => {
    expect(foldable("space_saver_fold")).toBe(true);
  });
  it("traditional wooden is not", () => {
    expect(foldable("traditional_wooden")).toBe(false);
  });
});

describe("trayStyle", () => {
  it("clip on portable uses table", () => {
    expect(trayStyle("clip_on_portable")).toBe("none_uses_table");
  });
});

describe("bestAge", () => {
  it("convertible grow for six months to adult", () => {
    expect(bestAge("convertible_grow")).toBe("six_months_to_adult");
  });
});

describe("highChairs", () => {
  it("returns 5 types", () => {
    expect(highChairs()).toHaveLength(5);
  });
});
