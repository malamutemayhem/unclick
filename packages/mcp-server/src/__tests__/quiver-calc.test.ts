import { describe, it, expect } from "vitest";
import {
  arrowCapacity, accessibility, portability, fletchingProtection,
  quiverCost, handsFree, adjustableAngle, quiverMaterial,
  bestStyle, quivers,
} from "../quiver-calc.js";

describe("arrowCapacity", () => {
  it("ground quiver target highest capacity", () => {
    expect(arrowCapacity("ground_quiver_target")).toBeGreaterThan(arrowCapacity("bow_mounted_compact"));
  });
});

describe("accessibility", () => {
  it("ground quiver target most accessible", () => {
    expect(accessibility("ground_quiver_target")).toBeGreaterThan(accessibility("back_quiver_traditional"));
  });
});

describe("portability", () => {
  it("bow mounted compact most portable", () => {
    expect(portability("bow_mounted_compact")).toBeGreaterThan(portability("ground_quiver_target"));
  });
});

describe("fletchingProtection", () => {
  it("ground quiver target best fletching protection", () => {
    expect(fletchingProtection("ground_quiver_target")).toBeGreaterThan(fletchingProtection("pocket_quiver_belt"));
  });
});

describe("quiverCost", () => {
  it("ground quiver target most expensive", () => {
    expect(quiverCost("ground_quiver_target")).toBeGreaterThan(quiverCost("pocket_quiver_belt"));
  });
});

describe("handsFree", () => {
  it("back quiver traditional is hands free", () => {
    expect(handsFree("back_quiver_traditional")).toBe(true);
  });
  it("ground quiver target is not", () => {
    expect(handsFree("ground_quiver_target")).toBe(false);
  });
});

describe("adjustableAngle", () => {
  it("hip quiver field has adjustable angle", () => {
    expect(adjustableAngle("hip_quiver_field")).toBe(true);
  });
  it("back quiver traditional does not", () => {
    expect(adjustableAngle("back_quiver_traditional")).toBe(false);
  });
});

describe("quiverMaterial", () => {
  it("back quiver traditional uses leather rawhide stitched", () => {
    expect(quiverMaterial("back_quiver_traditional")).toBe("leather_rawhide_stitched");
  });
});

describe("bestStyle", () => {
  it("ground quiver target best for olympic target indoor", () => {
    expect(bestStyle("ground_quiver_target")).toBe("olympic_target_indoor");
  });
});

describe("quivers", () => {
  it("returns 5 types", () => {
    expect(quivers()).toHaveLength(5);
  });
});
