import { describe, it, expect } from "vitest";
import {
  foldClean, printQuality, durability, feedReliable,
  weightCost, forEnvelope, forStructure, gsmRange,
  bestUse, paperWeights,
} from "../paper-weight-calc.js";

describe("foldClean", () => {
  it("text weight light cleanest fold", () => {
    expect(foldClean("text_weight_light")).toBeGreaterThan(foldClean("bristol_weight_rigid"));
  });
});

describe("printQuality", () => {
  it("bristol weight rigid best print quality", () => {
    expect(printQuality("bristol_weight_rigid")).toBeGreaterThan(printQuality("vellum_weight_sheer"));
  });
});

describe("durability", () => {
  it("bristol weight rigid most durable", () => {
    expect(durability("bristol_weight_rigid")).toBeGreaterThan(durability("text_weight_light"));
  });
});

describe("feedReliable", () => {
  it("text weight light most reliable feed", () => {
    expect(feedReliable("text_weight_light")).toBeGreaterThan(feedReliable("bristol_weight_rigid"));
  });
});

describe("weightCost", () => {
  it("bristol weight rigid most expensive", () => {
    expect(weightCost("bristol_weight_rigid")).toBeGreaterThan(weightCost("text_weight_light"));
  });
});

describe("forEnvelope", () => {
  it("text weight light is for envelope", () => {
    expect(forEnvelope("text_weight_light")).toBe(true);
  });
  it("cardstock weight thick not for envelope", () => {
    expect(forEnvelope("cardstock_weight_thick")).toBe(false);
  });
});

describe("forStructure", () => {
  it("cardstock weight thick is for structure", () => {
    expect(forStructure("cardstock_weight_thick")).toBe(true);
  });
  it("text weight light not for structure", () => {
    expect(forStructure("text_weight_light")).toBe(false);
  });
});

describe("gsmRange", () => {
  it("text weight light uses 75 to 100 gsm", () => {
    expect(gsmRange("text_weight_light")).toBe("75_to_100_gsm");
  });
});

describe("bestUse", () => {
  it("cover weight heavy best for card cover print", () => {
    expect(bestUse("cover_weight_heavy")).toBe("card_cover_print");
  });
});

describe("paperWeights", () => {
  it("returns 5 types", () => {
    expect(paperWeights()).toHaveLength(5);
  });
});
