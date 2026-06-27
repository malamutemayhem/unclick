import { describe, it, expect } from "vitest";
import {
  surfaceFinish, feedSpeed, maxWidth, depthAccuracy,
  tpCost, doubleSided, forHardwood, cutterConfig,
  bestUse, thicknessPlanerTypes,
} from "../thickness-planer-calc.js";

describe("surfaceFinish", () => {
  it("spiral cutterhead best surface finish", () => {
    expect(surfaceFinish("spiral_cutterhead")).toBeGreaterThan(surfaceFinish("single_side_benchtop"));
  });
});

describe("feedSpeed", () => {
  it("moulder planer combo fastest feed speed", () => {
    expect(feedSpeed("moulder_planer_combo")).toBeGreaterThan(feedSpeed("wide_drum_sander"));
  });
});

describe("maxWidth", () => {
  it("wide drum sander widest capacity", () => {
    expect(maxWidth("wide_drum_sander")).toBeGreaterThan(maxWidth("single_side_benchtop"));
  });
});

describe("depthAccuracy", () => {
  it("double side industrial best depth accuracy", () => {
    expect(depthAccuracy("double_side_industrial")).toBeGreaterThan(depthAccuracy("wide_drum_sander"));
  });
});

describe("tpCost", () => {
  it("moulder planer combo most expensive", () => {
    expect(tpCost("moulder_planer_combo")).toBeGreaterThan(tpCost("single_side_benchtop"));
  });
});

describe("doubleSided", () => {
  it("double side industrial is double sided", () => {
    expect(doubleSided("double_side_industrial")).toBe(true);
  });
  it("single side benchtop not double sided", () => {
    expect(doubleSided("single_side_benchtop")).toBe(false);
  });
});

describe("forHardwood", () => {
  it("spiral cutterhead for hardwood", () => {
    expect(forHardwood("spiral_cutterhead")).toBe(true);
  });
  it("single side benchtop not for hardwood", () => {
    expect(forHardwood("single_side_benchtop")).toBe(false);
  });
});

describe("cutterConfig", () => {
  it("wide drum sander uses abrasive drum", () => {
    expect(cutterConfig("wide_drum_sander")).toBe("abrasive_drum_conveyor_feed_sand_wide_panel_glue_up_flatten");
  });
});

describe("bestUse", () => {
  it("spiral cutterhead for fine woodworking", () => {
    expect(bestUse("spiral_cutterhead")).toBe("fine_woodworking_figured_hardwood_tear_out_free_smooth_surface");
  });
});

describe("thicknessPlanerTypes", () => {
  it("returns 5 types", () => {
    expect(thicknessPlanerTypes()).toHaveLength(5);
  });
});
