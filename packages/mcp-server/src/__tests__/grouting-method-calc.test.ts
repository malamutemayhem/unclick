import { describe, it, expect } from "vitest";
import {
  penetration, strength, durability, controllability,
  grCost, chemical, forWaterStop, medium,
  bestUse, groutingMethodTypes,
} from "../grouting-method-calc.js";

describe("penetration", () => {
  it("chemical best penetration", () => {
    expect(penetration("chemical_sodium_silicate")).toBeGreaterThan(penetration("compaction_displacement_grout"));
  });
});

describe("strength", () => {
  it("epoxy strongest", () => {
    expect(strength("epoxy_resin_structural")).toBeGreaterThan(strength("chemical_sodium_silicate"));
  });
});

describe("durability", () => {
  it("cement most durable", () => {
    expect(durability("cement_slurry_permeation")).toBeGreaterThan(durability("chemical_sodium_silicate"));
  });
});

describe("controllability", () => {
  it("jet grouting best controllability", () => {
    expect(controllability("jet_grouting_columnar")).toBeGreaterThan(controllability("cement_slurry_permeation"));
  });
});

describe("grCost", () => {
  it("epoxy most expensive", () => {
    expect(grCost("epoxy_resin_structural")).toBeGreaterThan(grCost("cement_slurry_permeation"));
  });
});

describe("chemical", () => {
  it("sodium silicate is chemical", () => {
    expect(chemical("chemical_sodium_silicate")).toBe(true);
  });
  it("cement not chemical", () => {
    expect(chemical("cement_slurry_permeation")).toBe(false);
  });
});

describe("forWaterStop", () => {
  it("cement for water stop", () => {
    expect(forWaterStop("cement_slurry_permeation")).toBe(true);
  });
  it("compaction not for water stop", () => {
    expect(forWaterStop("compaction_displacement_grout")).toBe(false);
  });
});

describe("medium", () => {
  it("jet uses high pressure cement", () => {
    expect(medium("jet_grouting_columnar")).toBe("high_pressure_cement_jet_stream");
  });
});

describe("bestUse", () => {
  it("epoxy for concrete crack repair", () => {
    expect(bestUse("epoxy_resin_structural")).toBe("concrete_crack_repair_structural");
  });
});

describe("groutingMethodTypes", () => {
  it("returns 5 types", () => {
    expect(groutingMethodTypes()).toHaveLength(5);
  });
});
