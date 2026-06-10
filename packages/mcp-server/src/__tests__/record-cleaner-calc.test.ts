import { describe, it, expect } from "vitest";
import {
  cleaningDepth, easeOfUse, batchSpeed, grooveSafe,
  cleanerCost, removesStatic, usesFluid, cleanMethod,
  bestCollection, recordCleaners,
} from "../record-cleaner-calc.js";

describe("cleaningDepth", () => {
  it("ultrasonic bath deepest cleaning", () => {
    expect(cleaningDepth("ultrasonic_bath")).toBeGreaterThan(cleaningDepth("velvet_brush_dry"));
  });
});

describe("easeOfUse", () => {
  it("velvet brush dry easiest to use", () => {
    expect(easeOfUse("velvet_brush_dry")).toBeGreaterThan(easeOfUse("vacuum_rcm"));
  });
});

describe("batchSpeed", () => {
  it("velvet brush dry fastest batch speed", () => {
    expect(batchSpeed("velvet_brush_dry")).toBeGreaterThan(batchSpeed("spin_clean_wet"));
  });
});

describe("grooveSafe", () => {
  it("ultrasonic bath safest for grooves", () => {
    expect(grooveSafe("ultrasonic_bath")).toBeGreaterThan(grooveSafe("spray_microfiber"));
  });
});

describe("cleanerCost", () => {
  it("vacuum rcm most expensive", () => {
    expect(cleanerCost("vacuum_rcm")).toBeGreaterThan(cleanerCost("velvet_brush_dry"));
  });
});

describe("removesStatic", () => {
  it("velvet brush dry removes static", () => {
    expect(removesStatic("velvet_brush_dry")).toBe(true);
  });
  it("spin clean wet does not", () => {
    expect(removesStatic("spin_clean_wet")).toBe(false);
  });
});

describe("usesFluid", () => {
  it("spin clean wet uses fluid", () => {
    expect(usesFluid("spin_clean_wet")).toBe(true);
  });
  it("velvet brush dry does not", () => {
    expect(usesFluid("velvet_brush_dry")).toBe(false);
  });
});

describe("cleanMethod", () => {
  it("ultrasonic bath uses cavitation bubble deep", () => {
    expect(cleanMethod("ultrasonic_bath")).toBe("cavitation_bubble_deep");
  });
});

describe("bestCollection", () => {
  it("ultrasonic bath for rare audiophile archive", () => {
    expect(bestCollection("ultrasonic_bath")).toBe("rare_audiophile_archive");
  });
});

describe("recordCleaners", () => {
  it("returns 5 types", () => {
    expect(recordCleaners()).toHaveLength(5);
  });
});
