import { describe, it, expect } from "vitest";
import {
  hardnessRating, wearLifeYears, toneCharacter,
  installDifficulty, bendingEase, corrosionResistant,
  nickelFree, bestGuitarType, costPerMeter, fretWires,
} from "../fret-wire-calc.js";

describe("hardnessRating", () => {
  it("stainless steel is hardest", () => {
    expect(hardnessRating("stainless_steel")).toBeGreaterThan(
      hardnessRating("brass")
    );
  });
});

describe("wearLifeYears", () => {
  it("stainless steel lasts longest", () => {
    expect(wearLifeYears("stainless_steel")).toBeGreaterThan(
      wearLifeYears("brass")
    );
  });
});

describe("toneCharacter", () => {
  it("evo gold has warm tone", () => {
    expect(toneCharacter("evo_gold")).toBe("warm");
  });
});

describe("installDifficulty", () => {
  it("stainless steel is hardest to install", () => {
    expect(installDifficulty("stainless_steel")).toBeGreaterThan(
      installDifficulty("brass")
    );
  });
});

describe("bendingEase", () => {
  it("brass bends easiest", () => {
    expect(bendingEase("brass")).toBeGreaterThan(
      bendingEase("stainless_steel")
    );
  });
});

describe("corrosionResistant", () => {
  it("stainless steel resists corrosion", () => {
    expect(corrosionResistant("stainless_steel")).toBe(true);
  });
  it("brass does not", () => {
    expect(corrosionResistant("brass")).toBe(false);
  });
});

describe("nickelFree", () => {
  it("evo gold is nickel free", () => {
    expect(nickelFree("evo_gold")).toBe(true);
  });
  it("nickel silver is not", () => {
    expect(nickelFree("nickel_silver")).toBe(false);
  });
});

describe("bestGuitarType", () => {
  it("stainless steel best for electric shred", () => {
    expect(bestGuitarType("stainless_steel")).toBe("electric_shred");
  });
});

describe("costPerMeter", () => {
  it("evo gold costs most", () => {
    expect(costPerMeter("evo_gold")).toBeGreaterThan(
      costPerMeter("brass")
    );
  });
});

describe("fretWires", () => {
  it("returns 5 types", () => {
    expect(fretWires()).toHaveLength(5);
  });
});
