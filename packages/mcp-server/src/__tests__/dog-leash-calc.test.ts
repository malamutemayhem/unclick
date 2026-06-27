import { describe, it, expect } from "vitest";
import {
  strengthRating, controlLevel, comfortGrip, weightGrams,
  leashCost, chewResistant, adjustableLength, material,
  bestDog, dogLeashes,
} from "../dog-leash-calc.js";

describe("strengthRating", () => {
  it("chain metal strongest", () => {
    expect(strengthRating("chain_metal")).toBeGreaterThan(strengthRating("retractable_cord"));
  });
});

describe("controlLevel", () => {
  it("leather braided best control", () => {
    expect(controlLevel("leather_braided")).toBeGreaterThan(controlLevel("retractable_cord"));
  });
});

describe("comfortGrip", () => {
  it("leather braided most comfortable", () => {
    expect(comfortGrip("leather_braided")).toBeGreaterThan(comfortGrip("chain_metal"));
  });
});

describe("weightGrams", () => {
  it("chain metal heaviest", () => {
    expect(weightGrams("chain_metal")).toBeGreaterThan(weightGrams("standard_nylon"));
  });
});

describe("leashCost", () => {
  it("leather braided most expensive", () => {
    expect(leashCost("leather_braided")).toBeGreaterThan(leashCost("standard_nylon"));
  });
});

describe("chewResistant", () => {
  it("chain metal is chew resistant", () => {
    expect(chewResistant("chain_metal")).toBe(true);
  });
  it("standard nylon is not", () => {
    expect(chewResistant("standard_nylon")).toBe(false);
  });
});

describe("adjustableLength", () => {
  it("retractable cord is adjustable", () => {
    expect(adjustableLength("retractable_cord")).toBe(true);
  });
  it("standard nylon is not", () => {
    expect(adjustableLength("standard_nylon")).toBe(false);
  });
});

describe("material", () => {
  it("chain metal uses welded stainless steel", () => {
    expect(material("chain_metal")).toBe("welded_stainless_steel");
  });
});

describe("bestDog", () => {
  it("hands free waist for running jogging partner", () => {
    expect(bestDog("hands_free_waist")).toBe("running_jogging_partner");
  });
});

describe("dogLeashes", () => {
  it("returns 5 types", () => {
    expect(dogLeashes()).toHaveLength(5);
  });
});
