import { describe, it, expect } from "vitest";
import {
  resistance, durability, installEase, soilContact,
  geCost, enhanced, forBuilding, material,
  bestUse, groundingElectrodeTypes,
} from "../grounding-electrode-calc.js";

describe("resistance", () => {
  it("chemical enhancement lowest resistance", () => {
    expect(resistance("chemical_ground_enhancement")).toBeGreaterThan(resistance("ground_rod_copper_clad"));
  });
});

describe("durability", () => {
  it("concrete encased most durable", () => {
    expect(durability("concrete_encased_ufer")).toBeGreaterThan(durability("chemical_ground_enhancement"));
  });
});

describe("installEase", () => {
  it("ground rod easiest install", () => {
    expect(installEase("ground_rod_copper_clad")).toBeGreaterThan(installEase("ground_ring_bare_copper"));
  });
});

describe("soilContact", () => {
  it("ground ring best soil contact", () => {
    expect(soilContact("ground_ring_bare_copper")).toBeGreaterThan(soilContact("ground_rod_copper_clad"));
  });
});

describe("geCost", () => {
  it("chemical enhancement most expensive", () => {
    expect(geCost("chemical_ground_enhancement")).toBeGreaterThan(geCost("ground_rod_copper_clad"));
  });
});

describe("enhanced", () => {
  it("chemical ground is enhanced", () => {
    expect(enhanced("chemical_ground_enhancement")).toBe(true);
  });
  it("ground rod not enhanced", () => {
    expect(enhanced("ground_rod_copper_clad")).toBe(false);
  });
});

describe("forBuilding", () => {
  it("concrete encased for building", () => {
    expect(forBuilding("concrete_encased_ufer")).toBe(true);
  });
  it("chemical enhancement not for building", () => {
    expect(forBuilding("chemical_ground_enhancement")).toBe(false);
  });
});

describe("material", () => {
  it("ufer uses rebar in concrete", () => {
    expect(material("concrete_encased_ufer")).toBe("rebar_in_concrete_foundation");
  });
});

describe("bestUse", () => {
  it("ground rod for residential service", () => {
    expect(bestUse("ground_rod_copper_clad")).toBe("residential_service_entrance_ground");
  });
});

describe("groundingElectrodeTypes", () => {
  it("returns 5 types", () => {
    expect(groundingElectrodeTypes()).toHaveLength(5);
  });
});
