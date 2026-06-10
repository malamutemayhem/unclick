import { describe, it, expect } from "vitest";
import {
  sheenLevel, waterproofing, conditioningEffect,
  darkeningEffect, reapplicationWeeks, natural,
  buffable, bestFor, costPerLiter, leatherFinishes,
} from "../leather-finish-calc.js";

describe("sheenLevel", () => {
  it("resolene has highest sheen", () => {
    expect(sheenLevel("resolene")).toBeGreaterThan(
      sheenLevel("neatsfoot_oil")
    );
  });
});

describe("waterproofing", () => {
  it("beeswax waterproofs best", () => {
    expect(waterproofing("beeswax")).toBeGreaterThan(
      waterproofing("neatsfoot_oil")
    );
  });
});

describe("conditioningEffect", () => {
  it("neatsfoot oil conditions best", () => {
    expect(conditioningEffect("neatsfoot_oil")).toBeGreaterThan(
      conditioningEffect("resolene")
    );
  });
});

describe("darkeningEffect", () => {
  it("neatsfoot oil darkens most", () => {
    expect(darkeningEffect("neatsfoot_oil")).toBeGreaterThan(
      darkeningEffect("resolene")
    );
  });
});

describe("reapplicationWeeks", () => {
  it("resolene lasts longest", () => {
    expect(reapplicationWeeks("resolene")).toBeGreaterThan(
      reapplicationWeeks("neatsfoot_oil")
    );
  });
});

describe("natural", () => {
  it("beeswax is natural", () => {
    expect(natural("beeswax")).toBe(true);
  });
  it("resolene is not", () => {
    expect(natural("resolene")).toBe(false);
  });
});

describe("buffable", () => {
  it("beeswax is buffable", () => {
    expect(buffable("beeswax")).toBe(true);
  });
  it("neatsfoot oil is not", () => {
    expect(buffable("neatsfoot_oil")).toBe(false);
  });
});

describe("bestFor", () => {
  it("neatsfoot oil is best for saddles", () => {
    expect(bestFor("neatsfoot_oil")).toBe("saddles");
  });
});

describe("costPerLiter", () => {
  it("resolene costs most", () => {
    expect(costPerLiter("resolene")).toBeGreaterThan(
      costPerLiter("neatsfoot_oil")
    );
  });
});

describe("leatherFinishes", () => {
  it("returns 5 finishes", () => {
    expect(leatherFinishes()).toHaveLength(5);
  });
});
