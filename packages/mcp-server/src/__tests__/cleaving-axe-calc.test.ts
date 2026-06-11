import { describe, it, expect } from "vitest";
import {
  splitControl, edgeKeep, weightBalance, handleFeel,
  axeCost, singleBevel, forSplitting, headWeight,
  bestUse, cleavingAxes,
} from "../cleaving-axe-calc.js";

describe("splitControl", () => {
  it("side axe flat best split control", () => {
    expect(splitControl("side_axe_flat")).toBeGreaterThan(splitControl("splitting_maul_heavy"));
  });
});

describe("edgeKeep", () => {
  it("carving hatchet short best edge keep", () => {
    expect(edgeKeep("carving_hatchet_short")).toBeGreaterThan(edgeKeep("splitting_maul_heavy"));
  });
});

describe("weightBalance", () => {
  it("carving hatchet short best weight balance", () => {
    expect(weightBalance("carving_hatchet_short")).toBeGreaterThan(weightBalance("splitting_maul_heavy"));
  });
});

describe("handleFeel", () => {
  it("carving hatchet short best handle feel", () => {
    expect(handleFeel("carving_hatchet_short")).toBeGreaterThan(handleFeel("splitting_maul_heavy"));
  });
});

describe("axeCost", () => {
  it("carving hatchet short more expensive than splitting maul", () => {
    expect(axeCost("carving_hatchet_short")).toBeGreaterThan(axeCost("splitting_maul_heavy"));
  });
});

describe("singleBevel", () => {
  it("side axe flat has single bevel", () => {
    expect(singleBevel("side_axe_flat")).toBe(true);
  });
  it("kent pattern broad no single bevel", () => {
    expect(singleBevel("kent_pattern_broad")).toBe(false);
  });
});

describe("forSplitting", () => {
  it("kent pattern broad is for splitting", () => {
    expect(forSplitting("kent_pattern_broad")).toBe(true);
  });
  it("side axe flat not for splitting", () => {
    expect(forSplitting("side_axe_flat")).toBe(false);
  });
});

describe("headWeight", () => {
  it("splitting maul heavy uses heavy 6 lb", () => {
    expect(headWeight("splitting_maul_heavy")).toBe("heavy_6_lb");
  });
});

describe("bestUse", () => {
  it("carving hatchet short best for detail shape carve", () => {
    expect(bestUse("carving_hatchet_short")).toBe("detail_shape_carve");
  });
});

describe("cleavingAxes", () => {
  it("returns 5 types", () => {
    expect(cleavingAxes()).toHaveLength(5);
  });
});
