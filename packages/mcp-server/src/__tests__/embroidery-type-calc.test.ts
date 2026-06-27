import { describe, it, expect } from "vitest";
import {
  stitchComplexity, colorRange, textureDepth,
  timePerSquareInch, materialCost, countedThread,
  raisedSurface, historicalOrigin, bestFabric, embroideryTypes,
} from "../embroidery-type-calc.js";

describe("stitchComplexity", () => {
  it("goldwork is most complex", () => {
    expect(stitchComplexity("goldwork")).toBeGreaterThan(
      stitchComplexity("cross_stitch")
    );
  });
});

describe("colorRange", () => {
  it("cross stitch has widest color range", () => {
    expect(colorRange("cross_stitch")).toBeGreaterThan(
      colorRange("blackwork")
    );
  });
});

describe("textureDepth", () => {
  it("goldwork has deepest texture", () => {
    expect(textureDepth("goldwork")).toBeGreaterThan(
      textureDepth("cross_stitch")
    );
  });
});

describe("timePerSquareInch", () => {
  it("goldwork takes most time", () => {
    expect(timePerSquareInch("goldwork")).toBeGreaterThan(
      timePerSquareInch("cross_stitch")
    );
  });
});

describe("materialCost", () => {
  it("goldwork costs most", () => {
    expect(materialCost("goldwork")).toBeGreaterThan(
      materialCost("cross_stitch")
    );
  });
});

describe("countedThread", () => {
  it("cross stitch is counted thread", () => {
    expect(countedThread("cross_stitch")).toBe(true);
  });
  it("crewel is not", () => {
    expect(countedThread("crewel")).toBe(false);
  });
});

describe("raisedSurface", () => {
  it("goldwork has raised surface", () => {
    expect(raisedSurface("goldwork")).toBe(true);
  });
  it("cross stitch does not", () => {
    expect(raisedSurface("cross_stitch")).toBe(false);
  });
});

describe("historicalOrigin", () => {
  it("goldwork from byzantine", () => {
    expect(historicalOrigin("goldwork")).toBe("byzantine");
  });
});

describe("bestFabric", () => {
  it("cross stitch on aida cloth", () => {
    expect(bestFabric("cross_stitch")).toBe("aida_cloth");
  });
});

describe("embroideryTypes", () => {
  it("returns 5 types", () => {
    expect(embroideryTypes()).toHaveLength(5);
  });
});
