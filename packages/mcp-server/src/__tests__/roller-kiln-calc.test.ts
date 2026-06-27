import { describe, it, expect } from "vitest";
import {
  firingSpeed, loadFlexibility, energyEfficiency, temperatureRange,
  rkCost, multiDeck, forTile, kilnConfig,
  bestUse, rollerKilnTypes,
} from "../roller-kiln-calc.js";

describe("firingSpeed", () => {
  it("single deck tile fastest firing speed", () => {
    expect(firingSpeed("single_deck_tile")).toBeGreaterThan(firingSpeed("sanitaryware_high"));
  });
});

describe("loadFlexibility", () => {
  it("decorating low temp best load flexibility", () => {
    expect(loadFlexibility("decorating_low_temp")).toBeGreaterThan(loadFlexibility("single_deck_tile"));
  });
});

describe("energyEfficiency", () => {
  it("decorating low temp best energy efficiency", () => {
    expect(energyEfficiency("decorating_low_temp")).toBeGreaterThan(energyEfficiency("sanitaryware_high"));
  });
});

describe("temperatureRange", () => {
  it("sanitaryware high widest temperature range", () => {
    expect(temperatureRange("sanitaryware_high")).toBeGreaterThan(temperatureRange("decorating_low_temp"));
  });
});

describe("rkCost", () => {
  it("sanitaryware high most expensive", () => {
    expect(rkCost("sanitaryware_high")).toBeGreaterThan(rkCost("decorating_low_temp"));
  });
});

describe("multiDeck", () => {
  it("multi deck tableware is multi deck", () => {
    expect(multiDeck("multi_deck_tableware")).toBe(true);
  });
  it("single deck tile not multi deck", () => {
    expect(multiDeck("single_deck_tile")).toBe(false);
  });
});

describe("forTile", () => {
  it("single deck tile for tile", () => {
    expect(forTile("single_deck_tile")).toBe(true);
  });
  it("multi deck tableware not for tile", () => {
    expect(forTile("multi_deck_tableware")).toBe(false);
  });
});

describe("kilnConfig", () => {
  it("decorating low temp uses decal on glaze fix fire", () => {
    expect(kilnConfig("decorating_low_temp")).toBe("low_temp_decorating_roller_kiln_decal_glaze_on_glaze_fix_fire");
  });
});

describe("bestUse", () => {
  it("sanitaryware high for toilet basin", () => {
    expect(bestUse("sanitaryware_high")).toBe("sanitaryware_toilet_basin_large_piece_high_temp_roller_fire");
  });
});

describe("rollerKilnTypes", () => {
  it("returns 5 types", () => {
    expect(rollerKilnTypes()).toHaveLength(5);
  });
});
