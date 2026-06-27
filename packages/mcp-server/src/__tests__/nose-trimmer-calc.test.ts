import { describe, it, expect } from "vitest";
import {
  trimPrecision, comfort, cleanupEase, versatility,
  trimmerCost, needsBattery, waterproof, bladeType,
  bestUse, noseTrimmers,
} from "../nose-trimmer-calc.js";

describe("trimPrecision", () => {
  it("dual edge precision most precise", () => {
    expect(trimPrecision("dual_edge_precision")).toBeGreaterThan(trimPrecision("manual_scissor_spring"));
  });
});

describe("comfort", () => {
  it("waterproof shower safe most comfortable", () => {
    expect(comfort("waterproof_shower_safe")).toBeGreaterThan(comfort("manual_scissor_spring"));
  });
});

describe("cleanupEase", () => {
  it("vacuum collection clean easiest cleanup", () => {
    expect(cleanupEase("vacuum_collection_clean")).toBeGreaterThan(cleanupEase("rotary_blade_basic"));
  });
});

describe("versatility", () => {
  it("dual edge precision most versatile", () => {
    expect(versatility("dual_edge_precision")).toBeGreaterThan(versatility("manual_scissor_spring"));
  });
});

describe("trimmerCost", () => {
  it("vacuum collection clean most expensive", () => {
    expect(trimmerCost("vacuum_collection_clean")).toBeGreaterThan(trimmerCost("manual_scissor_spring"));
  });
});

describe("needsBattery", () => {
  it("rotary blade basic needs battery", () => {
    expect(needsBattery("rotary_blade_basic")).toBe(true);
  });
  it("manual scissor spring does not need battery", () => {
    expect(needsBattery("manual_scissor_spring")).toBe(false);
  });
});

describe("waterproof", () => {
  it("waterproof shower safe is waterproof", () => {
    expect(waterproof("waterproof_shower_safe")).toBe(true);
  });
  it("rotary blade basic is not waterproof", () => {
    expect(waterproof("rotary_blade_basic")).toBe(false);
  });
});

describe("bladeType", () => {
  it("vacuum collection clean uses rotary vacuum chamber", () => {
    expect(bladeType("vacuum_collection_clean")).toBe("rotary_vacuum_chamber");
  });
});

describe("bestUse", () => {
  it("manual scissor spring best for travel no battery needed", () => {
    expect(bestUse("manual_scissor_spring")).toBe("travel_no_battery_needed");
  });
});

describe("noseTrimmers", () => {
  it("returns 5 types", () => {
    expect(noseTrimmers()).toHaveLength(5);
  });
});
