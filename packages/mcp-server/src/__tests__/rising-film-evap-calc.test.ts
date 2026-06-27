import { describe, it, expect } from "vitest";
import {
  heatTransfer, foulingHandle, headroom, turndown,
  rfCost, forcedCirc, forScaling, design,
  bestUse, risingFilmEvapTypes,
} from "../rising-film-evap-calc.js";

describe("heatTransfer", () => {
  it("forced circulation best heat transfer", () => {
    expect(heatTransfer("forced_circulation_pump")).toBeGreaterThan(heatTransfer("basket_type_removable"));
  });
});

describe("foulingHandle", () => {
  it("basket type best fouling handling", () => {
    expect(foulingHandle("basket_type_removable")).toBeGreaterThan(foulingHandle("climbing_film_long_tube"));
  });
});

describe("headroom", () => {
  it("forced circulation least headroom needed", () => {
    expect(headroom("forced_circulation_pump")).toBeGreaterThan(headroom("climbing_film_long_tube"));
  });
});

describe("turndown", () => {
  it("forced circulation best turndown", () => {
    expect(turndown("forced_circulation_pump")).toBeGreaterThan(turndown("climbing_film_long_tube"));
  });
});

describe("rfCost", () => {
  it("forced circulation most expensive", () => {
    expect(rfCost("forced_circulation_pump")).toBeGreaterThan(rfCost("climbing_film_long_tube"));
  });
});

describe("forcedCirc", () => {
  it("forced circulation is forced", () => {
    expect(forcedCirc("forced_circulation_pump")).toBe(true);
  });
  it("natural circulation not forced", () => {
    expect(forcedCirc("natural_circulation_calandria")).toBe(false);
  });
});

describe("forScaling", () => {
  it("forced circulation for scaling service", () => {
    expect(forScaling("forced_circulation_pump")).toBe(true);
  });
  it("climbing film not for scaling", () => {
    expect(forScaling("climbing_film_long_tube")).toBe(false);
  });
});

describe("design", () => {
  it("basket type uses removable bundle", () => {
    expect(design("basket_type_removable")).toBe("removable_basket_tube_bundle_clean_access");
  });
});

describe("bestUse", () => {
  it("natural circulation for sugar cane", () => {
    expect(bestUse("natural_circulation_calandria")).toBe("sugar_cane_juice_evaporation_multi_effect");
  });
});

describe("risingFilmEvapTypes", () => {
  it("returns 5 types", () => {
    expect(risingFilmEvapTypes()).toHaveLength(5);
  });
});
