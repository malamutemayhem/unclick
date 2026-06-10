import { describe, it, expect } from "vitest";
import {
  coilDiameterCm, wallThicknessCm, maxHeightCm,
  joinStrength, surfaceSmoothness, textureVisible,
  buildSpeedRating, beginnerFriendly, toolsRequired, coilTechniques,
} from "../coil-building-calc.js";

describe("coilDiameterCm", () => {
  it("rope coil is thickest", () => {
    expect(coilDiameterCm("rope_coil")).toBeGreaterThan(
      coilDiameterCm("pinch_coil")
    );
  });
});

describe("wallThicknessCm", () => {
  it("rope coil has thickest walls", () => {
    expect(wallThicknessCm("rope_coil")).toBeGreaterThan(
      wallThicknessCm("pinch_coil")
    );
  });
});

describe("maxHeightCm", () => {
  it("rope coil reaches tallest", () => {
    expect(maxHeightCm("rope_coil")).toBeGreaterThan(
      maxHeightCm("pinch_coil")
    );
  });
});

describe("joinStrength", () => {
  it("pinch coil has strongest join", () => {
    expect(joinStrength("pinch_coil")).toBeGreaterThan(
      joinStrength("rope_coil")
    );
  });
});

describe("surfaceSmoothness", () => {
  it("extruded coil is smoothest", () => {
    expect(surfaceSmoothness("extruded_coil")).toBeGreaterThan(
      surfaceSmoothness("rope_coil")
    );
  });
});

describe("textureVisible", () => {
  it("rope coil shows texture", () => {
    expect(textureVisible("rope_coil")).toBe(true);
  });
  it("slab coil does not", () => {
    expect(textureVisible("slab_coil")).toBe(false);
  });
});

describe("buildSpeedRating", () => {
  it("extruded coil is fastest", () => {
    expect(buildSpeedRating("extruded_coil")).toBeGreaterThan(
      buildSpeedRating("pinch_coil")
    );
  });
});

describe("beginnerFriendly", () => {
  it("basic coil is most beginner friendly", () => {
    expect(beginnerFriendly("basic_coil")).toBeGreaterThan(
      beginnerFriendly("extruded_coil")
    );
  });
});

describe("toolsRequired", () => {
  it("slab coil needs most tools", () => {
    expect(toolsRequired("slab_coil")).toBeGreaterThan(
      toolsRequired("pinch_coil")
    );
  });
});

describe("coilTechniques", () => {
  it("returns 5 techniques", () => {
    expect(coilTechniques()).toHaveLength(5);
  });
});
