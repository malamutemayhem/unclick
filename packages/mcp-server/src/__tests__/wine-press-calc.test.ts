import { describe, it, expect } from "vitest";
import {
  juiceClarity, pressureControl, throughput, gentleness,
  wpCost, continuous, forWhite, pressConfig,
  bestUse, winePressTypes,
} from "../wine-press-calc.js";

describe("juiceClarity", () => {
  it("bladder membrane best juice clarity", () => {
    expect(juiceClarity("bladder_membrane")).toBeGreaterThan(juiceClarity("screw_continuous"));
  });
});

describe("pressureControl", () => {
  it("bladder membrane best pressure control", () => {
    expect(pressureControl("bladder_membrane")).toBeGreaterThan(pressureControl("basket_vertical"));
  });
});

describe("throughput", () => {
  it("screw continuous highest throughput", () => {
    expect(throughput("screw_continuous")).toBeGreaterThan(throughput("basket_vertical"));
  });
});

describe("gentleness", () => {
  it("bladder membrane gentlest", () => {
    expect(gentleness("bladder_membrane")).toBeGreaterThan(gentleness("screw_continuous"));
  });
});

describe("wpCost", () => {
  it("bladder membrane most expensive", () => {
    expect(wpCost("bladder_membrane")).toBeGreaterThan(wpCost("open_top_punch"));
  });
});

describe("continuous", () => {
  it("screw continuous is continuous", () => {
    expect(continuous("screw_continuous")).toBe(true);
  });
  it("bladder membrane not continuous", () => {
    expect(continuous("bladder_membrane")).toBe(false);
  });
});

describe("forWhite", () => {
  it("bladder membrane for white wine", () => {
    expect(forWhite("bladder_membrane")).toBe(true);
  });
  it("screw continuous not for white", () => {
    expect(forWhite("screw_continuous")).toBe(false);
  });
});

describe("pressConfig", () => {
  it("pneumatic tank uses closed inert gas", () => {
    expect(pressConfig("pneumatic_tank")).toBe("pneumatic_tank_wine_press_closed_inert_gas_oxidation_protect");
  });
});

describe("bestUse", () => {
  it("basket vertical for small artisan winery", () => {
    expect(bestUse("basket_vertical")).toBe("small_artisan_winery_basket_press_traditional_gentle_whole_cluster");
  });
});

describe("winePressTypes", () => {
  it("returns 5 types", () => {
    expect(winePressTypes()).toHaveLength(5);
  });
});
