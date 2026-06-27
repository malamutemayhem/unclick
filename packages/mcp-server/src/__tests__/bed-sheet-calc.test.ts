import { describe, it, expect } from "vitest";
import {
  softness, breathability, durability, wrinkleResist,
  sheetCost, getsOfterWithWash, ecoFriendly, weaveType,
  bestSleeper, bedSheets,
} from "../bed-sheet-calc.js";

describe("softness", () => {
  it("bamboo lyocell soft softest", () => {
    expect(softness("bamboo_lyocell_soft")).toBeGreaterThan(softness("linen_flax_breathe"));
  });
});

describe("breathability", () => {
  it("linen flax breathe most breathable", () => {
    expect(breathability("linen_flax_breathe")).toBeGreaterThan(breathability("microfiber_poly_budget"));
  });
});

describe("durability", () => {
  it("linen flax breathe most durable", () => {
    expect(durability("linen_flax_breathe")).toBeGreaterThan(durability("bamboo_lyocell_soft"));
  });
});

describe("wrinkleResist", () => {
  it("microfiber poly budget best wrinkle resistance", () => {
    expect(wrinkleResist("microfiber_poly_budget")).toBeGreaterThan(wrinkleResist("linen_flax_breathe"));
  });
});

describe("sheetCost", () => {
  it("linen flax breathe most expensive", () => {
    expect(sheetCost("linen_flax_breathe")).toBeGreaterThan(sheetCost("microfiber_poly_budget"));
  });
});

describe("getsOfterWithWash", () => {
  it("cotton percale crisp gets softer with wash", () => {
    expect(getsOfterWithWash("cotton_percale_crisp")).toBe(true);
  });
  it("sateen weave silky does not", () => {
    expect(getsOfterWithWash("sateen_weave_silky")).toBe(false);
  });
});

describe("ecoFriendly", () => {
  it("bamboo lyocell soft is eco friendly", () => {
    expect(ecoFriendly("bamboo_lyocell_soft")).toBe(true);
  });
  it("microfiber poly budget is not", () => {
    expect(ecoFriendly("microfiber_poly_budget")).toBe(false);
  });
});

describe("weaveType", () => {
  it("sateen weave silky uses four over one under satin", () => {
    expect(weaveType("sateen_weave_silky")).toBe("four_over_one_under_satin");
  });
});

describe("bestSleeper", () => {
  it("cotton percale crisp best for hot sleeper crisp cool", () => {
    expect(bestSleeper("cotton_percale_crisp")).toBe("hot_sleeper_crisp_cool");
  });
});

describe("bedSheets", () => {
  it("returns 5 types", () => {
    expect(bedSheets()).toHaveLength(5);
  });
});
