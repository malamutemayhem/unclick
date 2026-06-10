import { describe, it, expect } from "vitest";
import {
  scrubbingPower, surfaceSafe, precision, ergonomics,
  brushCost, replacementHead, dishwasherSafe, bristleType,
  bestSurface, scrubBrushes,
} from "../scrub-brush-calc.js";

describe("scrubbingPower", () => {
  it("drill attachment power most scrubbing power", () => {
    expect(scrubbingPower("drill_attachment_power")).toBeGreaterThan(scrubbingPower("soft_dish_palm"));
  });
});

describe("surfaceSafe", () => {
  it("soft dish palm most surface safe", () => {
    expect(surfaceSafe("soft_dish_palm")).toBeGreaterThan(surfaceSafe("drill_attachment_power"));
  });
});

describe("precision", () => {
  it("grout detail narrow most precise", () => {
    expect(precision("grout_detail_narrow")).toBeGreaterThan(precision("stiff_deck_floor"));
  });
});

describe("ergonomics", () => {
  it("drill attachment power best ergonomics", () => {
    expect(ergonomics("drill_attachment_power")).toBeGreaterThan(ergonomics("grout_detail_narrow"));
  });
});

describe("brushCost", () => {
  it("drill attachment power most expensive", () => {
    expect(brushCost("drill_attachment_power")).toBeGreaterThan(brushCost("soft_dish_palm"));
  });
});

describe("replacementHead", () => {
  it("drill attachment power has replacement head", () => {
    expect(replacementHead("drill_attachment_power")).toBe(true);
  });
  it("stiff deck floor does not", () => {
    expect(replacementHead("stiff_deck_floor")).toBe(false);
  });
});

describe("dishwasherSafe", () => {
  it("soft dish palm is dishwasher safe", () => {
    expect(dishwasherSafe("soft_dish_palm")).toBe(true);
  });
  it("stiff deck floor is not", () => {
    expect(dishwasherSafe("stiff_deck_floor")).toBe(false);
  });
});

describe("bristleType", () => {
  it("stiff deck floor uses palmyra coconut fiber", () => {
    expect(bristleType("stiff_deck_floor")).toBe("palmyra_coconut_fiber");
  });
});

describe("bestSurface", () => {
  it("grout detail narrow best for tile grout corners", () => {
    expect(bestSurface("grout_detail_narrow")).toBe("tile_grout_corners");
  });
});

describe("scrubBrushes", () => {
  it("returns 5 types", () => {
    expect(scrubBrushes()).toHaveLength(5);
  });
});
