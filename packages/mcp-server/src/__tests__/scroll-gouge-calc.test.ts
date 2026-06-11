import { describe, it, expect } from "vitest";
import {
  cutClean, controlFine, accessReach, edgeKeep,
  gougeCost, bent, fishtail, sweepRadius,
  bestUse, scrollGouges,
} from "../scroll-gouge-calc.js";

describe("cutClean", () => {
  it("small sweep tight cleanest cut", () => {
    expect(cutClean("small_sweep_tight")).toBeGreaterThan(cutClean("bent_gouge_undercut"));
  });
});

describe("controlFine", () => {
  it("small sweep tight finest control", () => {
    expect(controlFine("small_sweep_tight")).toBeGreaterThan(controlFine("flat_sweep_wide"));
  });
});

describe("accessReach", () => {
  it("fishtail gouge access best reach", () => {
    expect(accessReach("fishtail_gouge_access")).toBeGreaterThan(accessReach("small_sweep_tight"));
  });
});

describe("edgeKeep", () => {
  it("flat sweep wide better edge keep than fishtail", () => {
    expect(edgeKeep("flat_sweep_wide")).toBeGreaterThan(edgeKeep("fishtail_gouge_access"));
  });
});

describe("gougeCost", () => {
  it("bent gouge undercut most expensive", () => {
    expect(gougeCost("bent_gouge_undercut")).toBeGreaterThan(gougeCost("medium_sweep_general"));
  });
});

describe("bent", () => {
  it("bent gouge undercut is bent", () => {
    expect(bent("bent_gouge_undercut")).toBe(true);
  });
  it("small sweep tight not bent", () => {
    expect(bent("small_sweep_tight")).toBe(false);
  });
});

describe("fishtail", () => {
  it("fishtail gouge access is fishtail", () => {
    expect(fishtail("fishtail_gouge_access")).toBe(true);
  });
  it("medium sweep general not fishtail", () => {
    expect(fishtail("medium_sweep_general")).toBe(false);
  });
});

describe("sweepRadius", () => {
  it("flat sweep wide uses wide twelve mm", () => {
    expect(sweepRadius("flat_sweep_wide")).toBe("wide_twelve_mm");
  });
});

describe("bestUse", () => {
  it("medium sweep general best for general scroll shape", () => {
    expect(bestUse("medium_sweep_general")).toBe("general_scroll_shape");
  });
});

describe("scrollGouges", () => {
  it("returns 5 types", () => {
    expect(scrollGouges()).toHaveLength(5);
  });
});
