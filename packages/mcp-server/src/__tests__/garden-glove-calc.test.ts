import { describe, it, expect } from "vitest";
import {
  dexterity, protection, gripStrength, breathability,
  gloveCost, waterproof, touchScreenTip, gloveMaterial,
  bestTask, gardenGloves,
} from "../garden-glove-calc.js";

describe("dexterity", () => {
  it("cotton jersey light most dexterous", () => {
    expect(dexterity("cotton_jersey_light")).toBeGreaterThan(dexterity("thorn_proof_gauntlet"));
  });
});

describe("protection", () => {
  it("thorn proof gauntlet most protective", () => {
    expect(protection("thorn_proof_gauntlet")).toBeGreaterThan(protection("cotton_jersey_light"));
  });
});

describe("gripStrength", () => {
  it("nitrile coated grip strongest grip", () => {
    expect(gripStrength("nitrile_coated_grip")).toBeGreaterThan(gripStrength("cotton_jersey_light"));
  });
});

describe("breathability", () => {
  it("cotton jersey light most breathable", () => {
    expect(breathability("cotton_jersey_light")).toBeGreaterThan(breathability("thorn_proof_gauntlet"));
  });
});

describe("gloveCost", () => {
  it("thorn proof gauntlet most expensive", () => {
    expect(gloveCost("thorn_proof_gauntlet")).toBeGreaterThan(gloveCost("cotton_jersey_light"));
  });
});

describe("waterproof", () => {
  it("nitrile coated grip is waterproof", () => {
    expect(waterproof("nitrile_coated_grip")).toBe(true);
  });
  it("cotton jersey light is not", () => {
    expect(waterproof("cotton_jersey_light")).toBe(false);
  });
});

describe("touchScreenTip", () => {
  it("bamboo breathable eco has touch screen tip", () => {
    expect(touchScreenTip("bamboo_breathable_eco")).toBe(true);
  });
  it("leather cowhide heavy does not", () => {
    expect(touchScreenTip("leather_cowhide_heavy")).toBe(false);
  });
});

describe("gloveMaterial", () => {
  it("thorn proof gauntlet uses goatskin kevlar lined", () => {
    expect(gloveMaterial("thorn_proof_gauntlet")).toBe("goatskin_kevlar_lined");
  });
});

describe("bestTask", () => {
  it("nitrile coated grip best for wet muddy transplant", () => {
    expect(bestTask("nitrile_coated_grip")).toBe("wet_muddy_transplant");
  });
});

describe("gardenGloves", () => {
  it("returns 5 types", () => {
    expect(gardenGloves()).toHaveLength(5);
  });
});
