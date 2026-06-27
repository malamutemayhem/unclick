import { describe, it, expect } from "vitest";
import {
  precision, durability, speed, pasteRelease,
  stCost, reusable, forElectronics, aperture,
  bestUse, stencilPrintTypes,
} from "../stencil-print-calc.js";

describe("precision", () => {
  it("electroform most precise", () => {
    expect(precision("electroform_nickel_fine")).toBeGreaterThan(precision("hand_cut_paper_craft"));
  });
});

describe("durability", () => {
  it("laser cut most durable", () => {
    expect(durability("laser_cut_metal_smt")).toBeGreaterThan(durability("hand_cut_paper_craft"));
  });
});

describe("speed", () => {
  it("laser cut fastest", () => {
    expect(speed("laser_cut_metal_smt")).toBeGreaterThan(speed("hand_cut_paper_craft"));
  });
});

describe("pasteRelease", () => {
  it("electroform best paste release", () => {
    expect(pasteRelease("electroform_nickel_fine")).toBeGreaterThan(pasteRelease("hand_cut_paper_craft"));
  });
});

describe("stCost", () => {
  it("electroform most expensive", () => {
    expect(stCost("electroform_nickel_fine")).toBeGreaterThan(stCost("hand_cut_paper_craft"));
  });
});

describe("reusable", () => {
  it("laser cut is reusable", () => {
    expect(reusable("laser_cut_metal_smt")).toBe(true);
  });
  it("hand cut not reusable", () => {
    expect(reusable("hand_cut_paper_craft")).toBe(false);
  });
});

describe("forElectronics", () => {
  it("laser cut for electronics", () => {
    expect(forElectronics("laser_cut_metal_smt")).toBe(true);
  });
  it("hand cut not for electronics", () => {
    expect(forElectronics("hand_cut_paper_craft")).toBe(false);
  });
});

describe("aperture", () => {
  it("electroform uses smooth wall", () => {
    expect(aperture("electroform_nickel_fine")).toBe("electrodeposited_nickel_smooth_wall");
  });
});

describe("bestUse", () => {
  it("hand cut for art craft", () => {
    expect(bestUse("hand_cut_paper_craft")).toBe("art_craft_signage_stencil_spray");
  });
});

describe("stencilPrintTypes", () => {
  it("returns 5 types", () => {
    expect(stencilPrintTypes()).toHaveLength(5);
  });
});
