import { describe, it, expect } from "vitest";
import {
  toneClarity, fitDifficulty, stringSpacing, durability,
  fittingCost, preShaped, needsCarving, woodSpecies,
  bestUse, bridgeFittings,
} from "../bridge-fitting-calc.js";

describe("toneClarity", () => {
  it("maple violin carved best tone clarity", () => {
    expect(toneClarity("maple_violin_carved")).toBeGreaterThan(toneClarity("synthetic_student_pre"));
  });
});

describe("fitDifficulty", () => {
  it("maple violin carved hardest to fit", () => {
    expect(fitDifficulty("maple_violin_carved")).toBeGreaterThan(fitDifficulty("synthetic_student_pre"));
  });
});

describe("stringSpacing", () => {
  it("ebony guitar saddle best string spacing", () => {
    expect(stringSpacing("ebony_guitar_saddle")).toBeGreaterThan(stringSpacing("synthetic_student_pre"));
  });
});

describe("durability", () => {
  it("bone nut blank most durable", () => {
    expect(durability("bone_nut_blank")).toBeGreaterThan(durability("maple_violin_carved"));
  });
});

describe("fittingCost", () => {
  it("maple violin carved more expensive than bone", () => {
    expect(fittingCost("maple_violin_carved")).toBeGreaterThan(fittingCost("bone_nut_blank"));
  });
});

describe("preShaped", () => {
  it("synthetic student pre is pre shaped", () => {
    expect(preShaped("synthetic_student_pre")).toBe(true);
  });
  it("maple violin carved not pre shaped", () => {
    expect(preShaped("maple_violin_carved")).toBe(false);
  });
});

describe("needsCarving", () => {
  it("maple violin carved needs carving", () => {
    expect(needsCarving("maple_violin_carved")).toBe(true);
  });
  it("synthetic student pre no carving needed", () => {
    expect(needsCarving("synthetic_student_pre")).toBe(false);
  });
});

describe("woodSpecies", () => {
  it("maple violin carved uses bosnian maple aged", () => {
    expect(woodSpecies("maple_violin_carved")).toBe("bosnian_maple_aged");
  });
});

describe("bestUse", () => {
  it("ebony guitar saddle best for acoustic guitar saddle", () => {
    expect(bestUse("ebony_guitar_saddle")).toBe("acoustic_guitar_saddle");
  });
});

describe("bridgeFittings", () => {
  it("returns 5 types", () => {
    expect(bridgeFittings()).toHaveLength(5);
  });
});
