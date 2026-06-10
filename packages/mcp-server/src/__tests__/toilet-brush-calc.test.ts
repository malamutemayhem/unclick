import { describe, it, expect } from "vitest";
import {
  scrubPower, hygieneLevel, dryingSpeed, aestheticClean,
  brushCost, replaceableHead, dripFree, bristleType,
  bestBathroom, toiletBrushes,
} from "../toilet-brush-calc.js";

describe("scrubPower", () => {
  it("under rim curved most scrub power", () => {
    expect(scrubPower("under_rim_curved")).toBeGreaterThan(scrubPower("disposable_wand"));
  });
});

describe("hygieneLevel", () => {
  it("disposable wand most hygienic", () => {
    expect(hygieneLevel("disposable_wand")).toBeGreaterThan(hygieneLevel("traditional_bristle"));
  });
});

describe("dryingSpeed", () => {
  it("silicone flat fastest drying", () => {
    expect(dryingSpeed("silicone_flat")).toBeGreaterThan(dryingSpeed("traditional_bristle"));
  });
});

describe("aestheticClean", () => {
  it("caddy hidden set cleanest aesthetic", () => {
    expect(aestheticClean("caddy_hidden_set")).toBeGreaterThan(aestheticClean("traditional_bristle"));
  });
});

describe("brushCost", () => {
  it("disposable wand most expensive", () => {
    expect(brushCost("disposable_wand")).toBeGreaterThan(brushCost("traditional_bristle"));
  });
});

describe("replaceableHead", () => {
  it("disposable wand has replaceable head", () => {
    expect(replaceableHead("disposable_wand")).toBe(true);
  });
  it("traditional bristle does not", () => {
    expect(replaceableHead("traditional_bristle")).toBe(false);
  });
});

describe("dripFree", () => {
  it("silicone flat is drip free", () => {
    expect(dripFree("silicone_flat")).toBe(true);
  });
  it("traditional bristle is not", () => {
    expect(dripFree("traditional_bristle")).toBe(false);
  });
});

describe("bristleType", () => {
  it("silicone flat uses flexible silicone blade", () => {
    expect(bristleType("silicone_flat")).toBe("flexible_silicone_blade");
  });
});

describe("bestBathroom", () => {
  it("caddy hidden set for minimalist hidden storage", () => {
    expect(bestBathroom("caddy_hidden_set")).toBe("minimalist_hidden_storage");
  });
});

describe("toiletBrushes", () => {
  it("returns 5 types", () => {
    expect(toiletBrushes()).toHaveLength(5);
  });
});
