import { describe, it, expect } from "vitest";
import {
  knotHold, breakStrength, uvResist, sewSmooth,
  twineCost, waxed, synthetic, fiberType,
  bestUse, sailTwines,
} from "../sail-twine-calc.js";

describe("knotHold", () => {
  it("whipping twine fine best knot hold", () => {
    expect(knotHold("whipping_twine_fine")).toBeGreaterThan(knotHold("dyneema_thin_light"));
  });
});

describe("breakStrength", () => {
  it("dyneema thin light strongest break", () => {
    expect(breakStrength("dyneema_thin_light")).toBeGreaterThan(breakStrength("linen_traditional_soft"));
  });
});

describe("uvResist", () => {
  it("polyester waxed standard best uv resist", () => {
    expect(uvResist("polyester_waxed_standard")).toBeGreaterThan(uvResist("linen_traditional_soft"));
  });
});

describe("sewSmooth", () => {
  it("linen traditional soft smoothest sew", () => {
    expect(sewSmooth("linen_traditional_soft")).toBeGreaterThan(sewSmooth("dyneema_thin_light"));
  });
});

describe("twineCost", () => {
  it("dyneema thin light most expensive", () => {
    expect(twineCost("dyneema_thin_light")).toBeGreaterThan(twineCost("whipping_twine_fine"));
  });
});

describe("waxed", () => {
  it("polyester waxed standard is waxed", () => {
    expect(waxed("polyester_waxed_standard")).toBe(true);
  });
  it("linen traditional soft not waxed", () => {
    expect(waxed("linen_traditional_soft")).toBe(false);
  });
});

describe("synthetic", () => {
  it("polyester waxed standard is synthetic", () => {
    expect(synthetic("polyester_waxed_standard")).toBe(true);
  });
  it("linen traditional soft not synthetic", () => {
    expect(synthetic("linen_traditional_soft")).toBe(false);
  });
});

describe("fiberType", () => {
  it("dyneema thin light uses hmpe thin braid", () => {
    expect(fiberType("dyneema_thin_light")).toBe("hmpe_thin_braid");
  });
});

describe("bestUse", () => {
  it("polyester waxed standard best for general sail sew", () => {
    expect(bestUse("polyester_waxed_standard")).toBe("general_sail_sew");
  });
});

describe("sailTwines", () => {
  it("returns 5 types", () => {
    expect(sailTwines()).toHaveLength(5);
  });
});
