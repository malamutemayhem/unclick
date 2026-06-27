import { describe, it, expect } from "vitest";
import {
  slotPrecision, cutSpeed, sizeRange, finishQuality,
  fileCost, sizedToGauge, roundProfile, abrasiveType,
  bestUse, nutFiles,
} from "../nut-file-calc.js";

describe("slotPrecision", () => {
  it("gauged round set most precise", () => {
    expect(slotPrecision("gauged_round_set")).toBeGreaterThan(slotPrecision("welded_bead_abrasive"));
  });
});

describe("cutSpeed", () => {
  it("welded bead abrasive fastest cut", () => {
    expect(cutSpeed("welded_bead_abrasive")).toBeGreaterThan(cutSpeed("gauged_round_set"));
  });
});

describe("sizeRange", () => {
  it("gauged round set widest size range", () => {
    expect(sizeRange("gauged_round_set")).toBeGreaterThan(sizeRange("needle_flat_slim"));
  });
});

describe("finishQuality", () => {
  it("diamond coated fine best finish", () => {
    expect(finishQuality("diamond_coated_fine")).toBeGreaterThan(finishQuality("welded_bead_abrasive"));
  });
});

describe("fileCost", () => {
  it("gauged round set most expensive", () => {
    expect(fileCost("gauged_round_set")).toBeGreaterThan(fileCost("needle_flat_slim"));
  });
});

describe("sizedToGauge", () => {
  it("gauged round set is sized to gauge", () => {
    expect(sizedToGauge("gauged_round_set")).toBe(true);
  });
  it("diamond coated fine not sized to gauge", () => {
    expect(sizedToGauge("diamond_coated_fine")).toBe(false);
  });
});

describe("roundProfile", () => {
  it("gauged round set has round profile", () => {
    expect(roundProfile("gauged_round_set")).toBe(true);
  });
  it("needle flat slim no round profile", () => {
    expect(roundProfile("needle_flat_slim")).toBe(false);
  });
});

describe("abrasiveType", () => {
  it("diamond coated fine uses diamond grit coat", () => {
    expect(abrasiveType("diamond_coated_fine")).toBe("diamond_grit_coat");
  });
});

describe("bestUse", () => {
  it("gauged round set best for exact gauge slot", () => {
    expect(bestUse("gauged_round_set")).toBe("exact_gauge_slot");
  });
});

describe("nutFiles", () => {
  it("returns 5 types", () => {
    expect(nutFiles()).toHaveLength(5);
  });
});
