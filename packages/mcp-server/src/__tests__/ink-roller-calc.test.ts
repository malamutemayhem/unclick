import { describe, it, expect } from "vitest";
import {
  inkTransfer, evenCoverage, durability, cleanEase,
  rollerCost, forProof, textured, rollerMaterial,
  bestUse, inkRollers,
} from "../ink-roller-calc.js";

describe("inkTransfer", () => {
  it("gelatin smooth proof best ink transfer", () => {
    expect(inkTransfer("gelatin_smooth_proof")).toBeGreaterThan(inkTransfer("foam_sponge_texture"));
  });
});

describe("evenCoverage", () => {
  it("gelatin smooth proof most even coverage", () => {
    expect(evenCoverage("gelatin_smooth_proof")).toBeGreaterThan(evenCoverage("foam_sponge_texture"));
  });
});

describe("durability", () => {
  it("polyurethane hard even most durable", () => {
    expect(durability("polyurethane_hard_even")).toBeGreaterThan(durability("foam_sponge_texture"));
  });
});

describe("cleanEase", () => {
  it("silicone release clean easiest to clean", () => {
    expect(cleanEase("silicone_release_clean")).toBeGreaterThan(cleanEase("foam_sponge_texture"));
  });
});

describe("rollerCost", () => {
  it("gelatin smooth proof most expensive", () => {
    expect(rollerCost("gelatin_smooth_proof")).toBeGreaterThan(rollerCost("rubber_soft_brayer"));
  });
});

describe("forProof", () => {
  it("gelatin smooth proof is for proof", () => {
    expect(forProof("gelatin_smooth_proof")).toBe(true);
  });
  it("rubber soft brayer not for proof", () => {
    expect(forProof("rubber_soft_brayer")).toBe(false);
  });
});

describe("textured", () => {
  it("foam sponge texture is textured", () => {
    expect(textured("foam_sponge_texture")).toBe(true);
  });
  it("rubber soft brayer not textured", () => {
    expect(textured("rubber_soft_brayer")).toBe(false);
  });
});

describe("rollerMaterial", () => {
  it("rubber soft brayer uses natural rubber soft", () => {
    expect(rollerMaterial("rubber_soft_brayer")).toBe("natural_rubber_soft");
  });
});

describe("bestUse", () => {
  it("gelatin smooth proof best for fine art proof", () => {
    expect(bestUse("gelatin_smooth_proof")).toBe("fine_art_proof");
  });
});

describe("inkRollers", () => {
  it("returns 5 types", () => {
    expect(inkRollers()).toHaveLength(5);
  });
});
