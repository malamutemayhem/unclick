import { describe, it, expect } from "vitest";
import {
  spillProof, drinkingSkillBuild, cleanEase, durability,
  cupCost, dishwasherSafe, hasHandles, cupMaterial,
  bestAge, sippyCups,
} from "../sippy-cup-calc.js";

describe("spillProof", () => {
  it("360 rim flow most spill proof", () => {
    expect(spillProof("360_rim_flow")).toBeGreaterThan(spillProof("open_cup_trainer_handles"));
  });
});

describe("drinkingSkillBuild", () => {
  it("open cup trainer handles builds most skill", () => {
    expect(drinkingSkillBuild("open_cup_trainer_handles")).toBeGreaterThan(drinkingSkillBuild("soft_spout_trainer"));
  });
});

describe("cleanEase", () => {
  it("open cup trainer handles easiest to clean", () => {
    expect(cleanEase("open_cup_trainer_handles")).toBeGreaterThan(cleanEase("straw_weighted_any_angle"));
  });
});

describe("durability", () => {
  it("insulated sport bottle most durable", () => {
    expect(durability("insulated_sport_bottle")).toBeGreaterThan(durability("open_cup_trainer_handles"));
  });
});

describe("cupCost", () => {
  it("insulated sport bottle most expensive", () => {
    expect(cupCost("insulated_sport_bottle")).toBeGreaterThan(cupCost("soft_spout_trainer"));
  });
});

describe("dishwasherSafe", () => {
  it("soft spout trainer is dishwasher safe", () => {
    expect(dishwasherSafe("soft_spout_trainer")).toBe(true);
  });
  it("insulated sport bottle is not", () => {
    expect(dishwasherSafe("insulated_sport_bottle")).toBe(false);
  });
});

describe("hasHandles", () => {
  it("open cup trainer handles has handles", () => {
    expect(hasHandles("open_cup_trainer_handles")).toBe(true);
  });
  it("straw weighted any angle does not", () => {
    expect(hasHandles("straw_weighted_any_angle")).toBe(false);
  });
});

describe("cupMaterial", () => {
  it("insulated sport bottle uses stainless double wall", () => {
    expect(cupMaterial("insulated_sport_bottle")).toBe("stainless_double_wall");
  });
});

describe("bestAge", () => {
  it("soft spout trainer best for four to nine months", () => {
    expect(bestAge("soft_spout_trainer")).toBe("four_to_nine_months");
  });
});

describe("sippyCups", () => {
  it("returns 5 types", () => {
    expect(sippyCups()).toHaveLength(5);
  });
});
