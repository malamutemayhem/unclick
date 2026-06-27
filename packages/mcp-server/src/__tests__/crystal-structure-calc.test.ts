import { describe, it, expect } from "vitest";
import {
  atomsPerUnitCell, packingFraction, coordinationNumber,
  ductilityScore, slipSystems, closePacked,
  commonInNature, exampleMetal, symmetryGroup, crystalStructures,
} from "../crystal-structure-calc.js";

describe("atomsPerUnitCell", () => {
  it("diamond_cubic has most atoms", () => {
    expect(atomsPerUnitCell("diamond_cubic")).toBeGreaterThan(
      atomsPerUnitCell("bcc")
    );
  });
});

describe("packingFraction", () => {
  it("fcc densest packing", () => {
    expect(packingFraction("fcc")).toBeGreaterThan(
      packingFraction("bcc")
    );
  });
});

describe("coordinationNumber", () => {
  it("fcc highest coordination", () => {
    expect(coordinationNumber("fcc")).toBeGreaterThan(
      coordinationNumber("bcc")
    );
  });
});

describe("ductilityScore", () => {
  it("fcc most ductile", () => {
    expect(ductilityScore("fcc")).toBeGreaterThan(
      ductilityScore("hcp")
    );
  });
});

describe("slipSystems", () => {
  it("bcc most slip systems", () => {
    expect(slipSystems("bcc")).toBeGreaterThan(
      slipSystems("hcp")
    );
  });
});

describe("closePacked", () => {
  it("fcc is close packed", () => {
    expect(closePacked("fcc")).toBe(true);
  });
  it("bcc is not", () => {
    expect(closePacked("bcc")).toBe(false);
  });
});

describe("commonInNature", () => {
  it("fcc is common", () => {
    expect(commonInNature("fcc")).toBe(true);
  });
  it("simple_cubic is not", () => {
    expect(commonInNature("simple_cubic")).toBe(false);
  });
});

describe("exampleMetal", () => {
  it("bcc includes iron", () => {
    expect(exampleMetal("bcc")).toBe("iron_chromium");
  });
});

describe("symmetryGroup", () => {
  it("hcp has hexagonal symmetry", () => {
    expect(symmetryGroup("hcp")).toBe("hexagonal_p63mmc");
  });
});

describe("crystalStructures", () => {
  it("returns 5 structures", () => {
    expect(crystalStructures()).toHaveLength(5);
  });
});
