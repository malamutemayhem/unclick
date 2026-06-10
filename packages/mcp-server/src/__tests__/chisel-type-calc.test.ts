import { describe, it, expect } from "vitest";
import {
  bladeWidthMm, versatility, detailWork,
  backgroundRemoval, sharpeningDifficulty, curvedBlade,
  bestTechnique, beginnerPriority, costEstimate, chiselTypes,
} from "../chisel-type-calc.js";

describe("bladeWidthMm", () => {
  it("straight is widest", () => {
    expect(bladeWidthMm("straight")).toBeGreaterThan(
      bladeWidthMm("v_parting")
    );
  });
});

describe("versatility", () => {
  it("gouge is most versatile", () => {
    expect(versatility("gouge")).toBeGreaterThan(
      versatility("v_parting")
    );
  });
});

describe("detailWork", () => {
  it("v parting does best detail work", () => {
    expect(detailWork("v_parting")).toBeGreaterThan(
      detailWork("straight")
    );
  });
});

describe("backgroundRemoval", () => {
  it("fishtail removes background best", () => {
    expect(backgroundRemoval("fishtail")).toBeGreaterThan(
      backgroundRemoval("v_parting")
    );
  });
});

describe("sharpeningDifficulty", () => {
  it("v parting is hardest to sharpen", () => {
    expect(sharpeningDifficulty("v_parting")).toBeGreaterThan(
      sharpeningDifficulty("straight")
    );
  });
});

describe("curvedBlade", () => {
  it("gouge has curved blade", () => {
    expect(curvedBlade("gouge")).toBe(true);
  });
  it("straight has no curved blade", () => {
    expect(curvedBlade("straight")).toBe(false);
  });
});

describe("bestTechnique", () => {
  it("v parting best for outlining", () => {
    expect(bestTechnique("v_parting")).toBe("outlining");
  });
});

describe("beginnerPriority", () => {
  it("straight is top beginner priority", () => {
    expect(beginnerPriority("straight")).toBeGreaterThan(
      beginnerPriority("fishtail")
    );
  });
});

describe("costEstimate", () => {
  it("fishtail costs most", () => {
    expect(costEstimate("fishtail")).toBeGreaterThan(
      costEstimate("straight")
    );
  });
});

describe("chiselTypes", () => {
  it("returns 5 types", () => {
    expect(chiselTypes()).toHaveLength(5);
  });
});
