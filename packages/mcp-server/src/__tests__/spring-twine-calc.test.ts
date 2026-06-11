import { describe, it, expect } from "vitest";
import {
  knotHold, breakStrength, abrasionResist, flexibility,
  twineCost, waxed, synthetic, fiberType,
  bestUse, springTwines,
} from "../spring-twine-calc.js";

describe("knotHold", () => {
  it("waxed twine grip best knot hold", () => {
    expect(knotHold("waxed_twine_grip")).toBeGreaterThan(knotHold("nylon_twine_strong"));
  });
});

describe("breakStrength", () => {
  it("nylon twine strong best break strength", () => {
    expect(breakStrength("nylon_twine_strong")).toBeGreaterThan(breakStrength("linen_twine_traditional"));
  });
});

describe("abrasionResist", () => {
  it("polyester twine durable best abrasion resist", () => {
    expect(abrasionResist("polyester_twine_durable")).toBeGreaterThan(abrasionResist("linen_twine_traditional"));
  });
});

describe("flexibility", () => {
  it("linen twine traditional most flexible", () => {
    expect(flexibility("linen_twine_traditional")).toBeGreaterThan(flexibility("waxed_twine_grip"));
  });
});

describe("twineCost", () => {
  it("waxed twine grip most expensive", () => {
    expect(twineCost("waxed_twine_grip")).toBeGreaterThan(twineCost("hemp_twine_standard"));
  });
});

describe("waxed", () => {
  it("waxed twine grip is waxed", () => {
    expect(waxed("waxed_twine_grip")).toBe(true);
  });
  it("hemp twine standard not waxed", () => {
    expect(waxed("hemp_twine_standard")).toBe(false);
  });
});

describe("synthetic", () => {
  it("nylon twine strong is synthetic", () => {
    expect(synthetic("nylon_twine_strong")).toBe(true);
  });
  it("hemp twine standard not synthetic", () => {
    expect(synthetic("hemp_twine_standard")).toBe(false);
  });
});

describe("fiberType", () => {
  it("waxed twine grip uses waxed hemp cord", () => {
    expect(fiberType("waxed_twine_grip")).toBe("waxed_hemp_cord");
  });
});

describe("bestUse", () => {
  it("hemp twine standard best for general spring tie", () => {
    expect(bestUse("hemp_twine_standard")).toBe("general_spring_tie");
  });
});

describe("springTwines", () => {
  it("returns 5 types", () => {
    expect(springTwines()).toHaveLength(5);
  });
});
