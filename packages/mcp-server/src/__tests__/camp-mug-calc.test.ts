import { describe, it, expect } from "vitest";
import {
  heatRetention, packWeight, durability, versatility,
  mugCost, directFlame, collapsible, wallConstruction,
  bestUse, campMugs,
} from "../camp-mug-calc.js";

describe("heatRetention", () => {
  it("stainless double insulated best heat retention", () => {
    expect(heatRetention("stainless_double_insulated")).toBeGreaterThan(heatRetention("titanium_single_wall"));
  });
});

describe("packWeight", () => {
  it("titanium single wall lightest", () => {
    expect(packWeight("titanium_single_wall")).toBeGreaterThan(packWeight("insulated_french_press"));
  });
});

describe("durability", () => {
  it("titanium single wall most durable", () => {
    expect(durability("titanium_single_wall")).toBeGreaterThan(durability("enamel_classic_retro"));
  });
});

describe("versatility", () => {
  it("insulated french press most versatile", () => {
    expect(versatility("insulated_french_press")).toBeGreaterThan(versatility("collapsible_silicone_fold"));
  });
});

describe("mugCost", () => {
  it("titanium single wall more expensive than enamel", () => {
    expect(mugCost("titanium_single_wall")).toBeGreaterThan(mugCost("enamel_classic_retro"));
  });
});

describe("directFlame", () => {
  it("titanium single wall can use direct flame", () => {
    expect(directFlame("titanium_single_wall")).toBe(true);
  });
  it("stainless double insulated cannot use direct flame", () => {
    expect(directFlame("stainless_double_insulated")).toBe(false);
  });
});

describe("collapsible", () => {
  it("collapsible silicone fold is collapsible", () => {
    expect(collapsible("collapsible_silicone_fold")).toBe(true);
  });
  it("titanium single wall is not collapsible", () => {
    expect(collapsible("titanium_single_wall")).toBe(false);
  });
});

describe("wallConstruction", () => {
  it("titanium single wall uses grade 2 titanium thin", () => {
    expect(wallConstruction("titanium_single_wall")).toBe("grade_2_titanium_thin");
  });
});

describe("bestUse", () => {
  it("insulated french press best for coffee lover camp brew", () => {
    expect(bestUse("insulated_french_press")).toBe("coffee_lover_camp_brew");
  });
});

describe("campMugs", () => {
  it("returns 5 types", () => {
    expect(campMugs()).toHaveLength(5);
  });
});
