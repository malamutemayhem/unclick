import { describe, it, expect } from "vitest";
import {
  aperturePrecision, pasteRelease, durability, leadTime,
  stencilCost, reusable, forFine, material,
  bestUse, solderStencils,
} from "../solder-stencil-calc.js";

describe("aperturePrecision", () => {
  it("electroform nickel best aperture precision", () => {
    expect(aperturePrecision("electroform_nickel")).toBeGreaterThan(aperturePrecision("kapton_polyimide"));
  });
});

describe("pasteRelease", () => {
  it("nano coat stainless best paste release", () => {
    expect(pasteRelease("nano_coat_stainless")).toBeGreaterThan(pasteRelease("kapton_polyimide"));
  });
});

describe("durability", () => {
  it("nano coat stainless most durable", () => {
    expect(durability("nano_coat_stainless")).toBeGreaterThan(durability("kapton_polyimide"));
  });
});

describe("leadTime", () => {
  it("kapton polyimide fastest lead time", () => {
    expect(leadTime("kapton_polyimide")).toBeGreaterThan(leadTime("step_stencil_multi"));
  });
});

describe("stencilCost", () => {
  it("electroform nickel most expensive", () => {
    expect(stencilCost("electroform_nickel")).toBeGreaterThan(stencilCost("kapton_polyimide"));
  });
});

describe("reusable", () => {
  it("laser cut stainless is reusable", () => {
    expect(reusable("laser_cut_stainless")).toBe(true);
  });
  it("kapton polyimide not reusable", () => {
    expect(reusable("kapton_polyimide")).toBe(false);
  });
});

describe("forFine", () => {
  it("electroform nickel is for fine", () => {
    expect(forFine("electroform_nickel")).toBe(true);
  });
  it("laser cut stainless not for fine", () => {
    expect(forFine("laser_cut_stainless")).toBe(false);
  });
});

describe("material", () => {
  it("nano coat uses nano coated stainless", () => {
    expect(material("nano_coat_stainless")).toBe("nano_coated_stainless");
  });
});

describe("bestUse", () => {
  it("step stencil best for mixed component height", () => {
    expect(bestUse("step_stencil_multi")).toBe("mixed_component_height");
  });
});

describe("solderStencils", () => {
  it("returns 5 types", () => {
    expect(solderStencils()).toHaveLength(5);
  });
});
