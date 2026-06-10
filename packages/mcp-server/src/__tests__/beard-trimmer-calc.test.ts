import { describe, it, expect } from "vitest";
import {
  trimPrecision, lengthRange, cleanupEase, attachmentCount,
  trimmerCost, waterproof, vacuumSystem, bladeType,
  bestStyle, beardTrimmers,
} from "../beard-trimmer-calc.js";

describe("trimPrecision", () => {
  it("stubble precision most precise trim", () => {
    expect(trimPrecision("stubble_precision")).toBeGreaterThan(trimPrecision("all_in_one_kit"));
  });
});

describe("lengthRange", () => {
  it("full beard long most length range", () => {
    expect(lengthRange("full_beard_long")).toBeGreaterThan(lengthRange("stubble_precision"));
  });
});

describe("cleanupEase", () => {
  it("vacuum suction easiest cleanup", () => {
    expect(cleanupEase("vacuum_suction")).toBeGreaterThan(cleanupEase("full_beard_long"));
  });
});

describe("attachmentCount", () => {
  it("all in one kit most attachments", () => {
    expect(attachmentCount("all_in_one_kit")).toBeGreaterThan(attachmentCount("stubble_precision"));
  });
});

describe("trimmerCost", () => {
  it("all in one kit most expensive", () => {
    expect(trimmerCost("all_in_one_kit")).toBeGreaterThan(trimmerCost("full_beard_long"));
  });
});

describe("waterproof", () => {
  it("all in one kit is waterproof", () => {
    expect(waterproof("all_in_one_kit")).toBe(true);
  });
  it("stubble precision is not", () => {
    expect(waterproof("stubble_precision")).toBe(false);
  });
});

describe("vacuumSystem", () => {
  it("vacuum suction has vacuum system", () => {
    expect(vacuumSystem("vacuum_suction")).toBe(true);
  });
  it("cordless pro does not", () => {
    expect(vacuumSystem("cordless_pro")).toBe(false);
  });
});

describe("bladeType", () => {
  it("cordless pro uses carbon steel taper", () => {
    expect(bladeType("cordless_pro")).toBe("carbon_steel_taper");
  });
});

describe("bestStyle", () => {
  it("stubble precision for designer stubble edge", () => {
    expect(bestStyle("stubble_precision")).toBe("designer_stubble_edge");
  });
});

describe("beardTrimmers", () => {
  it("returns 5 types", () => {
    expect(beardTrimmers()).toHaveLength(5);
  });
});
