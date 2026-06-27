import { describe, it, expect } from "vitest";
import {
  productionRate, throughput, surfaceQuality, internalSoundness,
  ctCost, nearNetShape, forSteel, casterConfig,
  bestUse, continuousCasterTypes,
} from "../continuous-caster-calc.js";

describe("productionRate", () => {
  it("strip cast best production rate", () => {
    expect(productionRate("strip_cast")).toBeGreaterThan(productionRate("horizontal_cast"));
  });
});

describe("throughput", () => {
  it("thin slab highest throughput", () => {
    expect(throughput("thin_slab")).toBeGreaterThan(throughput("horizontal_cast"));
  });
});

describe("surfaceQuality", () => {
  it("thin slab best surface quality", () => {
    expect(surfaceQuality("thin_slab")).toBeGreaterThan(surfaceQuality("horizontal_cast"));
  });
});

describe("internalSoundness", () => {
  it("thin slab best internal soundness", () => {
    expect(internalSoundness("thin_slab")).toBeGreaterThan(internalSoundness("horizontal_cast"));
  });
});

describe("ctCost", () => {
  it("strip cast most expensive", () => {
    expect(ctCost("strip_cast")).toBeGreaterThan(ctCost("horizontal_cast"));
  });
});

describe("nearNetShape", () => {
  it("thin slab is near net shape", () => {
    expect(nearNetShape("thin_slab")).toBe(true);
  });
  it("vertical bow not near net shape", () => {
    expect(nearNetShape("vertical_bow")).toBe(false);
  });
});

describe("forSteel", () => {
  it("vertical bow for steel", () => {
    expect(forSteel("vertical_bow")).toBe(true);
  });
  it("horizontal cast not for steel", () => {
    expect(forSteel("horizontal_cast")).toBe(false);
  });
});

describe("casterConfig", () => {
  it("strip cast uses twin roll near net shape thin gauge", () => {
    expect(casterConfig("strip_cast")).toBe("strip_continuous_caster_twin_roll_near_net_shape_thin_gauge");
  });
});

describe("bestUse", () => {
  it("thin slab for hot strip funnel mold inline roll", () => {
    expect(bestUse("thin_slab")).toBe("hot_strip_thin_slab_continuous_caster_funnel_mold_inline_roll");
  });
});

describe("continuousCasterTypes", () => {
  it("returns 5 types", () => {
    expect(continuousCasterTypes()).toHaveLength(5);
  });
});
