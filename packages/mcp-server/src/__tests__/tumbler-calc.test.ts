import { describe, it, expect } from "vitest";
import {
  heatRetention, coldRetention, durability, tasteNeutral,
  tumblerCost, dishwasherSafe, spillProofLid, wallConstruction,
  bestUse, tumblers,
} from "../tumbler-calc.js";

describe("heatRetention", () => {
  it("stainless vacuum insulated best heat retention", () => {
    expect(heatRetention("stainless_vacuum_insulated")).toBeGreaterThan(heatRetention("plastic_bpa_free_straw"));
  });
});

describe("coldRetention", () => {
  it("stainless vacuum insulated best cold retention", () => {
    expect(coldRetention("stainless_vacuum_insulated")).toBeGreaterThan(coldRetention("plastic_bpa_free_straw"));
  });
});

describe("durability", () => {
  it("titanium ultralight camp most durable", () => {
    expect(durability("titanium_ultralight_camp")).toBeGreaterThan(durability("glass_double_wall"));
  });
});

describe("tasteNeutral", () => {
  it("glass double wall most taste neutral", () => {
    expect(tasteNeutral("glass_double_wall")).toBeGreaterThan(tasteNeutral("plastic_bpa_free_straw"));
  });
});

describe("tumblerCost", () => {
  it("titanium ultralight camp most expensive", () => {
    expect(tumblerCost("titanium_ultralight_camp")).toBeGreaterThan(tumblerCost("plastic_bpa_free_straw"));
  });
});

describe("dishwasherSafe", () => {
  it("stainless vacuum insulated is dishwasher safe", () => {
    expect(dishwasherSafe("stainless_vacuum_insulated")).toBe(true);
  });
  it("ceramic coated steel is not", () => {
    expect(dishwasherSafe("ceramic_coated_steel")).toBe(false);
  });
});

describe("spillProofLid", () => {
  it("stainless vacuum insulated has spill proof lid", () => {
    expect(spillProofLid("stainless_vacuum_insulated")).toBe(true);
  });
  it("glass double wall does not", () => {
    expect(spillProofLid("glass_double_wall")).toBe(false);
  });
});

describe("wallConstruction", () => {
  it("glass double wall uses borosilicate double wall", () => {
    expect(wallConstruction("glass_double_wall")).toBe("borosilicate_double_wall");
  });
});

describe("bestUse", () => {
  it("titanium ultralight camp best for backpacking outdoor travel", () => {
    expect(bestUse("titanium_ultralight_camp")).toBe("backpacking_outdoor_travel");
  });
});

describe("tumblers", () => {
  it("returns 5 types", () => {
    expect(tumblers()).toHaveLength(5);
  });
});
