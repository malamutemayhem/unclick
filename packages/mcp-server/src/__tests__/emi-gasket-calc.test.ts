import { describe, it, expect } from "vitest";
import {
  shieldEffect, compression, durability, environmental,
  egCost, reusable, forOutdoor, material,
  bestUse, emiGaskets,
} from "../emi-gasket-calc.js";

describe("shieldEffect", () => {
  it("beryllium copper best shield effect", () => {
    expect(shieldEffect("beryllium_copper_finger")).toBeGreaterThan(shieldEffect("form_in_place_fip"));
  });
});

describe("compression", () => {
  it("form in place best compression", () => {
    expect(compression("form_in_place_fip")).toBeGreaterThan(compression("beryllium_copper_finger"));
  });
});

describe("durability", () => {
  it("elastomer silicone most durable", () => {
    expect(durability("elastomer_filled_silicone")).toBeGreaterThan(durability("fabric_over_foam"));
  });
});

describe("environmental", () => {
  it("elastomer silicone best environmental", () => {
    expect(environmental("elastomer_filled_silicone")).toBeGreaterThan(environmental("beryllium_copper_finger"));
  });
});

describe("egCost", () => {
  it("elastomer silicone most expensive", () => {
    expect(egCost("elastomer_filled_silicone")).toBeGreaterThan(egCost("fabric_over_foam"));
  });
});

describe("reusable", () => {
  it("oriented wire mesh is reusable", () => {
    expect(reusable("oriented_wire_mesh")).toBe(true);
  });
  it("fabric over foam not reusable", () => {
    expect(reusable("fabric_over_foam")).toBe(false);
  });
});

describe("forOutdoor", () => {
  it("elastomer silicone for outdoor", () => {
    expect(forOutdoor("elastomer_filled_silicone")).toBe(true);
  });
  it("form in place not for outdoor", () => {
    expect(forOutdoor("form_in_place_fip")).toBe(false);
  });
});

describe("material", () => {
  it("oriented wire mesh uses monel knitted wire strip", () => {
    expect(material("oriented_wire_mesh")).toBe("monel_knitted_wire_strip");
  });
});

describe("bestUse", () => {
  it("elastomer silicone best for avionics seal", () => {
    expect(bestUse("elastomer_filled_silicone")).toBe("avionics_harsh_env_seal");
  });
});

describe("emiGaskets", () => {
  it("returns 5 types", () => {
    expect(emiGaskets()).toHaveLength(5);
  });
});
