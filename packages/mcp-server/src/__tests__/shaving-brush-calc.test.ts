import { describe, it, expect } from "vitest";
import {
  latherQuality, softness, waterRetention, durability,
  brushCost, veganFriendly, needsBreakIn, knotMaterial,
  bestShaver, shavingBrushes,
} from "../shaving-brush-calc.js";

describe("latherQuality", () => {
  it("badger silvertip luxury best lather", () => {
    expect(latherQuality("badger_silvertip_luxury")).toBeGreaterThan(latherQuality("travel_compact_case"));
  });
});

describe("softness", () => {
  it("badger silvertip luxury softest", () => {
    expect(softness("badger_silvertip_luxury")).toBeGreaterThan(softness("boar_bristle_break_in"));
  });
});

describe("waterRetention", () => {
  it("badger silvertip luxury best water retention", () => {
    expect(waterRetention("badger_silvertip_luxury")).toBeGreaterThan(waterRetention("travel_compact_case"));
  });
});

describe("durability", () => {
  it("synthetic fiber vegan most durable", () => {
    expect(durability("synthetic_fiber_vegan")).toBeGreaterThan(durability("travel_compact_case"));
  });
});

describe("brushCost", () => {
  it("badger silvertip luxury most expensive", () => {
    expect(brushCost("badger_silvertip_luxury")).toBeGreaterThan(brushCost("boar_bristle_break_in"));
  });
});

describe("veganFriendly", () => {
  it("synthetic fiber vegan is vegan friendly", () => {
    expect(veganFriendly("synthetic_fiber_vegan")).toBe(true);
  });
  it("badger silvertip luxury is not", () => {
    expect(veganFriendly("badger_silvertip_luxury")).toBe(false);
  });
});

describe("needsBreakIn", () => {
  it("boar bristle break in needs break in", () => {
    expect(needsBreakIn("boar_bristle_break_in")).toBe(true);
  });
  it("synthetic fiber vegan does not", () => {
    expect(needsBreakIn("synthetic_fiber_vegan")).toBe(false);
  });
});

describe("knotMaterial", () => {
  it("badger silvertip luxury uses silvertip badger grade a", () => {
    expect(knotMaterial("badger_silvertip_luxury")).toBe("silvertip_badger_grade_a");
  });
});

describe("bestShaver", () => {
  it("synthetic fiber vegan best for ethical sensitive skin", () => {
    expect(bestShaver("synthetic_fiber_vegan")).toBe("ethical_sensitive_skin");
  });
});

describe("shavingBrushes", () => {
  it("returns 5 types", () => {
    expect(shavingBrushes()).toHaveLength(5);
  });
});
