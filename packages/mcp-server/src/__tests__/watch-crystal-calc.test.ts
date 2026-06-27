import { describe, it, expect } from "vitest";
import {
  scratchResistance, shatterResistance, clarity, antiReflective,
  costLevel, polishable, luxuryGrade, materialComposition,
  famousUsage, watchCrystals,
} from "../watch-crystal-calc.js";

describe("scratchResistance", () => {
  it("sapphire most scratch resistant", () => {
    expect(scratchResistance("sapphire")).toBeGreaterThan(scratchResistance("acrylic"));
  });
});

describe("shatterResistance", () => {
  it("acrylic most shatter resistant", () => {
    expect(shatterResistance("acrylic")).toBeGreaterThan(shatterResistance("sapphire"));
  });
});

describe("clarity", () => {
  it("sapphire best clarity", () => {
    expect(clarity("sapphire")).toBeGreaterThan(clarity("acrylic"));
  });
});

describe("antiReflective", () => {
  it("sapphire best anti reflective", () => {
    expect(antiReflective("sapphire")).toBeGreaterThan(antiReflective("acrylic"));
  });
});

describe("costLevel", () => {
  it("sapphire most expensive", () => {
    expect(costLevel("sapphire")).toBeGreaterThan(costLevel("acrylic"));
  });
});

describe("polishable", () => {
  it("acrylic is polishable", () => {
    expect(polishable("acrylic")).toBe(true);
  });
  it("sapphire is not", () => {
    expect(polishable("sapphire")).toBe(false);
  });
});

describe("luxuryGrade", () => {
  it("sapphire is luxury grade", () => {
    expect(luxuryGrade("sapphire")).toBe(true);
  });
  it("mineral is not", () => {
    expect(luxuryGrade("mineral")).toBe(false);
  });
});

describe("materialComposition", () => {
  it("sapphire is synthetic corundum", () => {
    expect(materialComposition("sapphire")).toBe("synthetic_corundum");
  });
});

describe("famousUsage", () => {
  it("hesalite used in omega speedmaster", () => {
    expect(famousUsage("hesalite")).toBe("omega_speedmaster_moonwatch");
  });
});

describe("watchCrystals", () => {
  it("returns 5 crystal types", () => {
    expect(watchCrystals()).toHaveLength(5);
  });
});
