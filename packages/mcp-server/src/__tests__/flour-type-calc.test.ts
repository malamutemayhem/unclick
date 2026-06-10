import { describe, it, expect } from "vitest";
import {
  proteinPercent, glutenStrength, absorptionRate,
  fiberContent, fineness, isRefined,
  selfRisingAvailable, bestUse, grainSource, flourTypes,
} from "../flour-type-calc.js";

describe("proteinPercent", () => {
  it("bread flour highest protein", () => {
    expect(proteinPercent("bread")).toBeGreaterThan(
      proteinPercent("cake")
    );
  });
});

describe("glutenStrength", () => {
  it("bread flour strongest gluten", () => {
    expect(glutenStrength("bread")).toBeGreaterThan(
      glutenStrength("cake")
    );
  });
});

describe("absorptionRate", () => {
  it("whole wheat absorbs most", () => {
    expect(absorptionRate("whole_wheat")).toBeGreaterThan(
      absorptionRate("cake")
    );
  });
});

describe("fiberContent", () => {
  it("whole wheat highest fiber", () => {
    expect(fiberContent("whole_wheat")).toBeGreaterThan(
      fiberContent("all_purpose")
    );
  });
});

describe("fineness", () => {
  it("cake flour finest", () => {
    expect(fineness("cake")).toBeGreaterThan(
      fineness("semolina")
    );
  });
});

describe("isRefined", () => {
  it("all purpose is refined", () => {
    expect(isRefined("all_purpose")).toBe(true);
  });
  it("whole wheat is not", () => {
    expect(isRefined("whole_wheat")).toBe(false);
  });
});

describe("selfRisingAvailable", () => {
  it("all purpose has self rising", () => {
    expect(selfRisingAvailable("all_purpose")).toBe(true);
  });
  it("bread does not", () => {
    expect(selfRisingAvailable("bread")).toBe(false);
  });
});

describe("bestUse", () => {
  it("semolina for pasta", () => {
    expect(bestUse("semolina")).toBe("pasta_couscous");
  });
});

describe("grainSource", () => {
  it("bread flour from hard red wheat", () => {
    expect(grainSource("bread")).toBe("hard_red_wheat");
  });
});

describe("flourTypes", () => {
  it("returns 5 types", () => {
    expect(flourTypes()).toHaveLength(5);
  });
});
