import { describe, it, expect } from "vitest";
import {
  cleanPower, easeOfUse, dryingSpeed, wringEffort,
  mopCost, chemicalFree, machineWashPad, headDesign,
  bestSurface, mopTypes,
} from "../mop-type-calc.js";

describe("cleanPower", () => {
  it("steam electric strongest clean power", () => {
    expect(cleanPower("steam_electric")).toBeGreaterThan(cleanPower("string_traditional"));
  });
});

describe("easeOfUse", () => {
  it("spray trigger easiest to use", () => {
    expect(easeOfUse("spray_trigger")).toBeGreaterThan(easeOfUse("string_traditional"));
  });
});

describe("dryingSpeed", () => {
  it("steam electric fastest drying", () => {
    expect(dryingSpeed("steam_electric")).toBeGreaterThan(dryingSpeed("string_traditional"));
  });
});

describe("wringEffort", () => {
  it("spin bucket easiest wring", () => {
    expect(wringEffort("spin_bucket")).toBeGreaterThan(wringEffort("string_traditional"));
  });
});

describe("mopCost", () => {
  it("steam electric most expensive", () => {
    expect(mopCost("steam_electric")).toBeGreaterThan(mopCost("string_traditional"));
  });
});

describe("chemicalFree", () => {
  it("steam electric is chemical free", () => {
    expect(chemicalFree("steam_electric")).toBe(true);
  });
  it("string traditional is not", () => {
    expect(chemicalFree("string_traditional")).toBe(false);
  });
});

describe("machineWashPad", () => {
  it("flat microfiber has machine wash pad", () => {
    expect(machineWashPad("flat_microfiber")).toBe(true);
  });
  it("string traditional does not", () => {
    expect(machineWashPad("string_traditional")).toBe(false);
  });
});

describe("headDesign", () => {
  it("steam electric uses triangular steam pad", () => {
    expect(headDesign("steam_electric")).toBe("triangular_steam_pad");
  });
});

describe("bestSurface", () => {
  it("flat microfiber for hardwood laminate gentle", () => {
    expect(bestSurface("flat_microfiber")).toBe("hardwood_laminate_gentle");
  });
});

describe("mopTypes", () => {
  it("returns 5 types", () => {
    expect(mopTypes()).toHaveLength(5);
  });
});
