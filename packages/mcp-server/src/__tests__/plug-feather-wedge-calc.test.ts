import { describe, it, expect } from "vitest";
import {
  splitForce, controlCrack, depthReach, reuse,
  wedgeCost, powered, forDeep, wedgeProfile,
  bestUse, plugFeatherWedges,
} from "../plug-feather-wedge-calc.js";

describe("splitForce", () => {
  it("pneumatic splitter power strongest split force", () => {
    expect(splitForce("pneumatic_splitter_power")).toBeGreaterThan(splitForce("narrow_feather_deep"));
  });
});

describe("controlCrack", () => {
  it("wide feather broad best control crack", () => {
    expect(controlCrack("wide_feather_broad")).toBeGreaterThan(controlCrack("pneumatic_splitter_power"));
  });
});

describe("depthReach", () => {
  it("narrow feather deep best depth reach", () => {
    expect(depthReach("narrow_feather_deep")).toBeGreaterThan(depthReach("wide_feather_broad"));
  });
});

describe("reuse", () => {
  it("carbide plug hard best reuse", () => {
    expect(reuse("carbide_plug_hard")).toBeGreaterThan(reuse("pneumatic_splitter_power"));
  });
});

describe("wedgeCost", () => {
  it("pneumatic splitter power most expensive", () => {
    expect(wedgeCost("pneumatic_splitter_power")).toBeGreaterThan(wedgeCost("steel_plug_standard"));
  });
});

describe("powered", () => {
  it("pneumatic splitter power is powered", () => {
    expect(powered("pneumatic_splitter_power")).toBe(true);
  });
  it("steel plug standard not powered", () => {
    expect(powered("steel_plug_standard")).toBe(false);
  });
});

describe("forDeep", () => {
  it("narrow feather deep is for deep", () => {
    expect(forDeep("narrow_feather_deep")).toBe(true);
  });
  it("steel plug standard not for deep", () => {
    expect(forDeep("steel_plug_standard")).toBe(false);
  });
});

describe("wedgeProfile", () => {
  it("wide feather broad uses broad half round", () => {
    expect(wedgeProfile("wide_feather_broad")).toBe("broad_half_round");
  });
});

describe("bestUse", () => {
  it("steel plug standard best for general stone split", () => {
    expect(bestUse("steel_plug_standard")).toBe("general_stone_split");
  });
});

describe("plugFeatherWedges", () => {
  it("returns 5 types", () => {
    expect(plugFeatherWedges()).toHaveLength(5);
  });
});
