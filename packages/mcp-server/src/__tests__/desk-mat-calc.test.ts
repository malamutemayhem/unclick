import { describe, it, expect } from "vitest";
import {
  surfaceArea, deskProtection, writingComfort, spillResist,
  matCost, reversible, ecoFriendly, matMaterial,
  bestWorkspace, deskMats,
} from "../desk-mat-calc.js";

describe("surfaceArea", () => {
  it("rubber gaming rgb largest surface area", () => {
    expect(surfaceArea("rubber_gaming_rgb")).toBeGreaterThan(surfaceArea("felt_wool_minimal"));
  });
});

describe("deskProtection", () => {
  it("acrylic clear protector best desk protection", () => {
    expect(deskProtection("acrylic_clear_protector")).toBeGreaterThan(deskProtection("rubber_gaming_rgb"));
  });
});

describe("writingComfort", () => {
  it("leather vegan dual best writing comfort", () => {
    expect(writingComfort("leather_vegan_dual")).toBeGreaterThan(writingComfort("acrylic_clear_protector"));
  });
});

describe("spillResist", () => {
  it("acrylic clear protector best spill resistance", () => {
    expect(spillResist("acrylic_clear_protector")).toBeGreaterThan(spillResist("felt_wool_minimal"));
  });
});

describe("matCost", () => {
  it("rubber gaming rgb most expensive", () => {
    expect(matCost("rubber_gaming_rgb")).toBeGreaterThan(matCost("cork_natural_eco"));
  });
});

describe("reversible", () => {
  it("leather vegan dual is reversible", () => {
    expect(reversible("leather_vegan_dual")).toBe(true);
  });
  it("felt wool minimal is not", () => {
    expect(reversible("felt_wool_minimal")).toBe(false);
  });
});

describe("ecoFriendly", () => {
  it("cork natural eco is eco friendly", () => {
    expect(ecoFriendly("cork_natural_eco")).toBe(true);
  });
  it("rubber gaming rgb is not", () => {
    expect(ecoFriendly("rubber_gaming_rgb")).toBe(false);
  });
});

describe("matMaterial", () => {
  it("cork natural eco uses portuguese cork bark", () => {
    expect(matMaterial("cork_natural_eco")).toBe("portuguese_cork_bark");
  });
});

describe("bestWorkspace", () => {
  it("rubber gaming rgb best for gaming streaming setup", () => {
    expect(bestWorkspace("rubber_gaming_rgb")).toBe("gaming_streaming_setup");
  });
});

describe("deskMats", () => {
  it("returns 5 types", () => {
    expect(deskMats()).toHaveLength(5);
  });
});
