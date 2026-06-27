import { describe, it, expect } from "vitest";
import {
  coatUniformity, throughput, materialEfficiency, thicknessControl,
  gzCost, automated, forLargeWare, sprayerConfig,
  bestUse, glazeSprayerTypes,
} from "../glaze-sprayer-calc.js";

describe("coatUniformity", () => {
  it("robotic spray best coat uniformity", () => {
    expect(coatUniformity("robotic_spray")).toBeGreaterThan(coatUniformity("airbrush_manual"));
  });
});

describe("throughput", () => {
  it("dip glaze highest throughput", () => {
    expect(throughput("dip_glaze")).toBeGreaterThan(throughput("airbrush_manual"));
  });
});

describe("materialEfficiency", () => {
  it("robotic spray best material efficiency", () => {
    expect(materialEfficiency("robotic_spray")).toBeGreaterThan(materialEfficiency("airbrush_manual"));
  });
});

describe("thicknessControl", () => {
  it("robotic spray best thickness control", () => {
    expect(thicknessControl("robotic_spray")).toBeGreaterThan(thicknessControl("dip_glaze"));
  });
});

describe("gzCost", () => {
  it("robotic spray most expensive", () => {
    expect(gzCost("robotic_spray")).toBeGreaterThan(gzCost("airbrush_manual"));
  });
});

describe("automated", () => {
  it("robotic spray is automated", () => {
    expect(automated("robotic_spray")).toBe(true);
  });
  it("hvlp spray not automated", () => {
    expect(automated("hvlp_spray")).toBe(false);
  });
});

describe("forLargeWare", () => {
  it("airless spray for large ware", () => {
    expect(forLargeWare("airless_spray")).toBe(true);
  });
  it("airbrush manual not for large ware", () => {
    expect(forLargeWare("airbrush_manual")).toBe(false);
  });
});

describe("sprayerConfig", () => {
  it("dip glaze uses tank immerse ware coat drain dry simple batch even", () => {
    expect(sprayerConfig("dip_glaze")).toBe("dip_glaze_tank_immerse_ware_coat_drain_dry_simple_batch_even");
  });
});

describe("bestUse", () => {
  it("hvlp spray for small ceramic shop efficient even coating", () => {
    expect(bestUse("hvlp_spray")).toBe("small_ceramic_shop_hvlp_glaze_sprayer_efficient_even_coating");
  });
});

describe("glazeSprayerTypes", () => {
  it("returns 5 types", () => {
    expect(glazeSprayerTypes()).toHaveLength(5);
  });
});
