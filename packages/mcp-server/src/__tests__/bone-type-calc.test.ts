import { describe, it, expect } from "vitest";
import {
  length, marrowProduction, loadBearing,
  protectiveFunction, fractureRecoveryWeeks, hasMedullaryCanal,
  embeddedInTendon, exampleBone, countInBody, boneTypes,
} from "../bone-type-calc.js";

describe("length", () => {
  it("long bones are longest", () => {
    expect(length("long")).toBeGreaterThan(length("sesamoid"));
  });
});

describe("marrowProduction", () => {
  it("long bones produce most marrow", () => {
    expect(marrowProduction("long")).toBeGreaterThan(
      marrowProduction("sesamoid")
    );
  });
});

describe("loadBearing", () => {
  it("long bones bear most load", () => {
    expect(loadBearing("long")).toBeGreaterThan(
      loadBearing("sesamoid")
    );
  });
});

describe("protectiveFunction", () => {
  it("flat bones protect most", () => {
    expect(protectiveFunction("flat")).toBeGreaterThan(
      protectiveFunction("long")
    );
  });
});

describe("fractureRecoveryWeeks", () => {
  it("long bones take longest to heal", () => {
    expect(fractureRecoveryWeeks("long")).toBeGreaterThan(
      fractureRecoveryWeeks("short")
    );
  });
});

describe("hasMedullaryCanal", () => {
  it("long bones have medullary canal", () => {
    expect(hasMedullaryCanal("long")).toBe(true);
  });
  it("flat bones do not", () => {
    expect(hasMedullaryCanal("flat")).toBe(false);
  });
});

describe("embeddedInTendon", () => {
  it("sesamoid is embedded in tendon", () => {
    expect(embeddedInTendon("sesamoid")).toBe(true);
  });
  it("long is not", () => {
    expect(embeddedInTendon("long")).toBe(false);
  });
});

describe("exampleBone", () => {
  it("sesamoid example is patella", () => {
    expect(exampleBone("sesamoid")).toBe("patella");
  });
});

describe("countInBody", () => {
  it("long bones are most numerous", () => {
    expect(countInBody("long")).toBeGreaterThan(
      countInBody("sesamoid")
    );
  });
});

describe("boneTypes", () => {
  it("returns 5 types", () => {
    expect(boneTypes()).toHaveLength(5);
  });
});
