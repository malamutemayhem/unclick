import { describe, it, expect } from "vitest";
import {
  durability, drapability, productionComplexity,
  lustLevel, wrinkleResistance, reversible,
  showsDiagonal, commonFabric, floatLength, weaveTypes,
} from "../weave-type-calc.js";

describe("durability", () => {
  it("twill most durable", () => {
    expect(durability("twill")).toBeGreaterThan(
      durability("satin")
    );
  });
});

describe("drapability", () => {
  it("satin best drape", () => {
    expect(drapability("satin")).toBeGreaterThan(
      drapability("plain")
    );
  });
});

describe("productionComplexity", () => {
  it("jacquard most complex", () => {
    expect(productionComplexity("jacquard")).toBeGreaterThan(
      productionComplexity("plain")
    );
  });
});

describe("lustLevel", () => {
  it("satin most lustrous", () => {
    expect(lustLevel("satin")).toBeGreaterThan(
      lustLevel("basket")
    );
  });
});

describe("wrinkleResistance", () => {
  it("twill resists wrinkles", () => {
    expect(wrinkleResistance("twill")).toBeGreaterThan(
      wrinkleResistance("plain")
    );
  });
});

describe("reversible", () => {
  it("plain is reversible", () => {
    expect(reversible("plain")).toBe(true);
  });
  it("satin is not", () => {
    expect(reversible("satin")).toBe(false);
  });
});

describe("showsDiagonal", () => {
  it("twill shows diagonal", () => {
    expect(showsDiagonal("twill")).toBe(true);
  });
  it("plain does not", () => {
    expect(showsDiagonal("plain")).toBe(false);
  });
});

describe("commonFabric", () => {
  it("twill includes denim", () => {
    expect(commonFabric("twill")).toBe("denim_gabardine");
  });
});

describe("floatLength", () => {
  it("satin has long floats", () => {
    expect(floatLength("satin")).toBe("long_floats");
  });
});

describe("weaveTypes", () => {
  it("returns 5 types", () => {
    expect(weaveTypes()).toHaveLength(5);
  });
});
