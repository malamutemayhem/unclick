import { describe, it, expect } from "vitest";
import {
  holdGrip, abrasionResist, knotSecure, flexibility,
  twineCost, waxed, synthetic, fiberType,
  bestUse, whippingTwines,
} from "../whipping-twine-calc.js";

describe("holdGrip", () => {
  it("waxed polyester standard strongest hold grip", () => {
    expect(holdGrip("waxed_polyester_standard")).toBeGreaterThan(holdGrip("cotton_soft_temporary"));
  });
});

describe("abrasionResist", () => {
  it("dyneema strong thin best abrasion resist", () => {
    expect(abrasionResist("dyneema_strong_thin")).toBeGreaterThan(abrasionResist("cotton_soft_temporary"));
  });
});

describe("knotSecure", () => {
  it("waxed polyester standard most secure knot", () => {
    expect(knotSecure("waxed_polyester_standard")).toBeGreaterThan(knotSecure("cotton_soft_temporary"));
  });
});

describe("flexibility", () => {
  it("cotton soft temporary most flexible", () => {
    expect(flexibility("cotton_soft_temporary")).toBeGreaterThan(flexibility("dyneema_strong_thin"));
  });
});

describe("twineCost", () => {
  it("dyneema strong thin most expensive", () => {
    expect(twineCost("dyneema_strong_thin")).toBeGreaterThan(twineCost("cotton_soft_temporary"));
  });
});

describe("waxed", () => {
  it("waxed polyester standard is waxed", () => {
    expect(waxed("waxed_polyester_standard")).toBe(true);
  });
  it("nylon smooth slick not waxed", () => {
    expect(waxed("nylon_smooth_slick")).toBe(false);
  });
});

describe("synthetic", () => {
  it("nylon smooth slick is synthetic", () => {
    expect(synthetic("nylon_smooth_slick")).toBe(true);
  });
  it("linen traditional natural not synthetic", () => {
    expect(synthetic("linen_traditional_natural")).toBe(false);
  });
});

describe("fiberType", () => {
  it("dyneema strong thin uses uhmwpe high mod", () => {
    expect(fiberType("dyneema_strong_thin")).toBe("uhmwpe_high_mod");
  });
});

describe("bestUse", () => {
  it("waxed polyester standard best for general rope whip", () => {
    expect(bestUse("waxed_polyester_standard")).toBe("general_rope_whip");
  });
});

describe("whippingTwines", () => {
  it("returns 5 types", () => {
    expect(whippingTwines()).toHaveLength(5);
  });
});
