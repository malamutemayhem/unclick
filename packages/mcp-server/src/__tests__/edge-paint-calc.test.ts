import { describe, it, expect } from "vitest";
import {
  coverageSmooth, durability, drySpeed, flexCrack,
  paintCost, waterClean, buildLayers, finishType,
  bestUse, edgePaints,
} from "../edge-paint-calc.js";

describe("coverageSmooth", () => {
  it("resin edge build smoothest coverage", () => {
    expect(coverageSmooth("resin_edge_build")).toBeGreaterThan(coverageSmooth("dye_stain_absorb"));
  });
});

describe("durability", () => {
  it("resin edge build most durable", () => {
    expect(durability("resin_edge_build")).toBeGreaterThan(durability("dye_stain_absorb"));
  });
});

describe("drySpeed", () => {
  it("wax coat natural fastest dry", () => {
    expect(drySpeed("wax_coat_natural")).toBeGreaterThan(drySpeed("resin_edge_build"));
  });
});

describe("flexCrack", () => {
  it("dye stain absorb most flexible", () => {
    expect(flexCrack("dye_stain_absorb")).toBeGreaterThan(flexCrack("resin_edge_build"));
  });
});

describe("paintCost", () => {
  it("resin edge build most expensive", () => {
    expect(paintCost("resin_edge_build")).toBeGreaterThan(paintCost("wax_coat_natural"));
  });
});

describe("waterClean", () => {
  it("water based flex is water clean", () => {
    expect(waterClean("water_based_flex")).toBe(true);
  });
  it("lacquer gloss hard not water clean", () => {
    expect(waterClean("lacquer_gloss_hard")).toBe(false);
  });
});

describe("buildLayers", () => {
  it("lacquer gloss hard can build layers", () => {
    expect(buildLayers("lacquer_gloss_hard")).toBe(true);
  });
  it("wax coat natural cannot build layers", () => {
    expect(buildLayers("wax_coat_natural")).toBe(false);
  });
});

describe("finishType", () => {
  it("lacquer gloss hard uses high gloss hard", () => {
    expect(finishType("lacquer_gloss_hard")).toBe("high_gloss_hard");
  });
});

describe("bestUse", () => {
  it("resin edge build best for premium build edge", () => {
    expect(bestUse("resin_edge_build")).toBe("premium_build_edge");
  });
});

describe("edgePaints", () => {
  it("returns 5 types", () => {
    expect(edgePaints()).toHaveLength(5);
  });
});
