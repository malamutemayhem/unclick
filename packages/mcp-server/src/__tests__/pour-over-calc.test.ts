import { describe, it, expect } from "vitest";
import {
  brewClarity, brewBody, forgiveness, brewSpeed,
  dripperCost, needsPaperFilter, heatRetains, filterStyle,
  bestDrinker, pourOvers,
} from "../pour-over-calc.js";

describe("brewClarity", () => {
  it("chemex glass clearest brew", () => {
    expect(brewClarity("chemex_glass")).toBeGreaterThan(brewClarity("dripper_metal"));
  });
});

describe("brewBody", () => {
  it("dripper metal fullest body", () => {
    expect(brewBody("dripper_metal")).toBeGreaterThan(brewBody("chemex_glass"));
  });
});

describe("forgiveness", () => {
  it("clever immersion most forgiving", () => {
    expect(forgiveness("clever_immersion")).toBeGreaterThan(forgiveness("chemex_glass"));
  });
});

describe("brewSpeed", () => {
  it("dripper metal fastest brew", () => {
    expect(brewSpeed("dripper_metal")).toBeGreaterThan(brewSpeed("clever_immersion"));
  });
});

describe("dripperCost", () => {
  it("chemex glass most expensive", () => {
    expect(dripperCost("chemex_glass")).toBeGreaterThan(dripperCost("cone_ceramic"));
  });
});

describe("needsPaperFilter", () => {
  it("cone ceramic needs paper filter", () => {
    expect(needsPaperFilter("cone_ceramic")).toBe(true);
  });
  it("dripper metal does not", () => {
    expect(needsPaperFilter("dripper_metal")).toBe(false);
  });
});

describe("heatRetains", () => {
  it("cone ceramic retains heat", () => {
    expect(heatRetains("cone_ceramic")).toBe(true);
  });
  it("chemex glass does not", () => {
    expect(heatRetains("chemex_glass")).toBe(false);
  });
});

describe("filterStyle", () => {
  it("chemex glass uses thick bonded square paper", () => {
    expect(filterStyle("chemex_glass")).toBe("thick_bonded_square_paper");
  });
});

describe("bestDrinker", () => {
  it("clever immersion for beginner no technique needed", () => {
    expect(bestDrinker("clever_immersion")).toBe("beginner_no_technique_needed");
  });
});

describe("pourOvers", () => {
  it("returns 5 types", () => {
    expect(pourOvers()).toHaveLength(5);
  });
});
