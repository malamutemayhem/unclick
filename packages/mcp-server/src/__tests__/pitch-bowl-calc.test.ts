import { describe, it, expect } from "vitest";
import {
  holdForce, tiltControl, portability, heatRetain,
  bowlCost, needsPitch, freeform, bowlMaterial,
  bestUse, pitchBowls,
} from "../pitch-bowl-calc.js";

describe("holdForce", () => {
  it("cast iron heavy strongest hold", () => {
    expect(holdForce("cast_iron_heavy")).toBeGreaterThan(holdForce("leather_sandbag_flex"));
  });
});

describe("tiltControl", () => {
  it("steel hemisphere pro best tilt control", () => {
    expect(tiltControl("steel_hemisphere_pro")).toBeGreaterThan(tiltControl("wood_base_light"));
  });
});

describe("portability", () => {
  it("leather sandbag flex most portable", () => {
    expect(portability("leather_sandbag_flex")).toBeGreaterThan(portability("cast_iron_heavy"));
  });
});

describe("heatRetain", () => {
  it("cast iron heavy best heat retain", () => {
    expect(heatRetain("cast_iron_heavy")).toBeGreaterThan(heatRetain("leather_sandbag_flex"));
  });
});

describe("bowlCost", () => {
  it("cast iron heavy most expensive", () => {
    expect(bowlCost("cast_iron_heavy")).toBeGreaterThan(bowlCost("wood_base_light"));
  });
});

describe("needsPitch", () => {
  it("cast iron heavy needs pitch", () => {
    expect(needsPitch("cast_iron_heavy")).toBe(true);
  });
  it("leather sandbag flex no pitch needed", () => {
    expect(needsPitch("leather_sandbag_flex")).toBe(false);
  });
});

describe("freeform", () => {
  it("leather sandbag flex is freeform", () => {
    expect(freeform("leather_sandbag_flex")).toBe(true);
  });
  it("cast iron heavy not freeform", () => {
    expect(freeform("cast_iron_heavy")).toBe(false);
  });
});

describe("bowlMaterial", () => {
  it("cast iron heavy uses grey cast iron", () => {
    expect(bowlMaterial("cast_iron_heavy")).toBe("grey_cast_iron");
  });
});

describe("bestUse", () => {
  it("cast iron heavy best for heavy repousse chase", () => {
    expect(bestUse("cast_iron_heavy")).toBe("heavy_repousse_chase");
  });
});

describe("pitchBowls", () => {
  it("returns 5 types", () => {
    expect(pitchBowls()).toHaveLength(5);
  });
});
