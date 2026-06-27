import { describe, it, expect } from "vitest";
import {
  pullOutStrength, installEase, removability, wallDamage,
  anchorCost, needsPreDrill, hollowWallOk, anchorMaterial,
  bestWall, wallAnchors,
} from "../wall-anchor-calc.js";

describe("pullOutStrength", () => {
  it("toggle bolt spring highest pull out strength", () => {
    expect(pullOutStrength("toggle_bolt_spring")).toBeGreaterThan(pullOutStrength("plastic_expansion_ribbed"));
  });
});

describe("installEase", () => {
  it("self drilling zinc easiest install", () => {
    expect(installEase("self_drilling_zinc")).toBeGreaterThan(installEase("concrete_wedge_sleeve"));
  });
});

describe("removability", () => {
  it("plastic expansion ribbed most removable", () => {
    expect(removability("plastic_expansion_ribbed")).toBeGreaterThan(removability("concrete_wedge_sleeve"));
  });
});

describe("wallDamage", () => {
  it("plastic expansion ribbed least wall damage", () => {
    expect(wallDamage("plastic_expansion_ribbed")).toBeGreaterThan(wallDamage("concrete_wedge_sleeve"));
  });
});

describe("anchorCost", () => {
  it("concrete wedge sleeve most expensive", () => {
    expect(anchorCost("concrete_wedge_sleeve")).toBeGreaterThan(anchorCost("plastic_expansion_ribbed"));
  });
});

describe("needsPreDrill", () => {
  it("plastic expansion ribbed needs pre drill", () => {
    expect(needsPreDrill("plastic_expansion_ribbed")).toBe(true);
  });
  it("self drilling zinc does not", () => {
    expect(needsPreDrill("self_drilling_zinc")).toBe(false);
  });
});

describe("hollowWallOk", () => {
  it("toggle bolt spring works in hollow wall", () => {
    expect(hollowWallOk("toggle_bolt_spring")).toBe(true);
  });
  it("concrete wedge sleeve does not", () => {
    expect(hollowWallOk("concrete_wedge_sleeve")).toBe(false);
  });
});

describe("anchorMaterial", () => {
  it("toggle bolt spring uses steel spring wing toggle", () => {
    expect(anchorMaterial("toggle_bolt_spring")).toBe("steel_spring_wing_toggle");
  });
});

describe("bestWall", () => {
  it("concrete wedge sleeve best for concrete masonry block", () => {
    expect(bestWall("concrete_wedge_sleeve")).toBe("concrete_masonry_block");
  });
});

describe("wallAnchors", () => {
  it("returns 5 types", () => {
    expect(wallAnchors()).toHaveLength(5);
  });
});
