import { describe, it, expect } from "vitest";
import {
  leafLengthCm, leafWidthCm, linesPerSide,
  inscriptionMethod, preservationOilRequired, durabilityYears,
  palmSpecies, boardHoles, costPerLeaf, palmLeafRegions,
} from "../palm-leaf-ms-calc.js";

describe("leafLengthCm", () => {
  it("south india has longest leaves", () => {
    expect(leafLengthCm("south_india")).toBeGreaterThan(
      leafLengthCm("tibet")
    );
  });
});

describe("leafWidthCm", () => {
  it("nepal has widest leaves", () => {
    expect(leafWidthCm("nepal")).toBeGreaterThan(
      leafWidthCm("southeast_asia")
    );
  });
});

describe("linesPerSide", () => {
  it("south india fits most lines", () => {
    expect(linesPerSide("south_india")).toBeGreaterThan(
      linesPerSide("tibet")
    );
  });
});

describe("inscriptionMethod", () => {
  it("south india uses iron stylus", () => {
    expect(inscriptionMethod("south_india")).toBe("iron_stylus");
  });
});

describe("preservationOilRequired", () => {
  it("south india needs oil", () => {
    expect(preservationOilRequired("south_india")).toBe(true);
  });
  it("nepal does not", () => {
    expect(preservationOilRequired("nepal")).toBe(false);
  });
});

describe("durabilityYears", () => {
  it("south india lasts longest", () => {
    expect(durabilityYears("south_india")).toBeGreaterThan(
      durabilityYears("nepal")
    );
  });
});

describe("palmSpecies", () => {
  it("south india uses borassus", () => {
    expect(palmSpecies("south_india")).toBe("borassus");
  });
});

describe("boardHoles", () => {
  it("south india has most holes", () => {
    expect(boardHoles("south_india")).toBeGreaterThanOrEqual(
      boardHoles("nepal")
    );
  });
});

describe("costPerLeaf", () => {
  it("tibet costs most", () => {
    expect(costPerLeaf("tibet")).toBeGreaterThan(
      costPerLeaf("southeast_asia")
    );
  });
});

describe("palmLeafRegions", () => {
  it("returns 5 regions", () => {
    expect(palmLeafRegions()).toHaveLength(5);
  });
});
