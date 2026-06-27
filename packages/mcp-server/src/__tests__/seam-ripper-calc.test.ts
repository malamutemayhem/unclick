import { describe, it, expect } from "vitest";
import {
  ripSpeed, precision, fabricSafe, handComfort,
  ripperCost, needsBattery, hasLight, tipDesign,
  bestTask, seamRippers,
} from "../seam-ripper-calc.js";

describe("ripSpeed", () => {
  it("electric battery fastest rip speed", () => {
    expect(ripSpeed("electric_battery")).toBeGreaterThan(ripSpeed("surgical_precision"));
  });
});

describe("precision", () => {
  it("surgical precision most precise", () => {
    expect(precision("surgical_precision")).toBeGreaterThan(precision("electric_battery"));
  });
});

describe("fabricSafe", () => {
  it("surgical precision most fabric safe", () => {
    expect(fabricSafe("surgical_precision")).toBeGreaterThan(fabricSafe("electric_battery"));
  });
});

describe("handComfort", () => {
  it("ergonomic handle most comfortable", () => {
    expect(handComfort("ergonomic_handle")).toBeGreaterThan(handComfort("basic_fork_blade"));
  });
});

describe("ripperCost", () => {
  it("electric battery most expensive", () => {
    expect(ripperCost("electric_battery")).toBeGreaterThan(ripperCost("basic_fork_blade"));
  });
});

describe("needsBattery", () => {
  it("electric battery needs battery", () => {
    expect(needsBattery("electric_battery")).toBe(true);
  });
  it("basic fork blade does not", () => {
    expect(needsBattery("basic_fork_blade")).toBe(false);
  });
});

describe("hasLight", () => {
  it("lighted magnifier has light", () => {
    expect(hasLight("lighted_magnifier")).toBe(true);
  });
  it("electric battery does not", () => {
    expect(hasLight("electric_battery")).toBe(false);
  });
});

describe("tipDesign", () => {
  it("surgical precision uses micro point scalpel tip", () => {
    expect(tipDesign("surgical_precision")).toBe("micro_point_scalpel_tip");
  });
});

describe("bestTask", () => {
  it("electric battery for bulk seam removal", () => {
    expect(bestTask("electric_battery")).toBe("bulk_seam_removal");
  });
});

describe("seamRippers", () => {
  it("returns 5 types", () => {
    expect(seamRippers()).toHaveLength(5);
  });
});
