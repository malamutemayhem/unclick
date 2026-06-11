import { describe, it, expect } from "vitest";
import {
  holdSecure, driveEase, clinchClean, sizeRange,
  nailCost, forRacing, forDraft, headStyle,
  bestUse, horseshoeNails,
} from "../horseshoe-nail-calc.js";

describe("holdSecure", () => {
  it("draft heavy large most secure hold", () => {
    expect(holdSecure("draft_heavy_large")).toBeGreaterThan(holdSecure("race_plate_thin"));
  });
});

describe("driveEase", () => {
  it("race plate thin easiest drive", () => {
    expect(driveEase("race_plate_thin")).toBeGreaterThan(driveEase("draft_heavy_large"));
  });
});

describe("clinchClean", () => {
  it("race plate thin cleanest clinch", () => {
    expect(clinchClean("race_plate_thin")).toBeGreaterThan(clinchClean("draft_heavy_large"));
  });
});

describe("sizeRange", () => {
  it("regular head general widest size range", () => {
    expect(sizeRange("regular_head_general")).toBeGreaterThan(sizeRange("race_plate_thin"));
  });
});

describe("nailCost", () => {
  it("race plate thin most expensive", () => {
    expect(nailCost("race_plate_thin")).toBeGreaterThan(nailCost("regular_head_general"));
  });
});

describe("forRacing", () => {
  it("race plate thin is for racing", () => {
    expect(forRacing("race_plate_thin")).toBe(true);
  });
  it("city head standard not for racing", () => {
    expect(forRacing("city_head_standard")).toBe(false);
  });
});

describe("forDraft", () => {
  it("draft heavy large is for draft", () => {
    expect(forDraft("draft_heavy_large")).toBe(true);
  });
  it("city head standard not for draft", () => {
    expect(forDraft("city_head_standard")).toBe(false);
  });
});

describe("headStyle", () => {
  it("race plate thin uses low profile race", () => {
    expect(headStyle("race_plate_thin")).toBe("low_profile_race");
  });
});

describe("bestUse", () => {
  it("regular head general best for all purpose nail", () => {
    expect(bestUse("regular_head_general")).toBe("all_purpose_nail");
  });
});

describe("horseshoeNails", () => {
  it("returns 5 types", () => {
    expect(horseshoeNails()).toHaveLength(5);
  });
});
