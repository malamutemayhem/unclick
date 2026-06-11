import { describe, it, expect } from "vitest";
import {
  smoothFinish, depthGlow, durability, applyEase,
  plasterCost, traditional, metallic, binderType,
  bestUse, venetianPlasters,
} from "../venetian-plaster-calc.js";

describe("smoothFinish", () => {
  it("lime putty traditional smoothest finish", () => {
    expect(smoothFinish("lime_putty_traditional")).toBeGreaterThan(smoothFinish("colored_stucco_pigment"));
  });
});

describe("depthGlow", () => {
  it("lime putty traditional deepest glow", () => {
    expect(depthGlow("lime_putty_traditional")).toBeGreaterThan(depthGlow("synthetic_acrylic_modern"));
  });
});

describe("durability", () => {
  it("synthetic acrylic modern most durable", () => {
    expect(durability("synthetic_acrylic_modern")).toBeGreaterThan(durability("metallic_plaster_shimmer"));
  });
});

describe("applyEase", () => {
  it("synthetic acrylic modern easiest apply", () => {
    expect(applyEase("synthetic_acrylic_modern")).toBeGreaterThan(applyEase("lime_putty_traditional"));
  });
});

describe("plasterCost", () => {
  it("marble dust fine most expensive", () => {
    expect(plasterCost("marble_dust_fine")).toBeGreaterThan(plasterCost("synthetic_acrylic_modern"));
  });
});

describe("traditional", () => {
  it("lime putty traditional is traditional", () => {
    expect(traditional("lime_putty_traditional")).toBe(true);
  });
  it("synthetic acrylic modern not traditional", () => {
    expect(traditional("synthetic_acrylic_modern")).toBe(false);
  });
});

describe("metallic", () => {
  it("metallic plaster shimmer is metallic", () => {
    expect(metallic("metallic_plaster_shimmer")).toBe(true);
  });
  it("lime putty traditional not metallic", () => {
    expect(metallic("lime_putty_traditional")).toBe(false);
  });
});

describe("binderType", () => {
  it("marble dust fine uses lime marble powder", () => {
    expect(binderType("marble_dust_fine")).toBe("lime_marble_powder");
  });
});

describe("bestUse", () => {
  it("lime putty traditional best for authentic italian finish", () => {
    expect(bestUse("lime_putty_traditional")).toBe("authentic_italian_finish");
  });
});

describe("venetianPlasters", () => {
  it("returns 5 types", () => {
    expect(venetianPlasters()).toHaveLength(5);
  });
});
