import { describe, it, expect } from "vitest";
import {
  patternDepth, patternVariety, controlEase, springFlex,
  chatterCost, multiLine, forWetClay, material,
  bestUse, chatteringTools,
} from "../chattering-tool-calc.js";

describe("patternDepth", () => {
  it("hacksaw blade repurp deepest pattern", () => {
    expect(patternDepth("hacksaw_blade_repurp")).toBeGreaterThan(patternDepth("credit_card_plastic"));
  });
});

describe("patternVariety", () => {
  it("serrated comb multi most variety", () => {
    expect(patternVariety("serrated_comb_multi")).toBeGreaterThan(patternVariety("credit_card_plastic"));
  });
});

describe("controlEase", () => {
  it("credit card plastic easiest control", () => {
    expect(controlEase("credit_card_plastic")).toBeGreaterThan(controlEase("hacksaw_blade_repurp"));
  });
});

describe("springFlex", () => {
  it("flexible spring steel best spring flex", () => {
    expect(springFlex("flexible_spring_steel")).toBeGreaterThan(springFlex("serrated_comb_multi"));
  });
});

describe("chatterCost", () => {
  it("serrated comb multi most expensive", () => {
    expect(chatterCost("serrated_comb_multi")).toBeGreaterThan(chatterCost("bamboo_strip_natural"));
  });
});

describe("multiLine", () => {
  it("hacksaw blade repurp is multi line", () => {
    expect(multiLine("hacksaw_blade_repurp")).toBe(true);
  });
  it("flexible spring steel not multi line", () => {
    expect(multiLine("flexible_spring_steel")).toBe(false);
  });
});

describe("forWetClay", () => {
  it("bamboo strip natural is for wet clay", () => {
    expect(forWetClay("bamboo_strip_natural")).toBe(true);
  });
  it("flexible spring steel not for wet clay", () => {
    expect(forWetClay("flexible_spring_steel")).toBe(false);
  });
});

describe("material", () => {
  it("hacksaw blade repurp uses recycled saw blade", () => {
    expect(material("hacksaw_blade_repurp")).toBe("recycled_saw_blade");
  });
});

describe("bestUse", () => {
  it("serrated comb multi best for multi line pattern", () => {
    expect(bestUse("serrated_comb_multi")).toBe("multi_line_pattern");
  });
});

describe("chatteringTools", () => {
  it("returns 5 types", () => {
    expect(chatteringTools()).toHaveLength(5);
  });
});
