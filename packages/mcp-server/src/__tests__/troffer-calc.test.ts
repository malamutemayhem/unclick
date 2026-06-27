import { describe, it, expect } from "vitest";
import {
  lumens, efficiency, glare, aesthetic,
  trCost, dimmable, forOffice, optic,
  bestUse, trofferTypes,
} from "../troffer-calc.js";

describe("lumens", () => {
  it("flat panel highest lumens", () => {
    expect(lumens("led_flat_panel_2x4")).toBeGreaterThan(lumens("led_center_basket_2x2"));
  });
});

describe("efficiency", () => {
  it("flat panel most efficient", () => {
    expect(efficiency("led_flat_panel_2x4")).toBeGreaterThan(efficiency("led_retrofit_kit_tube"));
  });
});

describe("glare", () => {
  it("volumetric best glare control", () => {
    expect(glare("led_volumetric_basket")).toBeGreaterThan(glare("led_retrofit_kit_tube"));
  });
});

describe("aesthetic", () => {
  it("volumetric best aesthetic", () => {
    expect(aesthetic("led_volumetric_basket")).toBeGreaterThan(aesthetic("led_retrofit_kit_tube"));
  });
});

describe("trCost", () => {
  it("volumetric most expensive", () => {
    expect(trCost("led_volumetric_basket")).toBeGreaterThan(trCost("led_retrofit_kit_tube"));
  });
});

describe("dimmable", () => {
  it("flat panel is dimmable", () => {
    expect(dimmable("led_flat_panel_2x4")).toBe(true);
  });
  it("retrofit not dimmable", () => {
    expect(dimmable("led_retrofit_kit_tube")).toBe(false);
  });
});

describe("forOffice", () => {
  it("flat panel for office", () => {
    expect(forOffice("led_flat_panel_2x4")).toBe(true);
  });
  it("edge lit not office", () => {
    expect(forOffice("led_edge_lit_slim")).toBe(false);
  });
});

describe("optic", () => {
  it("edge lit uses lgp", () => {
    expect(optic("led_edge_lit_slim")).toBe("edge_lit_lgp_uniform_spread");
  });
});

describe("bestUse", () => {
  it("retrofit for existing fluorescent", () => {
    expect(bestUse("led_retrofit_kit_tube")).toBe("retrofit_existing_fluorescent");
  });
});

describe("trofferTypes", () => {
  it("returns 5 types", () => {
    expect(trofferTypes()).toHaveLength(5);
  });
});
