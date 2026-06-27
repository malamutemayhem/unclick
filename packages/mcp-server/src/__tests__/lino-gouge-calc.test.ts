import { describe, it, expect } from "vitest";
import {
  cutPrecision, materialRemoval, controlFeel, edgeRetention,
  gougeCost, forOutline, forClearing, bladeProfile,
  bestCut, linoGouges,
} from "../lino-gouge-calc.js";

describe("cutPrecision", () => {
  it("v gouge fine line best cut precision", () => {
    expect(cutPrecision("v_gouge_fine_line")).toBeGreaterThan(cutPrecision("u_gouge_wide_scoop"));
  });
});

describe("materialRemoval", () => {
  it("u gouge wide scoop best material removal", () => {
    expect(materialRemoval("u_gouge_wide_scoop")).toBeGreaterThan(materialRemoval("v_gouge_fine_line"));
  });
});

describe("controlFeel", () => {
  it("micro gouge stipple best control feel", () => {
    expect(controlFeel("micro_gouge_stipple")).toBeGreaterThan(controlFeel("clearance_gouge_flat"));
  });
});

describe("edgeRetention", () => {
  it("clearance gouge flat best edge retention", () => {
    expect(edgeRetention("clearance_gouge_flat")).toBeGreaterThan(edgeRetention("knife_blade_detail"));
  });
});

describe("gougeCost", () => {
  it("knife blade detail more expensive than v gouge", () => {
    expect(gougeCost("knife_blade_detail")).toBeGreaterThan(gougeCost("v_gouge_fine_line"));
  });
});

describe("forOutline", () => {
  it("v gouge fine line is for outline", () => {
    expect(forOutline("v_gouge_fine_line")).toBe(true);
  });
  it("u gouge wide scoop is not for outline", () => {
    expect(forOutline("u_gouge_wide_scoop")).toBe(false);
  });
});

describe("forClearing", () => {
  it("clearance gouge flat is for clearing", () => {
    expect(forClearing("clearance_gouge_flat")).toBe(true);
  });
  it("v gouge fine line is not for clearing", () => {
    expect(forClearing("v_gouge_fine_line")).toBe(false);
  });
});

describe("bladeProfile", () => {
  it("v gouge fine line uses v shape narrow angle", () => {
    expect(bladeProfile("v_gouge_fine_line")).toBe("v_shape_narrow_angle");
  });
});

describe("bestCut", () => {
  it("micro gouge stipple best for texture dot pattern", () => {
    expect(bestCut("micro_gouge_stipple")).toBe("texture_dot_pattern");
  });
});

describe("linoGouges", () => {
  it("returns 5 types", () => {
    expect(linoGouges()).toHaveLength(5);
  });
});
