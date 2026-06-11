import { describe, it, expect } from "vitest";
import {
  gripStrength, nibbleFine, controlSteady, glassRange,
  plierCost, curved, forScoreLine, jawProfile,
  bestUse, grozingPliers,
} from "../grozing-plier-calc.js";

describe("gripStrength", () => {
  it("running plier score strongest grip", () => {
    expect(gripStrength("running_plier_score")).toBeGreaterThan(gripStrength("needle_nose_detail"));
  });
});

describe("nibbleFine", () => {
  it("needle nose detail finest nibble", () => {
    expect(nibbleFine("needle_nose_detail")).toBeGreaterThan(nibbleFine("running_plier_score"));
  });
});

describe("controlSteady", () => {
  it("running plier score steadiest control", () => {
    expect(controlSteady("running_plier_score")).toBeGreaterThan(controlSteady("breaker_grozier_combo"));
  });
});

describe("glassRange", () => {
  it("breaker grozier combo widest glass range", () => {
    expect(glassRange("breaker_grozier_combo")).toBeGreaterThan(glassRange("needle_nose_detail"));
  });
});

describe("plierCost", () => {
  it("breaker grozier combo most expensive", () => {
    expect(plierCost("breaker_grozier_combo")).toBeGreaterThan(plierCost("flat_jaw_standard"));
  });
});

describe("curved", () => {
  it("curved jaw contour is curved", () => {
    expect(curved("curved_jaw_contour")).toBe(true);
  });
  it("flat jaw standard not curved", () => {
    expect(curved("flat_jaw_standard")).toBe(false);
  });
});

describe("forScoreLine", () => {
  it("running plier score is for score line", () => {
    expect(forScoreLine("running_plier_score")).toBe(true);
  });
  it("flat jaw standard not for score line", () => {
    expect(forScoreLine("flat_jaw_standard")).toBe(false);
  });
});

describe("jawProfile", () => {
  it("needle nose detail uses narrow pointed tip", () => {
    expect(jawProfile("needle_nose_detail")).toBe("narrow_pointed_tip");
  });
});

describe("bestUse", () => {
  it("flat jaw standard best for general glass grozing", () => {
    expect(bestUse("flat_jaw_standard")).toBe("general_glass_grozing");
  });
});

describe("grozingPliers", () => {
  it("returns 5 types", () => {
    expect(grozingPliers()).toHaveLength(5);
  });
});
