import { describe, it, expect } from "vitest";
import {
  sealTight, workTime, durability, flexAfterCure,
  puttyCost, waterproof, paintable, baseType,
  bestUse, glazingPuttys,
} from "../glazing-putty-calc.js";

describe("sealTight", () => {
  it("epoxy putty strong tightest seal", () => {
    expect(sealTight("epoxy_putty_strong")).toBeGreaterThan(sealTight("linseed_oil_standard"));
  });
});

describe("workTime", () => {
  it("linseed oil standard longest work time", () => {
    expect(workTime("linseed_oil_standard")).toBeGreaterThan(workTime("epoxy_putty_strong"));
  });
});

describe("durability", () => {
  it("epoxy putty strong most durable", () => {
    expect(durability("epoxy_putty_strong")).toBeGreaterThan(durability("linseed_oil_standard"));
  });
});

describe("flexAfterCure", () => {
  it("butyl rubber flex most flexible", () => {
    expect(flexAfterCure("butyl_rubber_flex")).toBeGreaterThan(flexAfterCure("epoxy_putty_strong"));
  });
});

describe("puttyCost", () => {
  it("epoxy putty strong most expensive", () => {
    expect(puttyCost("epoxy_putty_strong")).toBeGreaterThan(puttyCost("linseed_oil_standard"));
  });
});

describe("waterproof", () => {
  it("acrylic latex modern is waterproof", () => {
    expect(waterproof("acrylic_latex_modern")).toBe(true);
  });
  it("linseed oil standard not waterproof", () => {
    expect(waterproof("linseed_oil_standard")).toBe(false);
  });
});

describe("paintable", () => {
  it("acrylic latex modern is paintable", () => {
    expect(paintable("acrylic_latex_modern")).toBe(true);
  });
  it("butyl rubber flex not paintable", () => {
    expect(paintable("butyl_rubber_flex")).toBe(false);
  });
});

describe("baseType", () => {
  it("epoxy putty strong uses two part epoxy resin", () => {
    expect(baseType("epoxy_putty_strong")).toBe("two_part_epoxy_resin");
  });
});

describe("bestUse", () => {
  it("linseed oil standard best for traditional window glaze", () => {
    expect(bestUse("linseed_oil_standard")).toBe("traditional_window_glaze");
  });
});

describe("glazingPuttys", () => {
  it("returns 5 types", () => {
    expect(glazingPuttys()).toHaveLength(5);
  });
});
