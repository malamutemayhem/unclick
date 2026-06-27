import { describe, it, expect } from "vitest";
import {
  lineVariation, controlEase, inkFlow, tipRecovery,
  brushCost, refillable, bentTip, tipMaterial,
  bestStyle, brushPens,
} from "../brush-pen-calc.js";

describe("lineVariation", () => {
  it("sable hair natural best line variation", () => {
    expect(lineVariation("sable_hair_natural")).toBeGreaterThan(lineVariation("felt_tip_firm"));
  });
});

describe("controlEase", () => {
  it("felt tip firm easiest to control", () => {
    expect(controlEase("felt_tip_firm")).toBeGreaterThan(controlEase("sable_hair_natural"));
  });
});

describe("inkFlow", () => {
  it("water brush refill best ink flow", () => {
    expect(inkFlow("water_brush_refill")).toBeGreaterThan(inkFlow("fude_bent_tip"));
  });
});

describe("tipRecovery", () => {
  it("sable hair natural best tip recovery", () => {
    expect(tipRecovery("sable_hair_natural")).toBeGreaterThan(tipRecovery("felt_tip_firm"));
  });
});

describe("brushCost", () => {
  it("sable hair natural most expensive", () => {
    expect(brushCost("sable_hair_natural")).toBeGreaterThan(brushCost("felt_tip_firm"));
  });
});

describe("refillable", () => {
  it("water brush refill is refillable", () => {
    expect(refillable("water_brush_refill")).toBe(true);
  });
  it("felt tip firm is not refillable", () => {
    expect(refillable("felt_tip_firm")).toBe(false);
  });
});

describe("bentTip", () => {
  it("fude bent tip has bent tip", () => {
    expect(bentTip("fude_bent_tip")).toBe(true);
  });
  it("sable hair natural does not have bent tip", () => {
    expect(bentTip("sable_hair_natural")).toBe(false);
  });
});

describe("tipMaterial", () => {
  it("sable hair natural uses kolinsky sable hair", () => {
    expect(tipMaterial("sable_hair_natural")).toBe("kolinsky_sable_hair");
  });
});

describe("bestStyle", () => {
  it("fude bent tip best for manga effect line", () => {
    expect(bestStyle("fude_bent_tip")).toBe("manga_effect_line");
  });
});

describe("brushPens", () => {
  it("returns 5 types", () => {
    expect(brushPens()).toHaveLength(5);
  });
});
