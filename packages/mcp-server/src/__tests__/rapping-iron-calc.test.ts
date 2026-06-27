import { describe, it, expect } from "vitest";
import {
  packForce, reachTight, weaveSafe, controlFeel,
  ironCost, weighted, forTightWeave, bladeProfile,
  bestUse, rappingIrons,
} from "../rapping-iron-calc.js";

describe("packForce", () => {
  it("weighted heavy pack strongest", () => {
    expect(packForce("weighted_heavy_pack")).toBeGreaterThan(packForce("curved_hook_pull"));
  });
});

describe("reachTight", () => {
  it("pointed tip tight best reach", () => {
    expect(reachTight("pointed_tip_tight")).toBeGreaterThan(reachTight("weighted_heavy_pack"));
  });
});

describe("weaveSafe", () => {
  it("shell shaped scoop safest", () => {
    expect(weaveSafe("shell_shaped_scoop")).toBeGreaterThan(weaveSafe("weighted_heavy_pack"));
  });
});

describe("controlFeel", () => {
  it("curved hook pull best control", () => {
    expect(controlFeel("curved_hook_pull")).toBeGreaterThan(controlFeel("flat_blade_wide"));
  });
});

describe("ironCost", () => {
  it("weighted heavy pack most expensive", () => {
    expect(ironCost("weighted_heavy_pack")).toBeGreaterThan(ironCost("flat_blade_wide"));
  });
});

describe("weighted", () => {
  it("weighted heavy pack is weighted", () => {
    expect(weighted("weighted_heavy_pack")).toBe(true);
  });
  it("flat blade wide not weighted", () => {
    expect(weighted("flat_blade_wide")).toBe(false);
  });
});

describe("forTightWeave", () => {
  it("pointed tip tight is for tight weave", () => {
    expect(forTightWeave("pointed_tip_tight")).toBe(true);
  });
  it("flat blade wide not for tight weave", () => {
    expect(forTightWeave("flat_blade_wide")).toBe(false);
  });
});

describe("bladeProfile", () => {
  it("shell shaped scoop uses concave shell curve", () => {
    expect(bladeProfile("shell_shaped_scoop")).toBe("concave_shell_curve");
  });
});

describe("bestUse", () => {
  it("flat blade wide best for general weft pack", () => {
    expect(bestUse("flat_blade_wide")).toBe("general_weft_pack");
  });
});

describe("rappingIrons", () => {
  it("returns 5 types", () => {
    expect(rappingIrons()).toHaveLength(5);
  });
});
