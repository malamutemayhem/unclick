import { describe, it, expect } from "vitest";
import {
  colorDepth, layerControl, drySpeed, durability,
  temperaCost, traditional, forPanel, binderBase,
  bestUse, temperaPaints,
} from "../tempera-paint-calc.js";

describe("colorDepth", () => {
  it("egg tempera traditional deepest color", () => {
    expect(colorDepth("egg_tempera_traditional")).toBeGreaterThan(colorDepth("pva_tempera_student"));
  });
});

describe("layerControl", () => {
  it("egg tempera traditional best layer control", () => {
    expect(layerControl("egg_tempera_traditional")).toBeGreaterThan(layerControl("poster_paint_bright"));
  });
});

describe("drySpeed", () => {
  it("casein tempera matte fastest dry", () => {
    expect(drySpeed("casein_tempera_matte")).toBeGreaterThan(drySpeed("poster_paint_bright"));
  });
});

describe("durability", () => {
  it("egg tempera traditional most durable", () => {
    expect(durability("egg_tempera_traditional")).toBeGreaterThan(durability("poster_paint_bright"));
  });
});

describe("temperaCost", () => {
  it("gold ground tempera most expensive", () => {
    expect(temperaCost("gold_ground_tempera")).toBeGreaterThan(temperaCost("poster_paint_bright"));
  });
});

describe("traditional", () => {
  it("egg tempera traditional is traditional", () => {
    expect(traditional("egg_tempera_traditional")).toBe(true);
  });
  it("pva tempera student not traditional", () => {
    expect(traditional("pva_tempera_student")).toBe(false);
  });
});

describe("forPanel", () => {
  it("egg tempera traditional is for panel", () => {
    expect(forPanel("egg_tempera_traditional")).toBe(true);
  });
  it("pva tempera student not for panel", () => {
    expect(forPanel("pva_tempera_student")).toBe(false);
  });
});

describe("binderBase", () => {
  it("casein tempera matte uses milk protein binder", () => {
    expect(binderBase("casein_tempera_matte")).toBe("milk_protein_binder");
  });
});

describe("bestUse", () => {
  it("pva tempera student best for student craft paint", () => {
    expect(bestUse("pva_tempera_student")).toBe("student_craft_paint");
  });
});

describe("temperaPaints", () => {
  it("returns 5 types", () => {
    expect(temperaPaints()).toHaveLength(5);
  });
});
