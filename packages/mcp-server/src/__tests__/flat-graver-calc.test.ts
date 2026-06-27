import { describe, it, expect } from "vitest";
import {
  metalRemoval, surfaceFinish, lineWidth, edgeRetention,
  graverCost, forBackground, carbideTip, bladeProfile,
  bestUse, flatGravers,
} from "../flat-graver-calc.js";

describe("metalRemoval", () => {
  it("carbide flat hard best metal removal", () => {
    expect(metalRemoval("carbide_flat_hard")).toBeGreaterThan(metalRemoval("narrow_flat_detail"));
  });
});

describe("surfaceFinish", () => {
  it("beveled flat angle best surface finish", () => {
    expect(surfaceFinish("beveled_flat_angle")).toBeGreaterThan(surfaceFinish("scorper_round_bottom"));
  });
});

describe("lineWidth", () => {
  it("standard flat wide widest line", () => {
    expect(lineWidth("standard_flat_wide")).toBeGreaterThan(lineWidth("narrow_flat_detail"));
  });
});

describe("edgeRetention", () => {
  it("carbide flat hard best edge retention", () => {
    expect(edgeRetention("carbide_flat_hard")).toBeGreaterThan(edgeRetention("standard_flat_wide"));
  });
});

describe("graverCost", () => {
  it("carbide flat hard most expensive", () => {
    expect(graverCost("carbide_flat_hard")).toBeGreaterThan(graverCost("standard_flat_wide"));
  });
});

describe("forBackground", () => {
  it("standard flat wide is for background", () => {
    expect(forBackground("standard_flat_wide")).toBe(true);
  });
  it("narrow flat detail not for background", () => {
    expect(forBackground("narrow_flat_detail")).toBe(false);
  });
});

describe("carbideTip", () => {
  it("carbide flat hard has carbide tip", () => {
    expect(carbideTip("carbide_flat_hard")).toBe(true);
  });
  it("standard flat wide no carbide tip", () => {
    expect(carbideTip("standard_flat_wide")).toBe(false);
  });
});

describe("bladeProfile", () => {
  it("standard flat wide uses rectangular cross section", () => {
    expect(bladeProfile("standard_flat_wide")).toBe("rectangular_cross_section");
  });
});

describe("bestUse", () => {
  it("carbide flat hard best for hardened metal engrave", () => {
    expect(bestUse("carbide_flat_hard")).toBe("hardened_metal_engrave");
  });
});

describe("flatGravers", () => {
  it("returns 5 types", () => {
    expect(flatGravers()).toHaveLength(5);
  });
});
