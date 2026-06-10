import { describe, it, expect } from "vitest";
import {
  crispResult, capacity, versatility, compactSize,
  fryerCost, autoStir, dishwasherSafe, heatingMethod,
  bestFood, airFryers,
} from "../air-fryer-calc.js";

describe("crispResult", () => {
  it("oven style rack crispiest result", () => {
    expect(crispResult("oven_style_rack")).toBeGreaterThan(crispResult("lid_style_pot_top"));
  });
});

describe("capacity", () => {
  it("oven style rack biggest capacity", () => {
    expect(capacity("oven_style_rack")).toBeGreaterThan(capacity("basket_compact_basic"));
  });
});

describe("versatility", () => {
  it("oven style rack most versatile", () => {
    expect(versatility("oven_style_rack")).toBeGreaterThan(versatility("basket_compact_basic"));
  });
});

describe("compactSize", () => {
  it("basket compact basic most compact", () => {
    expect(compactSize("basket_compact_basic")).toBeGreaterThan(compactSize("oven_style_rack"));
  });
});

describe("fryerCost", () => {
  it("oven style rack most expensive", () => {
    expect(fryerCost("oven_style_rack")).toBeGreaterThan(fryerCost("basket_compact_basic"));
  });
});

describe("autoStir", () => {
  it("paddle auto stir has auto stir", () => {
    expect(autoStir("paddle_auto_stir")).toBe(true);
  });
  it("basket compact basic does not", () => {
    expect(autoStir("basket_compact_basic")).toBe(false);
  });
});

describe("dishwasherSafe", () => {
  it("basket compact basic is dishwasher safe", () => {
    expect(dishwasherSafe("basket_compact_basic")).toBe(true);
  });
  it("oven style rack is not", () => {
    expect(dishwasherSafe("oven_style_rack")).toBe(false);
  });
});

describe("heatingMethod", () => {
  it("dual zone two drawer uses dual element sync cook", () => {
    expect(heatingMethod("dual_zone_two_drawer")).toBe("dual_element_sync_cook");
  });
});

describe("bestFood", () => {
  it("paddle auto stir best for stir fry risotto curry", () => {
    expect(bestFood("paddle_auto_stir")).toBe("stir_fry_risotto_curry");
  });
});

describe("airFryers", () => {
  it("returns 5 types", () => {
    expect(airFryers()).toHaveLength(5);
  });
});
