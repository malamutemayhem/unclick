import { describe, it, expect } from "vitest";
import {
  bondStrength, cureSpeed, gapFill, tempResist,
  epoxyCost, flexible, forMetal, cureMethod,
  bestUse, epoxyAdhesives,
} from "../epoxy-adhesive-calc.js";

describe("bondStrength", () => {
  it("structural metal bond strongest bond", () => {
    expect(bondStrength("structural_metal_bond")).toBeGreaterThan(bondStrength("five_minute_rapid"));
  });
});

describe("cureSpeed", () => {
  it("five minute rapid fastest cure", () => {
    expect(cureSpeed("five_minute_rapid")).toBeGreaterThan(cureSpeed("structural_metal_bond"));
  });
});

describe("gapFill", () => {
  it("two part general best gap fill", () => {
    expect(gapFill("two_part_general")).toBeGreaterThan(gapFill("optical_clear_uv"));
  });
});

describe("tempResist", () => {
  it("structural metal bond best temp resistance", () => {
    expect(tempResist("structural_metal_bond")).toBeGreaterThan(tempResist("five_minute_rapid"));
  });
});

describe("epoxyCost", () => {
  it("optical clear uv most expensive", () => {
    expect(epoxyCost("optical_clear_uv")).toBeGreaterThan(epoxyCost("two_part_general"));
  });
});

describe("flexible", () => {
  it("optical clear uv is flexible", () => {
    expect(flexible("optical_clear_uv")).toBe(true);
  });
  it("two part general not flexible", () => {
    expect(flexible("two_part_general")).toBe(false);
  });
});

describe("forMetal", () => {
  it("structural metal bond is for metal", () => {
    expect(forMetal("structural_metal_bond")).toBe(true);
  });
  it("optical clear uv not for metal", () => {
    expect(forMetal("optical_clear_uv")).toBe(false);
  });
});

describe("cureMethod", () => {
  it("optical clear uv uses uv light photocure", () => {
    expect(cureMethod("optical_clear_uv")).toBe("uv_light_photocure");
  });
});

describe("bestUse", () => {
  it("five minute rapid best for quick prototype fix", () => {
    expect(bestUse("five_minute_rapid")).toBe("quick_prototype_fix");
  });
});

describe("epoxyAdhesives", () => {
  it("returns 5 types", () => {
    expect(epoxyAdhesives()).toHaveLength(5);
  });
});
