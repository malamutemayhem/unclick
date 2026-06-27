import { describe, it, expect } from "vitest";
import {
  control, freedom, durability, convenience,
  leashCost, handsFree, multiDog, leashMaterial,
  bestWalk, petLeashes,
} from "../pet-leash-calc.js";

describe("control", () => {
  it("leather braided classic best control", () => {
    expect(control("leather_braided_classic")).toBeGreaterThan(control("retractable_cord_extend"));
  });
});

describe("freedom", () => {
  it("retractable cord extend most freedom", () => {
    expect(freedom("retractable_cord_extend")).toBeGreaterThan(freedom("standard_nylon_6ft"));
  });
});

describe("durability", () => {
  it("leather braided classic most durable", () => {
    expect(durability("leather_braided_classic")).toBeGreaterThan(durability("retractable_cord_extend"));
  });
});

describe("convenience", () => {
  it("hands free waist belt most convenient", () => {
    expect(convenience("hands_free_waist_belt")).toBeGreaterThan(convenience("leather_braided_classic"));
  });
});

describe("leashCost", () => {
  it("leather braided classic most expensive", () => {
    expect(leashCost("leather_braided_classic")).toBeGreaterThan(leashCost("standard_nylon_6ft"));
  });
});

describe("handsFree", () => {
  it("hands free waist belt is hands free", () => {
    expect(handsFree("hands_free_waist_belt")).toBe(true);
  });
  it("standard nylon 6ft is not", () => {
    expect(handsFree("standard_nylon_6ft")).toBe(false);
  });
});

describe("multiDog", () => {
  it("double coupler splitter is multi dog", () => {
    expect(multiDog("double_coupler_splitter")).toBe(true);
  });
  it("standard nylon 6ft is not", () => {
    expect(multiDog("standard_nylon_6ft")).toBe(false);
  });
});

describe("leashMaterial", () => {
  it("hands free waist belt uses nylon elastic bungee belt", () => {
    expect(leashMaterial("hands_free_waist_belt")).toBe("nylon_elastic_bungee_belt");
  });
});

describe("bestWalk", () => {
  it("hands free waist belt best for jogging hiking active", () => {
    expect(bestWalk("hands_free_waist_belt")).toBe("jogging_hiking_active");
  });
});

describe("petLeashes", () => {
  it("returns 5 types", () => {
    expect(petLeashes()).toHaveLength(5);
  });
});
