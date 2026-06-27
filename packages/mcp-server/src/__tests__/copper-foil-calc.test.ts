import { describe, it, expect } from "vitest";
import {
  solderAdhere, wrapEase, visualBlend, edgeCoverage,
  foilCost, colorBack, decorativeEdge, adhesiveType,
  bestProject, copperFoils,
} from "../copper-foil-calc.js";

describe("solderAdhere", () => {
  it("wide foil heavy best solder adherence", () => {
    expect(solderAdhere("wide_foil_heavy")).toBeGreaterThan(solderAdhere("wave_edge_decorative"));
  });
});

describe("wrapEase", () => {
  it("standard back copper easiest to wrap", () => {
    expect(wrapEase("standard_back_copper")).toBeGreaterThan(wrapEase("wave_edge_decorative"));
  });
});

describe("visualBlend", () => {
  it("black back dark best visual blend", () => {
    expect(visualBlend("black_back_dark")).toBeGreaterThan(visualBlend("standard_back_copper"));
  });
});

describe("edgeCoverage", () => {
  it("wide foil heavy best edge coverage", () => {
    expect(edgeCoverage("wide_foil_heavy")).toBeGreaterThan(edgeCoverage("standard_back_copper"));
  });
});

describe("foilCost", () => {
  it("wave edge decorative most expensive", () => {
    expect(foilCost("wave_edge_decorative")).toBeGreaterThan(foilCost("standard_back_copper"));
  });
});

describe("colorBack", () => {
  it("black back dark has color back", () => {
    expect(colorBack("black_back_dark")).toBe(true);
  });
  it("standard back copper has no color back", () => {
    expect(colorBack("standard_back_copper")).toBe(false);
  });
});

describe("decorativeEdge", () => {
  it("wave edge decorative has decorative edge", () => {
    expect(decorativeEdge("wave_edge_decorative")).toBe(true);
  });
  it("standard back copper has no decorative edge", () => {
    expect(decorativeEdge("standard_back_copper")).toBe(false);
  });
});

describe("adhesiveType", () => {
  it("silver back mirror uses silver reflective layer", () => {
    expect(adhesiveType("silver_back_mirror")).toBe("silver_reflective_layer");
  });
});

describe("bestProject", () => {
  it("black back dark best for dark glass cathedral", () => {
    expect(bestProject("black_back_dark")).toBe("dark_glass_cathedral");
  });
});

describe("copperFoils", () => {
  it("returns 5 types", () => {
    expect(copperFoils()).toHaveLength(5);
  });
});
