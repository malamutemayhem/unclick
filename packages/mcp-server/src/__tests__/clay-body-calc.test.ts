import { describe, it, expect } from "vitest";
import {
  firingRangeCelsius, shrinkagePercent, absorptionPercent, plasticity,
  colorAfterFiring, translucency, strengthRating, glazeRequired,
  costPerKg, clayTypes,
} from "../clay-body-calc.js";

describe("firingRangeCelsius", () => {
  it("porcelain fires highest", () => {
    expect(firingRangeCelsius("porcelain").max).toBeGreaterThan(
      firingRangeCelsius("earthenware").max
    );
  });
});

describe("shrinkagePercent", () => {
  it("porcelain shrinks most", () => {
    expect(shrinkagePercent("porcelain")).toBeGreaterThan(
      shrinkagePercent("earthenware")
    );
  });
});

describe("absorptionPercent", () => {
  it("porcelain has zero absorption", () => {
    expect(absorptionPercent("porcelain")).toBe(0);
  });
});

describe("plasticity", () => {
  it("ball clay is most plastic", () => {
    expect(plasticity("ball_clay")).toBeGreaterThan(
      plasticity("porcelain")
    );
  });
});

describe("colorAfterFiring", () => {
  it("porcelain fires white", () => {
    expect(colorAfterFiring("porcelain")).toBe("white");
  });
  it("terracotta fires red", () => {
    expect(colorAfterFiring("terracotta")).toBe("red_orange");
  });
});

describe("translucency", () => {
  it("porcelain is translucent", () => {
    expect(translucency("porcelain")).toBe(true);
  });
  it("stoneware is not translucent", () => {
    expect(translucency("stoneware")).toBe(false);
  });
});

describe("strengthRating", () => {
  it("porcelain is strongest", () => {
    expect(strengthRating("porcelain")).toBeGreaterThan(
      strengthRating("earthenware")
    );
  });
});

describe("glazeRequired", () => {
  it("earthenware needs glaze", () => {
    expect(glazeRequired("earthenware")).toBe(true);
  });
  it("stoneware does not need glaze", () => {
    expect(glazeRequired("stoneware")).toBe(false);
  });
});

describe("costPerKg", () => {
  it("porcelain is most expensive", () => {
    expect(costPerKg("porcelain")).toBeGreaterThan(
      costPerKg("terracotta")
    );
  });
});

describe("clayTypes", () => {
  it("returns 5 types", () => {
    expect(clayTypes()).toHaveLength(5);
  });
});
