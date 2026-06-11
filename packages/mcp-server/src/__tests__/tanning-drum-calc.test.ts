import { describe, it, expect } from "vitest";
import {
  penetration, throughput, leatherSoftness, colorFastness,
  tdCost_, ecoFriendly, forUpholstery, drumConfig,
  bestUse, tanningDrumTypes,
} from "../tanning-drum-calc.js";

describe("penetration", () => {
  it("chrome tanning best penetration", () => {
    expect(penetration("chrome_tanning")).toBeGreaterThan(penetration("vegetable_tanning"));
  });
});

describe("throughput", () => {
  it("chrome tanning highest throughput", () => {
    expect(throughput("chrome_tanning")).toBeGreaterThan(throughput("vegetable_tanning"));
  });
});

describe("leatherSoftness", () => {
  it("chrome tanning softest leather", () => {
    expect(leatherSoftness("chrome_tanning")).toBeGreaterThan(leatherSoftness("vegetable_tanning"));
  });
});

describe("colorFastness", () => {
  it("dyeing drum best color fastness", () => {
    expect(colorFastness("dyeing_drum")).toBeGreaterThan(colorFastness("retanning_drum"));
  });
});

describe("tdCost_", () => {
  it("combination tan most expensive", () => {
    expect(tdCost_("combination_tan")).toBeGreaterThan(tdCost_("retanning_drum"));
  });
});

describe("ecoFriendly", () => {
  it("vegetable tanning is eco friendly", () => {
    expect(ecoFriendly("vegetable_tanning")).toBe(true);
  });
  it("chrome tanning not eco friendly", () => {
    expect(ecoFriendly("chrome_tanning")).toBe(false);
  });
});

describe("forUpholstery", () => {
  it("chrome tanning for upholstery", () => {
    expect(forUpholstery("chrome_tanning")).toBe(true);
  });
  it("vegetable tanning not for upholstery", () => {
    expect(forUpholstery("vegetable_tanning")).toBe(false);
  });
});

describe("drumConfig", () => {
  it("combination tan uses chrome veg sequential balance", () => {
    expect(drumConfig("combination_tan")).toBe("combination_tan_drum_chrome_veg_sequential_balance_soft_durable");
  });
});

describe("bestUse", () => {
  it("vegetable tanning for artisan tannery", () => {
    expect(bestUse("vegetable_tanning")).toBe("artisan_tannery_vegetable_drum_bark_tannin_firm_saddle_belt_craft");
  });
});

describe("tanningDrumTypes", () => {
  it("returns 5 types", () => {
    expect(tanningDrumTypes()).toHaveLength(5);
  });
});
