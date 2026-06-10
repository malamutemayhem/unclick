import { describe, it, expect } from "vitest";
import {
  wallThicknessMm, maxHeightCm, buildTimeHours,
  surfaceSmoothness, strengthRating, toolsNeeded,
  decorativeTexture, beginnerSuitable, costRating, coilTechniques,
} from "../coil-pottery-calc.js";

describe("wallThicknessMm", () => {
  it("rope coil has thickest walls", () => {
    expect(wallThicknessMm("rope_coil")).toBeGreaterThan(
      wallThicknessMm("extruded")
    );
  });
});

describe("maxHeightCm", () => {
  it("extruded allows tallest builds", () => {
    expect(maxHeightCm("extruded")).toBeGreaterThan(
      maxHeightCm("pinch_coil")
    );
  });
});

describe("buildTimeHours", () => {
  it("slab coil takes longest", () => {
    expect(buildTimeHours("slab_coil")).toBeGreaterThan(
      buildTimeHours("extruded")
    );
  });
});

describe("surfaceSmoothness", () => {
  it("extruded is smoothest", () => {
    expect(surfaceSmoothness("extruded")).toBeGreaterThan(
      surfaceSmoothness("rope_coil")
    );
  });
});

describe("strengthRating", () => {
  it("rope coil is strongest", () => {
    expect(strengthRating("rope_coil")).toBeGreaterThan(
      strengthRating("pinch_coil")
    );
  });
});

describe("toolsNeeded", () => {
  it("extruded needs most tools", () => {
    expect(toolsNeeded("extruded")).toBeGreaterThan(
      toolsNeeded("pinch_coil")
    );
  });
});

describe("decorativeTexture", () => {
  it("rope coil is decorative", () => {
    expect(decorativeTexture("rope_coil")).toBe(true);
  });
  it("slab coil is not", () => {
    expect(decorativeTexture("slab_coil")).toBe(false);
  });
});

describe("beginnerSuitable", () => {
  it("traditional is beginner suitable", () => {
    expect(beginnerSuitable("traditional")).toBe(true);
  });
  it("extruded is not", () => {
    expect(beginnerSuitable("extruded")).toBe(false);
  });
});

describe("costRating", () => {
  it("extruded costs most", () => {
    expect(costRating("extruded")).toBeGreaterThan(
      costRating("pinch_coil")
    );
  });
});

describe("coilTechniques", () => {
  it("returns 5 techniques", () => {
    expect(coilTechniques()).toHaveLength(5);
  });
});
