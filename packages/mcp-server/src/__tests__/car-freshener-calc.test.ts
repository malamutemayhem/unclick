import { describe, it, expect } from "vitest";
import {
  scentStrength, longevity, odorElimination, subtlety,
  freshenerCost, chemicalFree, adjustable, deliveryMethod,
  bestUse, carFresheners,
} from "../car-freshener-calc.js";

describe("scentStrength", () => {
  it("spray mist instant strongest scent", () => {
    expect(scentStrength("spray_mist_instant")).toBeGreaterThan(scentStrength("charcoal_bag_absorber"));
  });
});

describe("longevity", () => {
  it("charcoal bag absorber longest lasting", () => {
    expect(longevity("charcoal_bag_absorber")).toBeGreaterThan(longevity("spray_mist_instant"));
  });
});

describe("odorElimination", () => {
  it("charcoal bag absorber best odor elimination", () => {
    expect(odorElimination("charcoal_bag_absorber")).toBeGreaterThan(odorElimination("hanging_tree_paper"));
  });
});

describe("subtlety", () => {
  it("charcoal bag absorber most subtle", () => {
    expect(subtlety("charcoal_bag_absorber")).toBeGreaterThan(subtlety("spray_mist_instant"));
  });
});

describe("freshenerCost", () => {
  it("vent clip diffuser more expensive than hanging tree paper", () => {
    expect(freshenerCost("vent_clip_diffuser")).toBeGreaterThan(freshenerCost("hanging_tree_paper"));
  });
});

describe("chemicalFree", () => {
  it("charcoal bag absorber is chemical free", () => {
    expect(chemicalFree("charcoal_bag_absorber")).toBe(true);
  });
  it("hanging tree paper is not chemical free", () => {
    expect(chemicalFree("hanging_tree_paper")).toBe(false);
  });
});

describe("adjustable", () => {
  it("vent clip diffuser is adjustable", () => {
    expect(adjustable("vent_clip_diffuser")).toBe(true);
  });
  it("charcoal bag absorber is not adjustable", () => {
    expect(adjustable("charcoal_bag_absorber")).toBe(false);
  });
});

describe("deliveryMethod", () => {
  it("charcoal bag absorber uses activated charcoal absorb", () => {
    expect(deliveryMethod("charcoal_bag_absorber")).toBe("activated_charcoal_absorb");
  });
});

describe("bestUse", () => {
  it("charcoal bag absorber best for pet smoke odor remove", () => {
    expect(bestUse("charcoal_bag_absorber")).toBe("pet_smoke_odor_remove");
  });
});

describe("carFresheners", () => {
  it("returns 5 types", () => {
    expect(carFresheners()).toHaveLength(5);
  });
});
