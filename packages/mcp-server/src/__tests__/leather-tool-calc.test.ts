import { describe, it, expect } from "vitest";
import {
  precisionRating, depthControl, textureCreation,
  versatility, learningCurve, essentialTool,
  malletRequired, bestTechnique, costEstimate, leatherTools,
} from "../leather-tool-calc.js";

describe("precisionRating", () => {
  it("swivel knife is most precise", () => {
    expect(precisionRating("swivel_knife")).toBeGreaterThan(
      precisionRating("seeder")
    );
  });
});

describe("depthControl", () => {
  it("swivel knife has best depth control", () => {
    expect(depthControl("swivel_knife")).toBeGreaterThan(
      depthControl("seeder")
    );
  });
});

describe("textureCreation", () => {
  it("backgrounder creates most texture", () => {
    expect(textureCreation("backgrounder")).toBeGreaterThan(
      textureCreation("swivel_knife")
    );
  });
});

describe("versatility", () => {
  it("swivel knife is most versatile", () => {
    expect(versatility("swivel_knife")).toBeGreaterThan(
      versatility("seeder")
    );
  });
});

describe("learningCurve", () => {
  it("swivel knife has steepest learning curve", () => {
    expect(learningCurve("swivel_knife")).toBeGreaterThan(
      learningCurve("seeder")
    );
  });
});

describe("essentialTool", () => {
  it("swivel knife is essential", () => {
    expect(essentialTool("swivel_knife")).toBe(true);
  });
  it("seeder is not", () => {
    expect(essentialTool("seeder")).toBe(false);
  });
});

describe("malletRequired", () => {
  it("beveler needs mallet", () => {
    expect(malletRequired("beveler")).toBe(true);
  });
  it("swivel knife does not", () => {
    expect(malletRequired("swivel_knife")).toBe(false);
  });
});

describe("bestTechnique", () => {
  it("swivel knife best for cutting lines", () => {
    expect(bestTechnique("swivel_knife")).toBe("cutting_lines");
  });
});

describe("costEstimate", () => {
  it("swivel knife costs most", () => {
    expect(costEstimate("swivel_knife")).toBeGreaterThan(
      costEstimate("seeder")
    );
  });
});

describe("leatherTools", () => {
  it("returns 5 tools", () => {
    expect(leatherTools()).toHaveLength(5);
  });
});
