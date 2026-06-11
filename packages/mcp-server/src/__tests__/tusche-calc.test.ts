import { describe, it, expect } from "vitest";
import {
  toneRange, controlDraw, grainHold, mixEase,
  tuscheCost, waterSoluble, forWash, greaseBinder,
  bestUse, tusches,
} from "../tusche-calc.js";

describe("toneRange", () => {
  it("liquid tusche flow widest tone range", () => {
    expect(toneRange("liquid_tusche_flow")).toBeGreaterThan(toneRange("pencil_tusche_fine"));
  });
});

describe("controlDraw", () => {
  it("pencil tusche fine best draw control", () => {
    expect(controlDraw("pencil_tusche_fine")).toBeGreaterThan(controlDraw("spray_tusche_mist"));
  });
});

describe("grainHold", () => {
  it("stick tusche solid best grain hold", () => {
    expect(grainHold("stick_tusche_solid")).toBeGreaterThan(grainHold("spray_tusche_mist"));
  });
});

describe("mixEase", () => {
  it("liquid tusche flow easiest mix", () => {
    expect(mixEase("liquid_tusche_flow")).toBeGreaterThan(mixEase("pencil_tusche_fine"));
  });
});

describe("tuscheCost", () => {
  it("spray tusche mist most expensive", () => {
    expect(tuscheCost("spray_tusche_mist")).toBeGreaterThan(tuscheCost("crayon_tusche_draw"));
  });
});

describe("waterSoluble", () => {
  it("liquid tusche flow is water soluble", () => {
    expect(waterSoluble("liquid_tusche_flow")).toBe(true);
  });
  it("stick tusche solid not water soluble", () => {
    expect(waterSoluble("stick_tusche_solid")).toBe(false);
  });
});

describe("forWash", () => {
  it("liquid tusche flow is for wash", () => {
    expect(forWash("liquid_tusche_flow")).toBe(true);
  });
  it("crayon tusche draw not for wash", () => {
    expect(forWash("crayon_tusche_draw")).toBe(false);
  });
});

describe("greaseBinder", () => {
  it("crayon tusche draw uses crayon wax grease", () => {
    expect(greaseBinder("crayon_tusche_draw")).toBe("crayon_wax_grease");
  });
});

describe("bestUse", () => {
  it("liquid tusche flow best for tonal wash litho", () => {
    expect(bestUse("liquid_tusche_flow")).toBe("tonal_wash_litho");
  });
});

describe("tusches", () => {
  it("returns 5 types", () => {
    expect(tusches()).toHaveLength(5);
  });
});
