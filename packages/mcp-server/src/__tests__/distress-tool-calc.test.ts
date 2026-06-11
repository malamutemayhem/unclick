import { describe, it, expect } from "vitest";
import {
  colorIntense, blendSmooth, effectRange, drySpeed,
  toolCost, waterReactive, forEmboss, inkType,
  bestUse, distressTools,
} from "../distress-tool-calc.js";

describe("colorIntense", () => {
  it("oxide ink react most intense color", () => {
    expect(colorIntense("oxide_ink_react")).toBeGreaterThan(colorIntense("emboss_resist_clear"));
  });
});

describe("blendSmooth", () => {
  it("blending tool foam smoothest blend", () => {
    expect(blendSmooth("blending_tool_foam")).toBeGreaterThan(blendSmooth("splatter_brush_spray"));
  });
});

describe("effectRange", () => {
  it("oxide ink react widest effect range", () => {
    expect(effectRange("oxide_ink_react")).toBeGreaterThan(effectRange("blending_tool_foam"));
  });
});

describe("drySpeed", () => {
  it("emboss resist clear fastest dry", () => {
    expect(drySpeed("emboss_resist_clear")).toBeGreaterThan(drySpeed("oxide_ink_react"));
  });
});

describe("toolCost", () => {
  it("oxide ink react most expensive", () => {
    expect(toolCost("oxide_ink_react")).toBeGreaterThan(toolCost("blending_tool_foam"));
  });
});

describe("waterReactive", () => {
  it("distress ink pad is water reactive", () => {
    expect(waterReactive("distress_ink_pad")).toBe(true);
  });
  it("blending tool foam not water reactive", () => {
    expect(waterReactive("blending_tool_foam")).toBe(false);
  });
});

describe("forEmboss", () => {
  it("oxide ink react is for emboss", () => {
    expect(forEmboss("oxide_ink_react")).toBe(true);
  });
  it("distress ink pad not for emboss", () => {
    expect(forEmboss("distress_ink_pad")).toBe(false);
  });
});

describe("inkType", () => {
  it("oxide ink react uses dye pigment oxide", () => {
    expect(inkType("oxide_ink_react")).toBe("dye_pigment_oxide");
  });
});

describe("bestUse", () => {
  it("distress ink pad best for general distress ink", () => {
    expect(bestUse("distress_ink_pad")).toBe("general_distress_ink");
  });
});

describe("distressTools", () => {
  it("returns 5 types", () => {
    expect(distressTools()).toHaveLength(5);
  });
});
