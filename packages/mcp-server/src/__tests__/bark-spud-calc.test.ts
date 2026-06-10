import { describe, it, expect } from "vitest";
import {
  barkRemove, woodSafe, handleReach, controlPrecision,
  spudCost, curved, twoHand, edgeShape,
  bestUse, barkSpuds,
} from "../bark-spud-calc.js";

describe("barkRemove", () => {
  it("drawknife pull strip best bark remove", () => {
    expect(barkRemove("drawknife_pull_strip")).toBeGreaterThan(barkRemove("chisel_edge_chop"));
  });
});

describe("woodSafe", () => {
  it("spoon scoop lift most wood safe", () => {
    expect(woodSafe("spoon_scoop_lift")).toBeGreaterThan(woodSafe("chisel_edge_chop"));
  });
});

describe("handleReach", () => {
  it("drawknife pull strip longest reach", () => {
    expect(handleReach("drawknife_pull_strip")).toBeGreaterThan(handleReach("spoon_scoop_lift"));
  });
});

describe("controlPrecision", () => {
  it("chisel edge chop most precise", () => {
    expect(controlPrecision("chisel_edge_chop")).toBeGreaterThan(controlPrecision("drawknife_pull_strip"));
  });
});

describe("spudCost", () => {
  it("curved blade peel more expensive than flat", () => {
    expect(spudCost("curved_blade_peel")).toBeGreaterThan(spudCost("flat_blade_push"));
  });
});

describe("curved", () => {
  it("curved blade peel is curved", () => {
    expect(curved("curved_blade_peel")).toBe(true);
  });
  it("flat blade push not curved", () => {
    expect(curved("flat_blade_push")).toBe(false);
  });
});

describe("twoHand", () => {
  it("drawknife pull strip is two hand", () => {
    expect(twoHand("drawknife_pull_strip")).toBe(true);
  });
  it("flat blade push not two hand", () => {
    expect(twoHand("flat_blade_push")).toBe(false);
  });
});

describe("edgeShape", () => {
  it("flat blade push uses flat beveled edge", () => {
    expect(edgeShape("flat_blade_push")).toBe("flat_beveled_edge");
  });
});

describe("bestUse", () => {
  it("curved blade peel best for round log peel", () => {
    expect(bestUse("curved_blade_peel")).toBe("round_log_peel");
  });
});

describe("barkSpuds", () => {
  it("returns 5 types", () => {
    expect(barkSpuds()).toHaveLength(5);
  });
});
